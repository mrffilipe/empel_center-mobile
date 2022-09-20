import React, { useState, useContext, createContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {login, signUp} from "../services/api"
const mainContextData = {
    loading:Boolean,
    setLoading:Function,
    user:Object || null,
    signed:Boolean,
    login:()=> new Promise,
    loggout:Function,
    DB:[{
        title:String,//descrição da tarefa
        function:String,//nome da função para requisição
        params:Object, ///parametros para requisição
        status:Number, //sincronizado(1) ou não (0)
        date:Date //data formatada do armazenamento
    }],
    setDB:Function
};

const MainContext = createContext(mainContextData);

export const MainProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [DB,setDB] = useState([]);

    const [user,setUser] = useState({
        name: 'user',
        email: 'user@example.com',
    });
    const [token, setToken] = useState(null);

    const getStorageUser = async()=>{
        try {
            let tok = await AsyncStorage.getItem("@token");
            let use = await AsyncStorage.getItem("@user");

            if(!tok || !use) return signOut();
            setUser(JSON.parse(use));
            setToken(tok);
        }catch(e) {
            return;
        }
    }

    const login = async(email, password) => {
        return new Promise((resolve) => {
            setUser({name: email.split("@")[0], email: email})

            resolve();
        }) 
    }

    const loggout = async()=>{
        try{
            setUser(null)
            setToken(null)
            await AsyncStorage.removeItem('@token');
            await AsyncStorage.removeItem("@user")
        }catch (e) {}
    }

    const storage = async(res)=>{
        try{
            await AsyncStorage.setItem(
                '@token',
                res.token
            );

            const jsonValue = JSON.stringify(res.user)
            await AsyncStorage.setItem(
                "@user",
                jsonValue
            )

            setUser(res.user);
            setToken(res.token);
        }catch(e){
            return;
        }
    }

    const getStorageData = async()=>{
        try {
            let data = await AsyncStorage.getItem("@data");
            
            if(!data || data === "null") return;
                setDB(JSON.parse(data));
        }catch(e) {
            return;
        }
    }

    const updateStorageData = async()=>{
        try{
            const jsonValue = JSON.stringify(DB)
            await AsyncStorage.setItem(
                '@data',
                jsonValue
            );
        }catch(e){
            alert('Erro ao salvar dados no dispositivo!')
        }
    }


    useEffect(() => {
        getStorageUser();
    }, []);

    useEffect(() => {
        getStorageData();
    }, []);

    useEffect(() => {
        if(DB)
            updateStorageData();
    }, [DB]);

    return (
        <MainContext.Provider value={{
            loading,
            setLoading,
            user,
            signed:!!user,
            login,
            loggout,
            DB,
            setDB,
        }}>
            {children}
        </MainContext.Provider>
    )

}

export function useMainContext() {
    const context = useContext(MainContext)
    return context;
}