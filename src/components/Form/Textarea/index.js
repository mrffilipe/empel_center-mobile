import React from 'react';
import {View, Text, TextInput} from "react-native"; 
import styles from "./styles";
export default function InputText({
  label = "",
  placeholder = "",
  value = "",
  setValue = Function,
  type = "off",
  textContentType = "none", // IOS tipo de conteudo a ser incerido
  keyboardType = "default", //tipo de teclado 
  invalid = false,
  focus = false,
  editable = true,
  name = null,
  onBlur = ()=>{},
}) {

  return (
    <View style={styles.input_Wrap}>

      <View style={styles.label_wrap}>
        <Text style={styles.label}>
          {label}
        </Text>
      </View>


      <TextInput
        style={!invalid ? [styles.input] : [styles.input,styles.input_invalid]}
        value={value}
        onEndEditing={()=>onBlur()}
        placeholder={placeholder}
        onChangeText={(text) => name?setValue(text,name):setValue(text)} //retorna o valor ao state
        keyboardType={keyboardType} //tipo de teclado
        autoFocus={focus} //focar o input
        editable={editable}
        multiline={true}
        textAlignVertical={"top"}
      />
      {invalid 
       ? <Text style={styles.invalid_alert}>{invalid}</Text>
       : <></>
      }
    </View> 
  )
}
