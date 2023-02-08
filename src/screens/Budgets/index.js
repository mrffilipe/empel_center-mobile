import styles from "./styles";
import React, {useState, useEffect} from "react";
import {View, Pressable, ScrollView, Text} from "react-native";
import InputText from "../../components/Form/InputText";
import InputDate from "../../components/Form/InputDate";
import Select from "../../components/Form/Select";
import IDetailsList from "../../assets/icons/detailsList";
import IFilter from "../../assets/icons/filter";
import Table from "./Table";
import Dragables from "../../components/Dragables";
import Leads from "./Leads";
import API from "../../services/api";
import {useAuthContext} from "../../contexts/authContext";
import { useMainContext } from "../../contexts/mainContext";
import States from "../../data/selectOptions.json";
import {isInDateRange} from '../../services/tools';

export default function Budgets({navigation}) {
    const {setCallback, callback, loading} = useAuthContext();
    const {budgets, getBudgets, users} = useMainContext();

    const getAll = "Todos";
    
    const [filter, setFilter] = useState(true);
    const [search, setSearch] = useState("");
    const [initialDate, setInitialDate] = useState("");
    const [finalDate, setFinalDate] = useState("");
    const [seller, setSeller] = useState(getAll);
    // const [category, setCategory] = useState(getAll);
    const [searchStatus, setSearchStatus] = useState(getAll);

    const [data, setData] = useState([]);
    

    const [status, setStatus] = useState([]);

    const handleSubmit = (e)=>{
        e.preventDefault();

    }

    const changeFilter = (e)=>{
        e.preventDefault();
        setFilter(!filter);
    }

    const clearForm = ()=>{
        setInitialDate("");
        setFinalDate("");
        setSeller(getAll);
        // setCategory(getAll);
        setSearchStatus(getAll);
        setSearch("");
    }

    const filterSearch = ()=>{ //pesquisar filtrar
        let dataFiltered = budgets.filter(item => {
            let res = true;
            res = isInDateRange(item.createdAt, initialDate,finalDate);

            if(search && !item.customerName.toLowerCase().includes(search.toLowerCase()) && !item.seller.toLowerCase().includes(search.toLowerCase()))
                res = false;

            if(seller  && seller !== getAll && !item?.seller.toLowerCase().includes(seller.toLowerCase()))
                res = false;

            if(searchStatus && searchStatus !== getAll && status[item.status]?.name !== searchStatus)
                res = false;
            
            return res;
        });
        setData(dataFiltered);
    }

    const changeStatus = async(obj)=>{

        let res = await API.put("PVForm/change-status",{},
        {   
            headers:
                {
                    id:obj?.id,
                    newStatus:obj?.status
                }
        }).catch(err => err);
                
        if(res.error || res !== 200){
            getBudgets();
            setCallback({
                type: 0,
                message:res?.error ? res.error : res === 204 ? "Não foi possível mudar status.\n Error: "+res : `Algo deu errado!`,
                action:()=>setCallback(null),
                actionName:"Ok",
                close:()=>setCallback(null)
            })
        }
    }

    const usersList = ()=>{
        let arr = users.filter(user => user.consultant && user.consultant.active).map(user => user.firstName+ " " + user.lastName);
        return arr;
    }

    useEffect(()=>{
        if(!budgets.length)
            getBudgets(true);
        else
            getBudgets(false);//atualizar sem loading
    },[])


    useEffect(()=>{
        filterSearch();
    },[search, initialDate, finalDate, searchStatus, budgets, seller])

    useEffect(()=>{
        setStatus(States.budgetsStatus.map((val)=>{//adcionar quantidade em cada status
            val.amount = data.filter(obj => obj.status === val.key).length
            return val;
        }))
    },[data])

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.budgets}>

                        <View style={styles.form}>
                            <View style={styles.View_group}>
                                <View style={[styles.input_group,styles.input_group_dates]}>
                                    <View style={[styles.input_single]}>
                                        <InputDate
                                            label="Do dia"
                                            value={initialDate}
                                            setValue={setInitialDate}
                                        />
                                    </View>
                                    <View style={styles.input_single}>
                                        <InputDate
                                            label="Até dia"
                                            value={finalDate}
                                            setValue={setFinalDate}
                                        />
                                    </View>

                                    <View style={styles.input_single}>
                                        <Select
                                            label="Vendedor"
                                            labelTop={true}
                                            value={seller}
                                            values={[getAll,...usersList()]}
                                            setValue={setSeller}
                                            getValue={true}
                                        />
                                    </View>
                                    {/* <View style={[styles.input_single]}>
                                        <Select
                                            label="Categoria"
                                            labelTop={true}
                                            value={category}
                                            values={["Todos","Fotovoltaica","Motores"]}
                                            setValue={setCategory}
                                        />
                                    </View> */}

                                    {!filter ? <View style={styles.input_single}><Select
                                        label="Status"
                                        labelTop={true}
                                        value={searchStatus}
                                        values={[getAll,... States?.budgetsStatus.map(val => val.name)]}
                                        setValue={setSearchStatus}
                                        getValue={true}
                                    /></View> :
                                    <></>}

                                    <View style={[styles.input_single]}>
                                        <InputText
                                            label="Buscar"
                                            value={search}
                                            setValue={setSearch}
                                            // type="search"
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={[styles.View_group,styles.View_group_Pressables]}>


                                <View style={styles.submit}>
                                    <Pressable onPress={(e)=>changeFilter(e)} style={styles.btn} android_ripple={{ color: "rgba(250, 250, 250, 0.3)"}}>
                                        {!filter
                                            ? <><IFilter style={styles.icon}/><Text style={styles.btn_text}> Funil</Text></>
                                            : <><IDetailsList style={styles.icon}/><Text style={styles.btn_text}> Lista</Text></>
                                        }
                                    </Pressable>

                                    <Pressable onPress={clearForm} style={[styles.btn, styles.btn_red]} android_ripple={{ color: "rgba(250, 250, 250, 0.3)"}}>
                                        <Text  style={styles.btn_text}>Limpar</Text>
                                    </Pressable>
                                    
                                </View>

                            </View>

                            
                        </View>

                        {!filter
                            ? <Table data={data} states={status} navigate={navigation.navigate}/>
                            : <Dragables changeStatus={changeStatus} data={data} setData={setData} status={status} navigate={navigation.navigate} >
                                <Leads/>
                            </Dragables>
                        }
                </View>
            </View>
        </ScrollView>
    );
}

