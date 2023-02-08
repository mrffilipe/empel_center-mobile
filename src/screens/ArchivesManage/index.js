import React, {useEffect, useState} from 'react'
import styles from "./styles";
import Select from '../../components/Form/Select';
import InputText from '../../components/Form/InputText';
import ArchiveCard from './ArchiveCard';
import InputDate from '../../components/Form/InputDate';
import { useMainContext } from '../../contexts/mainContext';
import { View, ScrollView} from 'react-native';
import {isInDateRange} from '../../services/tools';
import ButtonClear from "components/Form/ButtonClear";

export default function ArchivesManage() {

    const {users, getArchives, archives} = useMainContext();

    const getAll = "Tudo";

    const [format, setFormat] = useState(getAll);
    const [initialDate, setInitialDate] = useState("");
    const [finalDate, setFinalDate] = useState("");
    const [search, setSearch] = useState("");
    const [userSearch, setUserSearch] = useState(getAll);
    const [formatTypes, setFormatTypes] = useState([]);

    const [data, setData] = useState([]);

    const addFormatTypes = (arr)=>{
        arr = arr.map((val)=> {
            return val.file.extension;
        })

        setFormatTypes([...new Set(arr)]);
    }

    const filterSearch = ()=>{ //pesquisar filtrar
        
        let dataFiltered = archives.filter(item => {
            let res = true;

            res = isInDateRange(item.createdAt, initialDate,finalDate);

            let fullName = item.file.user.firstName+" "+item.file.user.lastName;

            if(userSearch && userSearch !== getAll && userSearch !== fullName)
                res = false;

            let searchLower = search.toLowerCase();

            if(search && !fullName.toLowerCase().includes(searchLower) && !item.name.toLowerCase().includes(searchLower)){
                if(!item?.note || item?.note && !item.note.toLowerCase().includes(searchLower))
                    res = false;
            }

            

            if(format && format !== getAll && item.file.extension !== format)
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
        setFormat(getAll);
        setInitialDate("");
        setFinalDate("");
        setSearch("");
        setUserSearch(getAll);
    }

    useEffect(()=>{
        filterSearch();
    },[format,initialDate,finalDate,search, archives, userSearch])

    useEffect(()=>{
        addFormatTypes(archives);
    },[archives])

    useEffect(()=>{
        getArchives();
    },[]);

    return (
        <ScrollView>
            {/* <AddArchive isOpen={isOpenAddArchive} close={()=>setIsOpenAddArchive(false)} getArchives={getArchives}/> */}
            <View style={styles.container}>

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

                    <View style={styles.input_single}>
                        <Select 
                            value={format}
                            setValue={setFormat}
                            values={[getAll,...formatTypes]}
                            label={"Formato"}
                            labelTop={true}
                            getValue={true}
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
                    <ButtonClear onPress={clearFilter} />
                </View>

                <ArchiveCard data={data} setData={setData}/>

            </View>
        </ScrollView>
    )
}