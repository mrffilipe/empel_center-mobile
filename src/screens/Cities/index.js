import React, {useState, useEffect} from 'react'
import styles from "./styles";
import Table from "./Table";
import IUser from "../../assets/icons/user";
import IPlus from "../../assets/icons/plus";
import IMarkMap from "../../assets/icons/mapMark";
import IReorder from "../../assets/icons/reorder";
import { ScrollView, View, Pressable, Text } from 'react-native';
import AddCity from "../../components/Modal/AddCity";
import Select from "../../components/Form/Select";
export default function Users() {
    const [data, setData] = useState([]);
    const [isFiltered, setIsFiltered] = useState(0);
    const [isOpenAddCity, setIsOpenAddCity] = useState(false);

    const p = ["Cadastradas","Em análise"];
    const d = [
        {
            id:1,
            name:"Abadia de Goiás",
            state:"GO",
            country:"BR",
            constant:"100,00",
        },{
            id:2,
            name:"Água Limpa",
            state:"GO",
            country:"BR",
            constant:"50,00",
        },
        {
            id:2,
            name:"Acreúna",
            state:"GO",
            country:"BR",
            constant:null,
        }
    ]

    const filter = ()=>{//mudar filltro ao clicar 
        let arr = [...d];
        if(!isFiltered)
            return  setData(arr.filter(e=> e.constant));
        let index = p[isFiltered];
        if(index !== undefined){
            return  setData(arr.filter(e=> !e.constant));
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
        setData(d.filter(e=> e.constant));
    },[])
    return (
        <ScrollView>
            <View style={styles.users}>
                
                <AddCity isOpen={isOpenAddCity} close={setIsOpenAddCity} />

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

                    <Pressable onPress={()=>setIsOpenAddCity(true)} style={styles.add_user}>
                        <IMarkMap style={styles.ico}/> 
                        <Text style={styles.btn_text}>Cadastrar cidade</Text>
                    </Pressable>
                </View>

                <Table data={data} setData={setData}/>
            </View>
        </ScrollView>
    )
}
