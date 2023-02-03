import React, {useState, useEffect} from 'react'
import styles from "./styles";
import TableManager from "./TableManager";
import Select from "../../components/Form/Select";
import { useMainContext } from '../../contexts/mainContext';
import API from "../../services/api";
import InputText from '../../components/Form/InputText';
import InputDate from '../../components/Form/InputDate';
import { TouchableOpacity, View, Text} from 'react-native';
import { formatDate } from '../../services/tools';

import Loading from '../../components/Loading';
import Callback from '../../components/Modal/Callback';

export default function ServicesActived() {
    const getAll = "Todos";
    const {services} = useMainContext();    
    // const {setCallback, setLoading} = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(null);

    const [initialDate, setInitialDate] = useState("");
    const [finalDate, setFinalDate] = useState("");
    const [service, setService] = useState(0);
    const [search, setSearch] = useState("");

    const [dataMain, setDataMain] = useState([]);
    const [data, setData] = useState([]);

    const getData = async(load = true) => {

        try{
            if(load)
                setLoading(true);

            let res = await API.get("ActiveService").catch(err => err);
            if(load)
                setLoading(false);

            if(res?.error)
                throw new Error(res.error);

        

            res = res.map((val) =>{
                val.customerName = val?.customer?.firstName ? val?.customer?.firstName + " " + val?.customer?.lastName : "";
                val.service = val?.serviceOffered.name;
                val.updatedAt = formatDate(val?.updatedAt, true, true);
                val.customerId = val?.customer?.id;
                val.serviceId = val?.serviceOffered?.id;
                return val;
            })

            setDataMain(res);

        }catch(e){
            setCallback({
                message:e.message,
                actionName:"Ok!",
                action:()=>setCallback(null),
            });
        }
    }


    const permissionTypesFilter = ()=>{
        return ["Todos",...services.map(val =>{
            return val.name;
        })]
    }

    const filterSearch = (idFilter)=>{ //pesquisar filtrar
        
        let dataFiltered = dataMain.filter(item => {
            let res = true;
            let createdAtTime = new Date(item.updatedAt.split("T")[0]);

            if(initialDate){
                let initialTime = new Date(initialDate);
                if(createdAtTime < initialTime)
                    res = false;
            }

            if(finalDate){
                let finalTime = new Date(finalDate);
                if(createdAtTime > finalTime)
                    res = false;
            }

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
        setSearch("");;
        setService(getAll);
    }

    useEffect(()=>{
        filterSearch();
    },[search, dataMain, service, initialDate, finalDate])

    useEffect(()=>{
        getData(true);   
    },[])

    return (
        <View style={styles.container}>
            <Loading loading2={loading} />
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
                    getData={getData}
                    setCallback={setCallback}
                    setLoading={setLoading}/>
            </View>
        </View>
    )
}
