import React from 'react';
import {View, Text, Pressable} from "react-native"; 
import styles from "./styles";

export default function InputText({
  label = "",
  value = false,
  setValue = Function,
  name = null
}) {

  const save = ()=>{
    if(name){
      setValue(!value,name)
    }else{
      setValue(!value)
    }
  }

  return (
    
    <View style={[styles.checkbox]} >
        <Text style={styles.label}>{label}</Text>

        <Pressable style={[styles.btn,value?styles.enabled:styles.disabled]} onPress={save}>
          <Text style={styles.text}>{value?"Sim":"Não"}</Text>
          <View style={value?[styles.input]:[styles.input,styles.disabled_input]}/>
        </Pressable>
    </View>
  )
}
