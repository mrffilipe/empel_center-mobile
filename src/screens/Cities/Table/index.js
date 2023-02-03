import styles from "./styles";
import React, {useState, useEffect} from "react";
import {View, Text, Pressable} from "react-native";
import AllClear from "../../../components/AllClear";
import AddCity from "../../../components/Modal/AddCity";
import { useAuthContext } from "../../../contexts/authContext";
import { toMoney } from "../../../services/tools";

const props = {
    data:[{
        id:Number,
        citie:String,
        state:String,
        country:String,
        constant:Number,
        updatedAt:Date,
        createdAt:Date,
    }]
}
export default function Table({data} = props) {
    const {hasPermission} = useAuthContext();
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
                        const isActive = val.active && val.constant;
                        return(
                            <View
                            key={key} 
                            style={[styles.list_wrap,styles.info]}>

                                <View style={isActive ?[ styles.info]:[styles.info,styles.info_desabled]}>
                                    <View style={styles.table_wrap}>
                                        {/* GRUPO A */}

                                        <View style={styles.text_wrap}>
                                            <Text style={[styles.h5]}>Nome: </Text>
                                            <Text style={[styles.h5,styles.h5_content,styles.right]}>{val?.citie}</Text>
                                        </View>

                                        <View style={styles.text_wrap}>
                                            <Text style={[styles.h5]}>Estado: </Text>
                                            <Text style={[styles.h5,styles.h5_content,styles.right]}>{val?.state}</Text>
                                        </View>

                                        <View style={styles.text_wrap}>
                                            <Text style={[styles.h5]}>País: </Text>
                                            <Text style={[styles.h5,styles.h5_content,styles.right]}>{val?.country}</Text>
                                        </View>
                                        {hasPermission() ?
                                        <>
                                            <View style={styles.text_wrap}>
                                                <Text style={[styles.h5]}>Constante: </Text>
                                                <Text style={[styles.h5,styles.h5_content,styles.right]}>{val?.constant? "R$ "+toMoney(val.constant) : "#"}</Text>
                                            </View>


                                            <View style={styles.text_wrap}>
                                                {isActive
                                                    ? 
                                                    <Pressable style={[styles.btn,styles.btn_activete]} onPress={()=>openEditCity(val)}>
                                                        <Text style={styles.btn_text}>{"Editar"}</Text>
                                                    </Pressable>
                                                    : 
                                                    <Pressable style={[styles.btn]} onPress={()=>openEditCity(val)}>
                                                        <Text style={styles.btn_text}>{"Finalizar Cadastro"}</Text>
                                                    </Pressable>
                                                }
                                            </View>
                                        </>
                                        :<></>
                                        }

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

