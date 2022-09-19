import React,{useState, useEffect} from 'react'
import {Modal, Pressable, View, Text, ScrollView} from 'react-native';
import IArrowDown from "../../../assets/icons/arrowDown";
import styles from "./styles.js";

let props = {
    label:String,
    value:String,
    values:Array,
    setValue:Function,
    labelTop:Boolean,
    name:String | null,//
    inavlid:null | String
}

export default function Select({
    label, 
    value = "", 
    values = [], 
    setValue, 
    labelTop = false,
    name = null,
    style2 = {},
    invalid = null,
    } = props) {
    const [modalVisible, setModalVisible] = useState(false);

    const setSelect = (val)=>{
        if(name !== undefined)
            setValue(val,name)
        else
            setValue(val);
        setModalVisible(false);
    }

    return (
        <View style={labelTop?[styles.formSelect,styles.column, style2]:[styles.formSelect, style2]}>
            {label ?<Text style={styles.label}>{label}</Text>:<></>}

            <Pressable 
            style={labelTop?[styles.select,styles.select_w100,invalid ? styles.input_invalid:{}]:[styles.select,invalid ? styles.input_invalid:{}]} 
            android_ripple={{ color: "rgba(220, 220, 220, 0.25)"}}
            onPress={()=>setModalVisible(true)}>
                <Text style={styles.value}>{value}</Text> 
                <IArrowDown style={styles.icon}/>
            </Pressable>

            {invalid 
                ? <Text style={styles.invalid_alert}>{invalid}</Text>
                : <></>
            }

            <Modal
            style={styles.modal}
            animationType="fade"
            transparent={true}
            
            visible={modalVisible}>
               
                <ScrollView style={styles.options} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                    <Pressable onPress={()=>setModalVisible(false)} style={styles.overlay}></Pressable>
                    <View style={styles.options_wrap}>
                    
                            {values.map((val,key) =>{
                                return(
                                    <Pressable 
                                    onPress={()=>setSelect(val)}
                                    android_ripple={{ color: "rgba(0, 0, 0, 0.25)"}} 
                                    style={val === value
                                        ?[styles.option,styles.optionSelected]
                                        :[styles.option]} key={key} >
                                        <Text 
                                        style={styles.optionText}>
                                            {val}
                                        </Text>
                                    </Pressable>
                                )
                            })}
                        
                    </View>
                </ScrollView>
            </Modal>
        </View>
    )
}
