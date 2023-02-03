import React, { useState, useContext, createContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../services/api";
import { useAuthContext } from "./authContext";
import {formatDate} from "../services/tools";
import Loading from "../components/Loading";
import Callback  from "../components/Modal/Callback";

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
    budgets:Array,
    getBudgets:Function,
    getUsers:Function,
    users:Array,
    getServices: Function,
    services: Array,
    setServices: Function,
    getSuppliers:Function,
    suppliers:Array
};

const MainContext = createContext(mainContextData);

export const MainProvider = ({ children }) => {
    const {signed} = useAuthContext();

    const [cities, setCities] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(null);

    const [services, setServices] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const getCities = async(load = false)=>{
        if(load)
            setLoading(true);
            
        let res = await API.get("Address");

        if(load)
            setLoading(false);

        if(!res.error){
            res = res.sort((a, b) => { //ordenar por nome da cidade
                const nameA = a.citie.toUpperCase().replace(/Á/,"A"); // ignore upper and lowercase
                const nameB = b.citie.toUpperCase().replace(/Á/,"A"); // ignore upper and lowercase
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                // names must be equal
                return 0;
            });
            return setCities(res);
        }
    }

    const getBudgets = async(load = false)=>{
        if(load)
            setLoading(true);
            
        let res = await API.get("PVForm").catch(e => e);

        if(load)
            setLoading(false);

        if(res?.error){
            if(res.error === 401)
                return;

            return setCallback({
                type: 0,
                message:res?.error ? res.error : `Algo deu errado!`,
                action:()=>{
                    setCallback(null);
                    getBudgets(load)
                },
                actionName:"Tentar novamente",
                close:()=>setCallback(null)
            })
        }

        let budgetsFormat = res.map((val)=>{
            let fullNameCustomer = val?.customer ? val?.customer?.firstName+" "+val?.customer?.lastName : "";
            let fullNameSeller = val?.consultant ? val?.consultant?.user.firstName+" "+val?.consultant?.user.lastName : "";
            
            val.customerName = fullNameCustomer;
            val.seller = fullNameSeller;
            val.category = "Fotovoltaico";
            val.date = formatDate(val?.createdAt,false, true);
        
            return val;
        })

        setBudgets(budgetsFormat);
    }


    const getUsers = async (load = false) => {
        if(load)
            setLoading(true);

        let consultants = await API.get("Consultant").catch(e => e);
        let users = await API.get("Auth").catch(e => e);

        if(load)
            setLoading(false);

        if (consultants?.error){
            if(consultants.error === 401)
                return;
            return setCallback({
                type: 0,
                message:consultants?.error ? consultants.error : `Algo deu errado! Error: ${consultants?.status}`,
                action:()=>{
                    setCallback(null);
                    getUsers()},
                actionName:"Tentar novamente",
                close:()=>setCallback(null)
            })
        }   

        let arr = users.map(user => {
            for(let i in consultants){
                if(user.id == consultants[i]?.user.id)
                    user.consultant = consultants[i];
            }

            return user;
        })

        setUsers(arr);
    }

    const getServices = async(load = false) => {

        try{
            if(load)
                setLoading(true);

            let res = await API.get("ServiceOffered").catch(err => err);
            if(load)
                setLoading(false);

            if(res?.error)
                throw new Error(res.error);

            setServices(res);
        }catch(e){
            if(e.message === 401)
                return;
            setCallback({
                message:e.message,
                actionName:"Ok!",
                action:()=>setCallback(null),
            });
        }
    }

    const getSuppliers = async (load = false)=>{
        try{
            if(load)
                setLoading(true);

            let res = await API.get("PVForm/pvSupplier").catch(err => err);
            if(load)
                setLoading(false);

            if(res?.error)
                throw new Error(res.error);

            setSuppliers(res);
        }catch(e){
            setCallback({
                message:e.message,
                actionName:"Ok!",
                action:()=>setCallback(null),
            });
        }
    }

    useEffect(() => {
        if(signed){
            getCities();
            getUsers();
            getServices();
        }
    }, [signed]);

    return (
        <MainContext.Provider value={{
            cities,
            setCities,
            getCities,
            getBudgets,
            budgets,
            getUsers, 
            users,
            getServices,
            services,
            setServices,
            getSuppliers,
            suppliers
        }}>
            <Loading loading2={loading}/>
            <Callback params={callback}/>
            {children}
        </MainContext.Provider>
    )

}

export function useMainContext() {
    const context = useContext(MainContext)
    return context;
}