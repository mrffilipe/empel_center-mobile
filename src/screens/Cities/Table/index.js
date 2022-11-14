import styles from "./styles";
import React, {useState, useEffect} from "react";
import {View, Text, Pressable} from "react-native";
import AllClear from "../../../components/AllClear";
import AddCity from "../../../components/Modal/AddCity";
const props = {
    data:[{
        id:Number,
        name:String,
        state:String,
        country:String,
        constant:String,
    }],
    setData:Function
}
export default function Table({data, permission, setData} = props) {

    const [isOpenEditCity, setIsOpenEditCity] = useState(false);
    const [citySelected, setCitySelected] = useState(null);

    const openEditCity = (val)=>{
        setCitySelected(val);
    }

    useEffect(()=>{
        if(citySelected)
            setIsOpenEditCity(true);
    },[citySelected])

    useEffect(()=>{
        if(!isOpenEditCity)
            setCitySelected(null);
    },[isOpenEditCity])

    return (
        <View style={[styles.container]}>
            <AddCity isOpen={isOpenEditCity} values={citySelected} close={setIsOpenEditCity} />

            <View style={[styles.list]}>
                {data.length ?
                    data.map((val,key)=>{
                        return(
                            <View
                            key={key} 
                            style={[styles.list_wrap,styles.info]}>

                                <View style={val.active?[styles.info]:[styles.info,styles.info_desabled]}>
                                    <View style={styles.table_wrap}>
                                        {/* GRUPO A */}

                                        <View style={styles.text_wrap}>
                                            <Text style={[styles.h5]}>Nome: </Text>
                                            <Text style={[styles.h5,styles.h5_content,styles.right]}>{val?.name}</Text>
                                        </View>

                                        <View style={styles.text_wrap}>
                                            <Text style={[styles.h5]}>Estado: </Text>
                                            <Text style={[styles.h5,styles.h5_content,styles.right]}>{val?.state}</Text>
                                        </View>

                                        <View style={styles.text_wrap}>
                                            <Text style={[styles.h5]}>País: </Text>
                                            <Text style={[styles.h5,styles.h5_content,styles.right]}>{val?.country}</Text>
                                        </View>

                                        <View style={styles.text_wrap}>
                                            <Text style={[styles.h5]}>Constante: </Text>
                                            <Text style={[styles.h5,styles.h5_content,styles.right]}>{val?.constant? "R$ "+val.constant : "#"}</Text>
                                        </View>


                                        <View style={styles.text_wrap}>
                                            {val?.constant
                                                ? 
                                                <Pressable style={styles.btn} onPress={()=>openEditCity(val)}>
                                                    <Text style={styles.btn_text}>{"Editar"}</Text>
                                                </Pressable>
                                                : 
                                                <Pressable style={[styles.btn,styles.btn_activete]} onPress={()=>openEditCity(val)}>
                                                    <Text style={styles.btn_text}>{"Finalizar Cadastro"}</Text>
                                                </Pressable>
                                            }
                                        </View>

                                    </View>

                                </View>
                            </View>
                        )
                    })
                    :<AllClear msg={"Sem informações aqui!"}/>
                }

            </View>
        </View>
    )
}

