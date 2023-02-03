import React, { useState, useContext, createContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import API from "../services/api";

const AuthContextData = {
    loading:Boolean,
    setLoading:Function,
    user:Object || null,
    signed:Boolean,
    login:()=> new Promise,
    loggout:Function,
    tasksStoraged:[{
        title:String,//descrição da tarefa
        function:String,//nome da função para requisição
        params:Object, ///parametros para requisição
        status:Number, //sincronizado(1) ou não (0)
        date:Date //data formatada do armazenamento
    }],
    setTasksStoraged:Function,
    setCallback: Function,
    callback:Object,
    hasPermission:Function
};

const AuthContext = createContext(AuthContextData);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [tasksStoraged,setTasksStoraged] = useState([]);
    const [user,setUser] = useState(null);
    const [accessData, setAccessData] = useState(null);
    const [callback, setCallback] = useState(null)

    const getStorageDataAccessUser = async()=>{
        try {
            let data = await AsyncStorage.getItem("@dataAccessUser");
            data = JSON.parse(data);

            if(!data) return logout();

            API.setAccessToken(data?.accessToken);
            data.user.name = data?.user?.firstName + " " + data?.user?.lastName;
            setUser(data?.user);
            data.user = null;
            
            setAccessData(data);
        }catch(e) {}
    }

    const login = async({email, password}) => {
        return new Promise(async(resolve) => {
            setLoading(true);
            let response = await API.post("Auth/signin",{email,password}).catch(e => e);
            if(response?.status !== 200 || response?.error){
                setLoading(false);
                resolve(response?.error || response?.status);                
                return;
            }
            let data = response?.data;

            storageAcess(data);
            resolve(200);
        }) 
    }

    const logout = async()=>{
        try{
            if(!!user){
                setLoading(true);
                let res = await API.get('Auth/revoke').catch(e => e);
                console.log(res);
                setLoading(false);
            }
            
            setUser(null)
            setAccessData(null)
            API.setAccessToken(null);
            await AsyncStorage.removeItem('@dataAccessUser');
        }catch (e) {}
    }

    const storageAcess = async(data)=>{
        try{
            API.setAccessToken(data?.accessToken);
            let consultant = await API.get("Consultant/details/"+data.user.id).catch(e => e);
            setLoading(false);
            if(!consultant?.error && consultant){
                data.user.idConsultant = consultant?.id;
                data.user.commissionInPercentage = consultant?.commissionInPercentage;
            }

            data.user.name = data?.user?.firstName + " " + data?.user?.lastName;
            setUser(data?.user);

            const jsonData = JSON.stringify(data);
            await AsyncStorage.setItem(
                "@dataAccessUser",
                jsonData
            );

            data.user = null;
            setAccessData(data);    
        }catch(e){
            return;
        }
    }

    const hasPermission = (permission = 0)=>{
        return user?.typeAccess <= permission;
    }

    const verifyRefreshToken = async()=>{
        let nowDate = new Date();
        let expiresInDate = new Date(accessData?.expiration);
        let treeMinuts = 1000 * 60 * 3;
        let treeMinutsInMilliseconds = 180000;

        // setInterval(()=>{
        //     if(nowDate.getTime() > expiresInDate.getTime() - treeMinutsInMilliseconds){
                // refreshToken()
        //     }
        // },treeMinuts);
    }

    const refreshToken = async()=>{
        let res = await API.post("auth/refresh",accessData).catch(e=> e);
        console.log(res);
        console.log(accessData.accessToken);
        
    }

    const getStorageData = async()=>{//pegar 
        try {
            let data = await AsyncStorage.getItem("@tasksStoraged");
            
            if(!data || data === "null") return;
                setTasksStoraged(JSON.parse(data));
        }catch(e) {
            return;
        }
    }

    const updateStorageData = async()=>{ //atualizar funçoes a serem sincronizadas offline sempre que o stado TasksStoraged from atualizado 
        try{
            const jsonValue = JSON.stringify(tasksStoraged)
            await AsyncStorage.setItem(
                '@tasksStoraged',
                jsonValue
            );
        }catch(e){
            alert('Erro ao salvar dados no dispositivo!')
        }
    }

    useEffect(() => {
        if(tasksStoraged)
            updateStorageData();
    }, [tasksStoraged]);

    useEffect(()=>{
        if(accessData){
            verifyRefreshToken();
        }
    },[accessData])

    useEffect(() => {
        getStorageDataAccessUser();
        getStorageData();
        API.setLogoutApi(logout);
    },[]);

    return (
        <AuthContext.Provider value={{
            loading,
            setLoading,
            user,
            signed:!!user,
            login,
            logout,
            tasksStoraged,
            setTasksStoraged,
            callback,
            setCallback,
            hasPermission
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuthContext() {
    const context = useContext(AuthContext)
    return context;
}