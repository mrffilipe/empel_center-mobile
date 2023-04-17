import React from 'react';
import {View, Text} from "react-native"; 
import styles from "../InputText/styles";
import MaskInput, { Masks, createNumberMask } from 'react-native-mask-input';

export default function InputText({
    label = "",
    placeholder = "",
    value = "",
    setValue = Function,
    type = "off",
    textContentType = "none", // IOS tipo de conteudo a ser incerido
    keyboardType = "default", //tipo de teclado 
    mask = "",
    focus = false,
    invalid = null,
    editable = true,
    name = null,
    onBlur = ()=>{},
    required = false,
}) {

  const dollarMask = createNumberMask({
      delimiter: '.',
      separator: ',',
      precision: 2,
  })

  const kWhMask = createNumberMask({
      delimiter: '.',
      separator: ',',
      precision: 3,
  })

  Masks["BRL_CURRENCY"] = dollarMask;
  Masks["KWH"] = [/\d/, ",", /\d/, /\d/, /\d/];

  Masks.Number = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];//maskara para apenas numeros
  Masks.Percent = [value.length === 3? '1' : /[\d]/, value.length === 3? '0' : /\d/, value.length === 3? '0' : /\d/];//maskara para porcentagem maximo 100%
  Masks.DateTime = [
      /[0-3]/, parseInt(value[0]) === 3? /[0-1]/ : /[0-9]/,"/",
      /[0-1]/, parseInt(value[3]) === 1? /[0-2]/ : /[0-9]/,"/",
      /[1-3]/, /[0-9]/, /[0-9]/,/[0-9]/, ",", " ",
      /[0-2]/,parseInt(value[12]) === 2 ? /[0-3]/ : /[0-9]/,":",/[0-5]/,/[0-9]/];
      
  Masks.CPF = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
  Masks.CNPJ = [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/];

  // Masks["percent_only"] = [/[0-9]/,/[0-9]/,/[0-0]/];

  // console.log(value)

  const addValue = (val)=>{
      if(mask === "percent"){
        if(val.includes(",")){
          val = val;
        }else{
          val = parseInt(val);
          val = val < 0 ? "" : val;
        }
      }

      if(mask === "percent_only"){
        
        val = parseInt(val);
        val = val > 100 ? 100 : val < 0 ? 0 : val ? val : 0;
      }

      return !name? setValue(val): setValue(val,name);
  }

  return (
    <View style={styles.input_Wrap}>
      <Text style={styles.label}>{label}{required ? "*" : ""}</Text>

      <MaskInput
        style={!invalid ? [styles.input] : [styles.input,styles.input_invalid]}
        value={value.toString()}
        onEndEditing={()=>onBlur()}
        mask={Masks[mask]}
        placeholder={placeholder}
        onChangeText={(text, unmask) => addValue(text)}
        autoComplete={type} //ANDROID
        secureTextEntry={type === 'password' ? true : type === 'password-new' ? true : false}
        textContentType={textContentType}
        keyboardType={keyboardType}
        autoFocus={focus || !!invalid}
        editable={editable}
      />

      {invalid && mask !== "percent" && required
        ? <Text style={styles.invalid_alert}>{invalid}</Text>
        : <></>
      }
    </View>
  )
}