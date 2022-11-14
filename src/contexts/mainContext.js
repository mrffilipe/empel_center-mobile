import React, { useState, useContext, createContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import API from "../services/api";

const citiesProps = [{
    id:Number,
    citie:String,
    state:String,
    country:String,
    constant:Number,
    updatedAt:Date,
    createdAt:Date,
}]

const mainContextData = {
    cities:citiesProps,
    setCities:Function,
    getCities:Function,
};

const MainContext = createContext(mainContextData);

export const MainProvider = ({ children }) => {
    const [cities, setCities] = useState([]);

    const getCities = async ()=>{//buscar, atualizar cidades e armazenar no dispositivo 
        let res = await API.get("Address");
        if(!res.error){
            setCities(res);
            try{
                const jsonValue = JSON.stringify(res)
                await AsyncStorage.setItem(
                    "@cities",
                    jsonValue
                )
            }catch(e){
                return;
            }
            
        }
    }

    useEffect(()=>{
        getCities();
    },[])

    return (
        <MainContext.Provider value={{
            cities,
            getCities,
            setCities,
        }}>
            {children}
        </MainContext.Provider>
    )

}

export function useMainContext() {
    const context = useContext(MainContext)
    return context;
}