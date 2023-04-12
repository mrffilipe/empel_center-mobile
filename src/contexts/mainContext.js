import React, { useState, useContext, createContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../services/api";
import { useAuthContext } from "./authContext";
import {formatDate, toBrNumberFormat} from "../services/tools";
import Loading from "../components/Loading";
import Callback  from "../components/Modal/Callback";
import selectOptions from '../data/selectOptions.json';
import enumData from "../data/enum.json";

// const citiesProps = [{
//     id:Number,
//     citie:String,
//     state:String,
//     country:String,
//     constant:Number,
//     updatedAt:Date,
//     createdAt:Date,
// }]

const mainContextData = {
    // cities:citiesProps,
    // setCities:Function,
    // getCities:Function,
    budgets:Array,
    getBudgets:Function,
    getUsers:Function,
    users:Array,
    getServices: Function,
    services: Array,
    setServices: Function,
    getSuppliers:Function,
    suppliers:Array,
    customers:Array,
    getCustomers: Function,
    getArchives: Function,
    archives:Array,
    getActivities:Function,
    activities: Array,
    myActivities:Array,
    getMyActivities:Function,
    servicesActives: Array,
    getServicesActives: Function,
};

const MainContext = createContext(mainContextData);

export const MainProvider = ({ children }) => {
    const {signed, user} = useAuthContext();

    // const [cities, setCities] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(null);

    const [services, setServices] = useState([]);

    const [customers, setCustomers] = useState([]);
    const [servicesActives, setServicesActives] = useState([]);

    const [suppliers, setSuppliers] = useState([]);
    const [archives, setArchives] = useState([]);
    const [activities, setActivities] = useState([]);
    const [myActivities, setMyActivities] = useState([]);

    // const getCities = async(load = false)=>{
    //     try{
    //         if(load) setLoading(true);
                
    //         let res = await API.get("Address");

    //         if(load) setLoading(false);

    //         if(res?.error)
    //             throw new Error(res.error);

    //         res = res.sort((a, b) => { //ordenar por nome da cidade
    //             const nameA = a.citie.toUpperCase().replace(/Á/,"A"); // ignore upper and lowercase
    //             const nameB = b.citie.toUpperCase().replace(/Á/,"A"); // ignore upper and lowercase
    //             if (nameA < nameB)
    //                 return -1;
    //             if (nameA > nameB)
    //                 return 1;
    //             // names must be equal
    //             return 0;
    //         });

    //         setCities(res);
            
    //     }catch(e) {
    //         if(load)
    //             pushCallback(e.message);
    //     }
    // }

    const getBudgets = async(load = false)=>{
    
        if(load) setLoading(true);
            
        let res = await API.get("PVForm").catch(e => e);

        if(load) setLoading(false);

        if(res?.error){
            if(res.error === "Unauthorized")
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

        try{
            if(load)
                setLoading(true);

            let consultants = await API.get("Consultant").catch(e => e);
            let users = await API.get("User").catch(e => e);

            if (consultants?.error || users.error){
                if(consultants.error === "Unauthorized")
                    return;
                
                    throw new Error(consultants?.error ? consultants.error :  users.error);
            }   

            let arr = users.map(user => {
                for(let i in consultants){
                    if(user.id === consultants[i]?.user?.id)
                        user.consultant = consultants[i];
                        user.fullName = `${user?.firstName} ${user?.lastName}`;
                }

                return user;
            })

            setUsers(arr);
        }catch(error){
            return setCallback({
                type: 0,
                message:error.message,
                action:()=>{
                    setCallback(null);
                    getUsers()},
                actionName:"Tentar Novamente",
                close:()=>setCallback(null)
            })
        }finally{
            if(load)
                setLoading(false);
        }
    }

    const getCustomers = async(load = true) => {

        try{
            if(load)
                setLoading(true);

            let res = await API.get("Customer").catch(err => err);

            if(res?.error)
                throw new Error(res.error);

            let formatedRes = res.map((val)=>{
                val.fullName = val.firstName+" "+val.lastName;
                val.phone = val?.telephones[0].number;
                val.created = formatDate(val.createdAt,false, true);
                return val;
            })
            setCustomers(formatedRes);

        }catch(e){
            if(load)
                setCallback({
                    message:e.message,
                    actionName:"Ok!",
                    action:()=>setCallback(null),
                });
        }finally{
            if(load)
                setLoading(false);
        }
        
    }

    const getServices = async(load = false) => {

        try{
            if(load) setLoading(true);

            let res = await API.get("ServiceOffered").catch(err => err);
            if(load) setLoading(false);

            if(res?.error)
                throw new Error(res.error);

            res = res.map((val) =>{ //fomatar para usar na tabela lista
                val.state =  val.active;
                val.main_text = val.name;
                val.created = formatDate(val.createdAt,false, true);
                val.updated = formatDate(val.updatedAt,false, true);
                return val;
            })

            setServices(res);
        }catch(e){
            pushCallback(e.message);
        }
    }

    const getSuppliers = async (load = false)=>{
        try{
            if(load) setLoading(true);
                
            let res = await API.get("PVForm/pvSupplier").catch(err => err);
            if(load) setLoading(false);

            res = res.map((val)=>{
                val.state =  true;
                val.main_text = val.supplierName;
                val.createdAt = formatDate(val.createdAt,false, true);
                val.inverterPower = toBrNumberFormat(val.inverterPower)+" kWh";
                val.modulePower = toBrNumberFormat(val.modulePower)+" kWh";
                return val;
            });
                

            if(res?.error)
                throw new Error(res.error);

            setSuppliers(res);
        }catch(e){
            pushCallback(e.message);
        }
    }

    const getArchives = async(load = true) => {
        const typeAccessFormated = (index)=>{
            let res = "";
            selectOptions.typeAccess.map((val,key) => {
                if(key === 0 && key === index)
                    return res = `${val} Apenas`;
    
                if(key === index)
                    return res = `${val} ou superior`;
            })
            return res;
        }

        const downloadArchive = ()=>{

        }

        try{
            if(load) setLoading(true);
            let res = await API.get("StoredFile").catch(err => err);
            if(load) setLoading(false);

            if(res?.error)
                throw new Error(res.error);

            res = res.map((val)=>{
                val.main_text = val.name;
                val.sendedBy = val.file.user.firstName + ' ' + val.file.user.lastName;
                val.created = formatDate(val.createdAt,true,true);
                val.filename = val.file.filename;
                val.permission = typeAccessFormated(val.accessPermissionLevel);
                val.extension = val.file.extension;
                val.stateColor = "green";
                val.toDownload = downloadArchive;
                return val;
            })

            setArchives(res);
        }catch(e){
            pushCallback(e.message);
        }
    }

    const getActivities = async(load = true) => {

        try{
            if(load) setLoading(true);
            let res = await API.get("UserActivity").catch(err => err);
            if(load) setLoading(false);

            if(res?.error)
                throw new Error(res.error);

            res = formatAtivity(res);

            setActivities(res);
        }catch(e){
            pushCallback(e.message);
        }
    }

    const formatAtivity = (res) =>{
        
        res = res.map((val)=>{
            let status = enumData.activityStatus[val?.activityStatus];

            if(status === 0){
                let validDate = new Date(val.completionDate+"Z");
                let timeNow = new Date();
                if(validDate < timeNow)
                    status = 2;
            }

            val.main_text = val?.receivingUser.firstName+" "+val?.receivingUser.lastName;
            val.responsible = val?.receivingUser.firstName+" "+val?.receivingUser.lastName;
            val.expiresIn = formatDate(val.completionDate,true);
            val.finishedIn = val?.activityStatus === 1 ? formatDate(val.finishedIn,true) :"#";
            val.createdBy = val?.transmittingUser.firstName+" "+val?.transmittingUser.lastName;
            val.createdAt = formatDate(val.createdAt,true);

            val.stateMinWidth = 80;
            val.state = selectOptions.activityStatus[status];
            val.stateColor =status === 1? "green": status === 2? "red" : "yellow";
            return val;
        })

        return res;
    }

    const getMyActivities = async(load = true) => {

        try{
            if(load) setLoading(true);
            let res = await API.get(`UserActivity/findAllInProgressByIDReceiving/${user.id}`).catch(err => err);
            if(load) setLoading(false);

            if(res?.error)
                throw new Error(res.error);

            res = formatAtivity(res);
            setMyActivities(res);
        }catch(e){
            pushCallback(e.message);
        }
    }

    const getServicesActives = async(load = true) => {

        try{
            if(load)
                setLoading(true);

            let res = await API.get("ActiveService").catch(err => err);

            if(res?.error)
                throw new Error(res.error);

        

            res = res.map((val) =>{
                val.customerName = val?.customer?.firstName ? val?.customer?.firstName + " " + val?.customer?.lastName : "";
                val.service = val?.serviceOffered.name;
                val.updated = formatDate(val?.updatedAt, true, true);
                val.customerId = val?.customer?.id;
                val.serviceId = val?.serviceOffered?.id;
                return val;
            })

            setServicesActives(res);
        }catch(e){
            pushCallback(e.message);
        }finally{
            if(load)
                setLoading(false);
        }
    }

    const pushCallback = (message,type)=>{
        if(message === 401)//requsição não autorizada pelo servidor
            return;

        setCallback({
            message:message,
            actionName:"Ok!",
            type,
            action:()=>setCallback(null),
        });
    }

    useEffect(() => {
        if(signed){
            getUsers();
            getServices();
        }
    }, [signed]);

    return (
        <MainContext.Provider value={{
            // cities,
            // setCities,
            // getCities,
            getBudgets,
            budgets,
            getUsers, 
            users,
            getServices,
            services,
            setServices,
            getSuppliers,
            suppliers,
            archives,
            getArchives,
            getActivities,
            activities,
            getMyActivities,
            myActivities,
            customers,
            getCustomers,
            servicesActives,
            getServicesActives,
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