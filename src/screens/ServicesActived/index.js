import React, {useState, useEffect} from 'react'
import styles from "./styles";
import TableManager from "./TableManager";
import Select from "../../components/Form/Select";
import { useMainContext } from '../../contexts/mainContext';
import API from "../../services/api";
import InputText from '../../components/Form/InputText';
import InputDate from '../../components/Form/InputDate';
import { TouchableOpacity, View, Text, ScrollView} from 'react-native';
import { formatDate, isInDateRange } from '../../services/tools';

import Loading from '../../components/Loading';
import Callback from '../../components/Modal/Callback';

export default function ServicesActived() {
    const getAll = "Todos";
    const {services, servicesActives, getServicesActives} = useMainContext();    
    // const {setCallback, setLoading} = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [callback, setCallback] = useState(null);

    const [initialDate, setInitialDate] = useState("");
    const [finalDate, setFinalDate] = useState("");
    const [service, setService] = useState(0);
    const [search, setSearch] = useState("");

    const [data, setData] = useState([]);


    const permissionTypesFilter = ()=>{
        return ["Todos",...services.map(val =>{
            return val.name;
        })]
    }

    const filterSearch = (idFilter)=>{ //pesquisar filtrar
        
        let dataFiltered = servicesActives.filter(item => {
            let res = true;
            res = isInDateRange(item.createdAt, initialDate,finalDate);

            if(service && permissionTypesFilter()[service] !== item.service)
                res = false;

            let searchLower = search.toLowerCase();
            let fullName = item.customer.firstName+" "+item.customer.lastName;
            let serviceName = item.serviceOffered.name;
            if(search && !fullName.toLowerCase().includes(searchLower) && !serviceName.toLowerCase().includes(searchLower))
                res = false;

            if(idFilter !== undefined && item.id !== parseInt(idFilter)){
                res = false;
            }else if(idFilter !== undefined && item.id === parseInt(idFilter)){
                setSearch(item.name)
            }

            return res;
        });

        setData(dataFiltered);
    }

    const clearFilter = ()=>{
        setInitialDate("");
        setFinalDate("");
        setSearch("");
        setService(0);
    }

    useEffect(()=>{
        filterSearch();
    },[search, servicesActives, service, initialDate, finalDate])

    useEffect(()=>{
        getServicesActives(true);   
    },[]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Loading loading2={loading2} />
                <Loading loading2={loading} animation="delete" />
                <Callback params={callback} />

                <View style={styles.form}>
                    
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

                    <View style={[styles.input_single]}>
                        <Select
                            value={permissionTypesFilter()[service]}
                            values={permissionTypesFilter()}
                            setValue={setService}
                            label={"Serviço"}
                            labelTop={true}
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

                <View style={styles.form_filter}>
                    <View style={styles.form_group}>
                        <TouchableOpacity onPress={clearFilter} style={[styles.btn, styles.btn_red]} >
                            <Text  style={styles.btn_text}>Limpar</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.table_wrap}>
                    <TableManager
                        data={data} 
                        setData={setData} 
                        getData={getServicesActives}
                        setCallback={setCallback}
                        setLoading={setLoading}/>
                </View>
            </View>
        </ScrollView>
    )
}
