import React, {useRef, useEffect} from 'react'
import styles from './styles';
import {View, Pressable, Text} from "react-native";
import ICheck from "../../../assets/icons/check";
import * as Animatable from 'react-native-animatable';

const props = {
    values:Array,
    value:String,
    label:String,
    setValue:Function,
    getValue:Boolean //retornar o valor nao o id ou a key
}
export default function InputRadio({values, label, setValue,required = false, value, name, invalid, getValue = false}= props) {
  
    const setSelect = (val,key)=>{
        if(name !== undefined)
            setValue(val,name)
        else
            setValue(getValue? val :val?.id ? val.id : key);
    }


    const Option = (val, key)=>{
        const btnRef = useRef(null);

        let verify = value === val && getValue || !getValue && value === key;
        useEffect(() => {
            if(btnRef.current){
                if(verify)
                    btnRef.current.transitionTo({height:75,width:75});
                else
                    btnRef.current.transitionTo({height:200,width:200});
            }
        },[value])

        return(
            <Pressable style={styles.btn} onPress={()=>setSelect(val, key)}>
                
                <Animatable.View  ref={btnRef} style={verify? [styles.animated]:[styles.animated_desabled]}>
                    <ICheck style={styles.icon}/>
                </Animatable.View>
            </Pressable>
        )
    }

    return (
        <View style={styles.input_wrap}>
            <Text style={styles.label}>{label}{required ? "*" : ""}</Text>

            <View style={styles.options_wrap}>
                {values.map((val,key)=>{
                    return (
                        <View key={key} style={styles.option_single} >
                            {Option(val,key)}
                            <Text style={styles.label}>{val}</Text>
                        </View>
                    )
                })}
            </View>

            {invalid 
                ? <Text style={styles.invalid_alert}>{invalid}</Text>
                : <></>
            }
        </View>
    )
}
