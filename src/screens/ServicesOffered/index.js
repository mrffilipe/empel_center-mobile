import React, {useEffect, useState} from 'react'
import styles from "./styles";
import InputText from '../../components/Form/InputText';
import { useMainContext } from '../../contexts/mainContext';
import { Text, View } from 'react-native';

export default function ArchivesManage({router}) {
    const idService = router?.params;
    const {getServices, services} = useMainContext();

    const [search, setSearch] = useState("");

    const [data, setData] = useState([]);

    const filterSearch = (idFilter)=>{ //pesquisar filtrar
        
        let dataFiltered = services.filter(item => {
            let res = true;
            let searchLower = search.toLowerCase();
            if(search && !item.name.toLowerCase().includes(searchLower) && !item.description.toLowerCase().includes(searchLower))
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

    useEffect(()=>{
        filterSearch();
    },[search, services])

    useEffect(()=>{
        if(services.length)
            getServices();
        else
            getServices(true);
    },[]);

    useEffect(()=>{
        filterSearch(idService?.id);
    },[idService, services]);

    return (
        <View>
            <View style={styles.container}>

                <View style={styles.form_filter}>
                    <View style={styles.form_group}>
                        <InputText
                            label="Buscar"
                            value={search}
                            setValue={setSearch}
                        />
                    </View>

                </View>

                <View style={styles.amount_data}>
                    <Text style={"count"}>Resultados <Text>({data.length})</Text></Text>
                </View>

            </View>
        </View>
    )
}