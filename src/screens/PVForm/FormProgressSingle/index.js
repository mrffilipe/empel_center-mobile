import React, {useRef, useEffect} from 'react';
import styles from '../styles';
import {View, Text} from "react-native";
import * as Animatable from 'react-native-animatable';
import {colors, fontSize, container, limitSize, button} from "../../../styles/defount.json"
export default function FormProgressSingle({val,key, formStatus, formStatusNow}) {
    const booletRef = useRef(null);
    const lineRef = useRef(null);


    useEffect(()=>{
        if(booletRef?.current && lineRef?.current){
            if(key <= formStatusNow){
                booletRef.current.transitionTo({backgroundColor:colors.green})
            }else{
                booletRef.current.transitionTo({backgroundColor:colors.gray})
            }

            if(key < formStatusNow){
                lineRef.current.transitionTo({backgroundColor:colors.green})
            }else{
                lineRef.current.transitionTo({backgroundColor:colors.gray})
            }
        }
    },[formStatusNow])

    return (
        <View 
        key={key}
        style={[styles.history_single]}>

            <Animatable.View ref={lineRef} style={
                key === formStatus.length - 1
                    ?[styles.history_line,styles.history_line_last]
                    :[styles.history_line]
            }>
                
                <View style={styles.boolet}/>
                <Animatable.View ref={booletRef} style={styles.boolet}></Animatable.View>
            </Animatable.View>
            <Text style={styles.progress_form_text}>{val}</Text>
        </View>
    )
}
