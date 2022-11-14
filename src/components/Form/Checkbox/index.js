import React, {useRef} from 'react';
import {View, Text, Pressable} from "react-native"; 
import styles from "./styles";
import * as Animatable from 'react-native-animatable';
export default function InputText({
  label = "",
  value = false,
  setValue = Function,
  name = null
}) {
  const boolRef = useRef(null);

  const save = ()=>{
    if(name){
      setValue(!value,name)
    }else{
      setValue(!value)
    }
    if(boolRef.current){
        if(value)
          boolRef.current.transitionTo({left:1.5})
        else
          boolRef.current.transitionTo({left:36.5})
    }
  }

  return (
    
    <View style={[styles.checkbox]} >

        <Pressable style={[styles.btn,value?styles.enabled:styles.disabled]} onPress={save}>
          <Text style={styles.text}>{value?"Sim":"Não"}</Text>
          <Animatable.View ref={boolRef} style={value?[styles.input]:[styles.input,styles.disabled_input]}/>
        </Pressable>

        <Text style={styles.label}>{label}</Text>
    </View>
  )
}
