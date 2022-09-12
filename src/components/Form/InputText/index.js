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
  name = null
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
        placeholder={placeholder}
        onChangeText={(text) => name?setValue(text,name):setValue(text)} //retorna o valor ao state
        autoComplete={type} //tipo de conteudo tel, password, email, of ...
        secureTextEntry={type === 'password' ? true : type === 'password-new' ? true : false} //para senhas
        textContentType={textContentType} /// IOS tipo de texto a ser inserido
        keyboardType={keyboardType} //tipo de teclado
        autoFocus={focus} //focar o input
        editable={editable}
      />
      {invalid 
       ? <Text style={styles.invalid_alert}>{invalid}</Text>
       : <></>
      }
    </View> 
  )
}
