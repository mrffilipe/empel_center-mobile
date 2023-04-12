import React, {useState, useEffect} from 'react'
import styles from "./styles";
import Table from "./Table";
import { ScrollView, View, Pressable, Text } from 'react-native';
import Select from "../../components/Form/Select";
import { useMainContext } from '../../contexts/mainContext';
import InputDate from '../../components/Form/InputDate';
import InputText from '../../components/Form/InputMask';
import {isInDateRange} from '../../services/tools';

export default function Customers({navigation}) {
    const getAll = "Todos";
    const {getCustomers, customers} = useMainContext();    

    const [initialDate, setInitialDate] = useState("");
    const [finalDate, setFinalDate] = useState("");
    const [service, setService] = useState(getAll);
    const [search, setSearch] = useState("");

    const [data, setData] = useState([]);


    const servicesActivesAmount = ["0","1","2","3","4","5+"];

    const filterSearch = (idFilter)=>{ //pesquisar filtrar

        let dataFiltered = customers.filter(item => {
            let res = true;
            res = isInDateRange(item.createdAt, initialDate,finalDate);

            let searchLower = search.toLowerCase();
            let fullName = item?.fullName;
            if(search && !fullName.toLowerCase().includes(searchLower))
                res = false;

            let minService = parseInt(service) - 1;
            if(service >= 0 && parseInt(service) != item?.amountOfActiveServices || minService == 5 && item?.amountOfActiveServices >= 5)
                res = false;
            
            return res;
        });

        setData(dataFiltered);
    }

    const clearFilter = ()=>{
        setInitialDate("");
        setFinalDate("");
        setSearch("");;
        setService(getAll);
    }

    useEffect(()=>{
        filterSearch();
    },[search, customers, service, initialDate, finalDate]);

    useEffect(()=>{
        getCustomers(customers.length ? false : true);   
    },[]);

    return (
        <ScrollView>
            <View style={styles.users}>
                
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
                                    label={"Serviços ativos"}
                                    labelTop={true}
                                    value={service}
                                    values={[getAll,...servicesActivesAmount]}
                                    setValue={setService}
                                    getValue={true}
                                />
                            </View>

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

                            <Pressable onPress={clearFilter} style={[styles.btn, styles.btn_red]} android_ripple={{ color: "rgba(250, 250, 250, 0.3)"}}>
                                <Text  style={styles.btn_text}>Limpar</Text>
                            </Pressable>
                            
                        </View>

                    </View>
                </View>
                <View style={styles.table_wrap}>
                    <Table data={data} navigation={navigation} setData={setData} getData={getCustomers}/>
                </View>
            </View>
        </ScrollView>
    )
}
