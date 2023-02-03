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
import {useMainContext} from "../../contexts/mainContext";

export default function Users() {
    const {cities, getCities} = useMainContext();
    const [data, setData] = useState([]);
    const [isFiltered, setIsFiltered] = useState(0);
    const [isOpenAddCity, setIsOpenAddCity] = useState(false);
    const [toSelectLength, setToSelectLength] = useState(0);


    const filterOptions = ["Cadastradas","Em análise"];

    const filter = (val)=>{//mudar filltro ao clicar 
        let arr = [...cities];
        if(!isFiltered){
            setData(arr.filter(e=> !e.active || !e.constant));
            setIsFiltered(val);
            setToSelectLength(arr.filter(e=> e.active && e.constant).length);
        }else{
            setData(arr.filter(e=> e.active && e.constant));
            setIsFiltered(val);
            setToSelectLength(arr.filter(e=> !e.active || !e.constant).length);
        }
    }

    const changeFilter = (val)=>{

        filter(parseInt(val));
    }

    useEffect(()=>{
        if(cities.length === 0){
            getCities(true);
        }
        if(isFiltered){
            setData(cities.filter(e=> !e.active || !e.constant));
            setToSelectLength(cities.filter(e=> e.active && e.constant).length);
        }else{
            setData(cities.filter(e=> e.active && e.constant));
            setToSelectLength(cities.filter(e=> !e.active || !e.constant).length);
        }
    },[cities])

    
    return (
        <ScrollView>
            <View style={styles.users}>
                
                <AddCity isOpen={isOpenAddCity} close={setIsOpenAddCity} />

                <View style={styles.container}>
                    <Pressable style={styles.order} onPress={()=>changeFilter(isFiltered === 1 ? 0 : 1)}>
                        {/* <BiShuffle/> */}
                        <IReorder style={styles.ico}/>
                        <Select
                            value={filterOptions[isFiltered]}
                            values={filterOptions}
                            setValue={changeFilter}
                            style2={styles.select}
                        />
                    </Pressable>

                    <Pressable onPress={()=>setIsOpenAddCity(true)} style={styles.add_user}>
                        <IMarkMap style={styles.ico}/> 
                        <Text style={styles.btn_text}>Cadastrar cidade</Text>
                    </Pressable>
                </View>
                
                <View style={styles.container_length}>
                    <Text style={styles.h2}>
                        Resultados ({data.length})
                    </Text>
                </View>
                <Table data={data} setData={setData}/>
            </View>
        </ScrollView>
    )
}
