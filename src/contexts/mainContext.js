import React, { useState, useContext, createContext, useEffect } from "react";
// import {login, signUp} from "../services/api"
const mainContextData = {
    loading:Boolean,
    setLoading:Function,
    user:Object || null,
    signed:Boolean,
    login:()=> new Promise,
    loggout:Function
};

const MainContext = createContext(mainContextData);

export const MainProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
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


    useEffect(() => {
        getStorageUser();
    }, []);

    return (
        <MainContext.Provider value={{
            loading,
            setLoading,
            user,
            signed:!!user,
            login,
            loggout,
        }}>
            {children}
        </MainContext.Provider>
    )

}

export function useMainContext() {
    const context = useContext(MainContext)
    return context;
}