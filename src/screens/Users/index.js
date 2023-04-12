import React, {useState, useEffect} from 'react'
import styles from "./styles";
import Table from "./Table";
import IReorder from "../../assets/icons/reorder";
import { ScrollView, View, Pressable, Text } from 'react-native';
import Select from "../../components/Form/Select";
import optionsSelect from "../../data/selectOptions.json";
import enumData from "../../data/enum.json";
import { useMainContext } from '../../contexts/mainContext';

export default function Users({navigation}) {
    const {users, getUsers} = useMainContext();

    const [data, setData] = useState([]);
    const [isFiltered, setIsFiltered] = useState(0);
    // const [isOpenAddUser, setIsOpenAddUser] = useState(false);

    const permissionTypesFilter = ["Ativos",...optionsSelect?.typeAccess,"Inativos"]

    const filter = ()=>{//mudar filltro ao clicar 
        let arr = [...users];
        if(!isFiltered)// 0 todas as contas ativas
            return  setData(arr.filter(e=> e?.consultant && e?.consultant?.active));
        let permissionValueSelected = permissionTypesFilter[isFiltered];
        if(permissionValueSelected !== undefined){
            if(isFiltered === permissionTypesFilter.length - 1)//contas desativadas
                setData(arr.filter(e=> !e?.consultant || !e?.consultant?.active));
            else //filtrar por permissão ou cargo
                setData(arr.filter(val => optionsSelect.typeAccess[enumData.typeAccess[val.typeAccess]] === permissionValueSelected && val?.consultant && val?.consultant?.active));
        }else{
            setIsFiltered(0);
        }
    }

    const changeFilter = (val)=>{

        setIsFiltered(parseInt(val));
    }

    useEffect(()=>{
        filter();
    },[isFiltered, users])

    useEffect(()=>{
        if(users.length === 0){
            getUsers(true);   
        }else{
            getUsers()
        }
    },[users])


    return (
        <ScrollView>
            <View style={styles.users}>
                
                {/* <AddUser isOpen={isOpenAddUser} close={setIsOpenAddUser} updateUsers={getUsers}/> */}

                <View style={styles.container}>
                    <Pressable style={styles.order} onPress={()=>setIsFiltered(isFiltered + 1)}>
                        {/* <BiShuffle/> */}
                        <IReorder style={styles.ico}/>
                        <Select
                            value={permissionTypesFilter[isFiltered]}
                            values={permissionTypesFilter}
                            setValue={changeFilter}
                            style2={styles.select}
                        />
                    </Pressable>

                    {/* <Pressable onPress={()=>setIsOpenAddUser(true)} style={styles.add_user}>
                        <IUser style={styles.ico}/> 
                        <IPlus style={styles.ico2}/> 
                        <Text style={styles.btn_text}>Novo usuário</Text>
                    </Pressable> */}
                </View>

                <View style={styles.container_length}>
                    <Text style={styles.h2}>
                        Resultados ({data.length})
                    </Text>
                </View>
                
                <Table data={data} navigation={navigation} setData={setData} getData={getUsers}/>
            </View>
        </ScrollView>
    )
}
