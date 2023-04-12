import React, {useState, useEffect} from 'react'
import styles from "./styles";
import Table from "./Table";
import { ScrollView, View,Text } from 'react-native';
import InputText from "../../components/Form/InputText";
import { useMainContext } from '../../contexts/mainContext';

export default function Supplier() {
    const {getSuppliers, suppliers} = useMainContext();

    const [search, setSearch] = useState("");

    const [data, setData] = useState([]);

    const filterSearch = ()=>{ //pesquisar filtrar
        
        let dataFiltered = suppliers.filter(item => {
            let res = true;
            let searchLower = search.toLowerCase();
            if(search && !item.supplier.toLowerCase().includes(searchLower) && !item?.supplierName.toLowerCase().includes(searchLower))
                res = false;
            
            return res;
        });

        setData(dataFiltered);
    }

    useEffect(()=>{
        filterSearch();
    },[search, suppliers])

    useEffect(()=>{
        if(suppliers.length)
            getSuppliers();
        else
            getSuppliers(true);
    },[]);

    useEffect(()=>{
        filterSearch();
    },[suppliers]);
    return (
        <ScrollView>
            <View style={styles.users}>
                
                {/* <AddUser isOpen={isOpenAddUser} close={setIsOpenAddUser} updateUsers={getUsers}/> */}

                <View style={styles.container}>
                    <InputText
                        label="Buscar"
                        value={search}
                        setValue={setSearch}
                    />
                </View>
                <View style={styles.container_table}>
                    <Table data={data}/>
                </View>
            </View>
        </ScrollView>
    )
}
