import React, {useRef, useEffect} from 'react'
import styles from './styles';
import {View, Pressable, Text} from "react-native";
import ICheck from "../../../assets/icons/check";
import * as Animatable from 'react-native-animatable';

const props = {
    values:Array,
    value:String,
    label:String,
    setValue:Function
}
export default function InputRadio({values, label, setValue, value, name, invalid}= props) {
  
    const setSelect = (val)=>{
        if(name !== undefined)
            setValue(val,name)
        else
            setValue(val);
    }


    const Option = (val)=>{
        const btnRef = useRef(null);

        useEffect(() => {
            if(btnRef.current){
                if(value === val)
                    btnRef.current.transitionTo({height:75,width:75})
                else
                    btnRef.current.transitionTo({height:705,width:705})
            }
        },[value])

        return(
            <Pressable style={styles.btn} onPress={()=>setSelect(val)}>
                
                <Animatable.View  ref={btnRef} style={value === val? [styles.animated]:[styles.animated_desabled]}>
                    <ICheck style={styles.icon}/>
                </Animatable.View>
            </Pressable>
        )
    }

    return (
        <View style={styles.input_wrap}>
              <Text style={styles.label}>{label}</Text>

              <View style={styles.options_wrap}>
                  {values.map((val,key)=>{
                      return (
                          <View key={key} style={styles.option_single} >
                              {Option(val)}
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
