import React, {useEffect, useState} from 'react'
import styles from "./styles.js";
import Select from '../../components/Form/Select';
import InputText from '../../components/Form/InputText';
import ActivityCard from './ActivityCard';
import selectOptions from "../../data/selectOptions.json";
// import AddActivity from "./AddActivity"; 
import InputDate from '../../components/Form/InputDate';
import { useAuthContext } from '../../contexts/authContext';
import { useMainContext } from '../../contexts/mainContext';
import ButtonSubmit from '../../components/Form/ButtonSubmit';
import ButtonClear from '../../components/Form/ButtonClear';
import {isInDateRange} from '../../services/tools';
// import Table from './Table';
import {View, ScrollView} from "react-native";

export default function ActivitiesManage({navigation}) {
    const {users, getActivities, activities} = useMainContext();

    const getAll = "Tudo";

    const [statusNow, setStatusNow] = useState(0);
    const [initialDate, setInitialDate] = useState("");
    const [finalDate, setFinalDate] = useState("");
    const [search, setSearch] = useState("");
    const [userSearch, setUserSearch] = useState(getAll);

    const [data, setData] = useState([]);

    const filterSearch = ()=>{ //pesquisar filtrar
        
        let dataFiltered = activities.filter(item => {
            let res = true;
            res = isInDateRange(item.createdAt, initialDate,finalDate);

            let fullName = item.receivingUser.firstName+" "+item.receivingUser.lastName

            if(userSearch && userSearch !== getAll && userSearch !== fullName)
                res = false;

            let searchLower = search.toLowerCase();

            if(search && !fullName.toLowerCase().includes(searchLower) && !item.note.toLowerCase().includes(searchLower))
                res = false;

            if(parseInt(statusNow) && item.activityStatus !== parseInt(statusNow) - 1)
                res = false;
            
            return res;
        });
        
        setData(dataFiltered);
    }

    const usersList = ()=>{
        let arr = users.map(user => {
            return user.firstName+ " " + user.lastName
        });
        return arr;
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
    },[statusNow,initialDate,finalDate,search, activities, userSearch])

    useEffect(()=>{
        getActivities();
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
                        <Select 
                            value={userSearch}
                            setValue={setUserSearch}
                            values={[getAll,...usersList()]}
                            label={"Usuário"}
                            labelTop={true}
                            getValue={true}
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

                    <View style={styles.form_group}>
                        <ButtonSubmit onPress={()=>navigation.navigate("Atividades")} value={"Minhas atividades"} />
                    </View>
                </View>

                <ActivityCard data={data} setData={setData}/>
                {/* <Table data={data} setData={setData}/> */}

            </View>
        </ScrollView>
    )
}