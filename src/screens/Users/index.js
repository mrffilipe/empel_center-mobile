import React, {useState, useEffect} from 'react'
import styles from "./styles";
import Table from "./Table";
import IUser from "../../assets/icons/user";
import IPlus from "../../assets/icons/plus";
import IReorder from "../../assets/icons/reorder";
import { ScrollView, View, Pressable, Text } from 'react-native';
import AddUser from "./AddUser";
import Select from "../../components/Form/Select";
export default function Users() {
    const [data, setData] = useState([]);
    const [isFiltered, setIsFiltered] = useState(0);
    const [permission, setPermission] = useState([]);
    const [isOpenAddUser, setIsOpenAddUser] = useState(false);

    const p = ["Ativas","Vendedor","Administrador","Developer","Desativadas"];
    const d = [
        {
            id:1,
            name:"Felipe",
            email:"email@gmail.com",
            phone:99999999999,
            permission:p[2],
            active:false
        },{
            id:2,
            name:"Bruno",
            email:"email@gmail.com",
            phone:99999999999,
            permission:p[1],
            active:true
        }
    ]

    const filter = ()=>{//mudar filltro ao clicar 
        let arr = [...d];
        if(!isFiltered)
            return  setData(arr.filter(e=> e.active));
        let index = p[isFiltered];
        if(index !== undefined){
            if(isFiltered === p.length - 1)
                setData(arr.filter(e=> !e.active));
            else
                setData(arr.filter(val => val.permission === index && val.active));
        }else{
            setIsFiltered(0);
        }
    }


    const changeFilter = (val)=>{
        
        let index = isFiltered;
        for(let i in p){
            if(p[i] === val)   
                index = i;
        }

        setIsFiltered(parseInt(index));
    }


    useEffect(()=>{
        filter();
    },[isFiltered])

    useEffect(()=>{
        setData(d.filter(e=> e.active));
        setPermission(p.filter(e => e !== "Desativadas"))
    },[])
    return (
        <ScrollView>
            <View style={styles.users}>
                
                <AddUser isOpen={isOpenAddUser} close={setIsOpenAddUser} />

                <View style={styles.container}>
                    <Pressable style={styles.order} onPress={()=>setIsFiltered(isFiltered + 1)}>
                        {/* <BiShuffle/> */}
                        <IReorder style={styles.ico}/>
                        <Select
                            value={p[isFiltered]}
                            values={p}
                            setValue={changeFilter}
                            style2={styles.select}
                        />
                    </Pressable>

                    <Pressable onPress={()=>setIsOpenAddUser(true)} style={styles.add_user}>
                        <IUser style={styles.ico}/> 
                        <IPlus style={styles.ico2}/> 
                        <Text style={styles.btn_text}>Novo usuário</Text>
                    </Pressable>
                </View>
                <Table data={data} permission={permission} setData={setData}/>
            </View>
        </ScrollView>
    )
}
