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
  limit = 255,
  required = false,
}) {

  const addValue = (val,name) =>{
    if(val.length > limit)
      return;

    if(name)
      setValue(val,name);
    else  
      setValue(val);
  }

  return (
    <View style={styles.input_Wrap}>

      <View style={styles.label_wrap}>
        <Text style={styles.label}>
          {label}{required ? "*" : ""}
        </Text>
      </View>


      <TextInput
        style={!invalid ? [styles.input] : [styles.input,styles.input_invalid]}
        value={value}
        onEndEditing={()=>onBlur()}
        placeholder={placeholder}
        onChangeText={(text) => name?addValue(text,name):addValue(text)} //retorna o valor ao state
        keyboardType={keyboardType} //tipo de teclado
        autoFocus={focus} //focar o input
        editable={editable}
        multiline={true}
        textAlignVertical={"top"}
      />
      <View style={styles.botton_info_wrap}>
        {invalid 
          ? <Text style={styles.invalid_alert}>{invalid}</Text>
          : <View/>
        }
        <Text style={styles.limit_text}>{value.length}/{limit}</Text>
      </View>
    </View> 
  )
}
