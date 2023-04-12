import React, {useEffect, useState} from 'react'
import styles from "../ActivitiesManage/styles.js";
import Select from '../../components/Form/Select';
import InputText from '../../components/Form/InputText';
import ActivityCard from '../ActivitiesManage/ActivityCard';
import selectOptions from "../../data/selectOptions.json";
import InputDate from '../../components/Form/InputDate';
import { useMainContext } from '../../contexts/mainContext';
import { useAuthContext } from '../../contexts/authContext.js';
import ButtonSubmit from '../../components/Form/ButtonSubmit';
import ButtonClear from '../../components/Form/ButtonClear';
import {isInDateRange} from '../../services/tools';
import {View, ScrollView} from "react-native";

export default function ActivitiesManage({navigation}) {
    const {getMyActivities, myActivities} = useMainContext();
    const {hasPermission} = useAuthContext();
    const getAll = "Tudo";

    const [statusNow, setStatusNow] = useState(0);
    const [initialDate, setInitialDate] = useState("");
    const [finalDate, setFinalDate] = useState("");
    const [search, setSearch] = useState("");
    const [userSearch, setUserSearch] = useState(getAll);

    const [data, setData] = useState([]);

    const filterSearch = ()=>{ //pesquisar filtrar
        
        let dataFiltered = myActivities.filter(item => {
            let res = true;
            res = isInDateRange(item.createdAt, initialDate,finalDate);

            let fullName = item.receivingUser.firstName+" "+item.receivingUser.lastName

            let searchLower = search.toLowerCase();

            if(search && !fullName.toLowerCase().includes(searchLower) && !item.note.toLowerCase().includes(searchLower))
                res = false;

            if(parseInt(statusNow) && item.activityStatus !== parseInt(statusNow) - 1)
                res = false;
            
            return res;
        });
        
        setData(dataFiltered);
    }

    const clearFilter = ()=>{
        setStatusNow(0);
        setInitialDate("");
        setFinalDate("");
        setSearch("");
        setUserSearch(getAll);
    }

    useEffect(()=>{
        filterSearch();
    },[statusNow,initialDate,finalDate,search, myActivities, userSearch])

    useEffect(()=>{
        getMyActivities();
    },[]);

    return (
        <ScrollView>
            {/* <AddActivity isOpen={isOpenAddActivity} close={()=>setIsOpenAddActivity(false)} getActyvities={getActyvities}/> */}
            <View style={styles.container}>

                <View style={styles.form_filter}>

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
                            value={[getAll,...selectOptions.activityStatus][statusNow]}
                            setValue={(val)=>setStatusNow(parseInt(val))}
                            values={[getAll,...selectOptions.activityStatus]}
                            label={"Status"}
                            labelTop={true}
                        />
                    </View>

                    <View style={styles.input_single}>
                        <InputText
                            label="Buscar"
                            value={search}
                            setValue={setSearch}
                        />
                    </View>
                </View>

                <View style={styles.form_filter}>
                    <View style={styles.form_group}>
                        <ButtonClear onPress={clearFilter} />
                    </View>
                    
                    {
                        hasPermission() ?
                        <View style={styles.form_group}>
                            <ButtonSubmit onPress={()=>navigation.navigate("Gerenciar Atividades")}  value={"Gerenciar Atividades"} />
                        </View>
                        :<></>
                    }
                </View>

                <ActivityCard data={data} setData={setData}/>

            </View>
        </ScrollView>
    )
}