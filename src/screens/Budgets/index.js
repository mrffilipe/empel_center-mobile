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
export default function Budgets({navigation}) {
    const [filter, setFilter] = useState(true);
    const [search, setSearch] = useState("");
    const [initialDate, setInitialDate] = useState({});
    const [finalDate, setFinalDate] = useState({});
    const [seller, setSeller] = useState("Todos");
    const [category, setCategory] = useState("Todos");
    const [searchStatus, setSearchStatus] = useState("");

    const [data, setData] = useState([]);

    const handleSubmit = ()=>{


    }

    const changeFilter = (e)=>{
        e.preventDefault();
        setFilter(!filter);
    }


    const d = [
        {
            id:1,
            customer:"Felipe",
            seller:"Bruno",
            category:"Fotovoltaica",
            date:"26/07/2022",
            status:1,
        },
        {
            id:2,
            customer:"Felipe",
            seller:"Bruno",
            category:"Fotovoltaica",
            date:"26/07/2022",
            status:2,
            reminder:[]
        },
        {
            id:3,
            customer:"Bruno",
            seller:"Felipe",
            category:"Fotovoltaica",
            date:"26/07/2022",
            status:3,
        },
        {
            id:4,
            customer:"Felipe",
            seller:"Bruno",
            category:"Fotovoltaica",
            date:"26/07/2022",
            status:4,
        },
        {
            id:5,
            customer:"Felipe",
            seller:"Bruno",
            category:"Fotovoltaica",
            date:"26/07/2022",
            status:0,
        }
    ]

    const status = [
        {
            key:4,
            name:"ORÇAMENTO",
            color:"blue_dark",
            amount:data.filter(obj => obj.status === 4).length,
        },
        {
            key:3,
            name:"PROPOSTA ENVIADA",
            color:"dark_blue",
            amount:data.filter(obj => obj.status === 3).length,
        },
        {
            key:2,
            name:"NEGOCIÇÃO",
            color:"orange",
            amount:data.filter(obj => obj.status === 2).length,
        },
        {
            key:1,
            name:"FINALIZADO",
            color:"green",
            amount:data.filter(obj => obj.status === 1).length,
        },
        {
            key:0,
            name:"CANCELADO",
            color:"red",
            amount:data.filter(obj => obj.status === 0).length,
        }
    ]

    const clearView = ()=>{
        setInitialDate({});
        setFinalDate({});
        setSeller("");
        setCategory("");
        setSearchStatus("");
        setSearch("");
    }

    useEffect(()=>{
        setData(d);
    },[])

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
                                            values={["Todos","Bruno","felipe"]}
                                            setValue={setSeller}
                                        />
                                    </View>
                                    <View style={[styles.input_single]}>
                                        <Select
                                            label="Categoria"
                                            labelTop={true}
                                            value={category}
                                            values={["Todos","Fotovoltaica","Motores"]}
                                            setValue={setCategory}
                                        />
                                    </View>

                                    {!filter ? <View style={styles.input_single}><Select
                                        label="Status"
                                        labelTop={true}
                                        value={searchStatus}
                                        values={["Todos","Pendente","Em Andamento","Finalizadas"]}
                                        setValue={setSearchStatus}
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

                                    <Pressable onPress={clearView} style={[styles.btn, styles.btn_red]} android_ripple={{ color: "rgba(250, 250, 250, 0.3)"}}>
                                        <Text  style={styles.btn_text}>Limpar</Text>
                                    </Pressable>
                                    
                                </View>

                            </View>

                            
                        </View>

                        {!filter
                            ? <Table data={data} states={status} navigate={navigation.navigate}/>
                            : <Dragables data={data} setData={setData} status={status} navigate={navigation.navigate} >
                                <Leads/>
                            </Dragables>
                        }
                </View>
            </View>
        </ScrollView>
    );
}

