import React from 'react';
import {Text, Pressable} from 'react-native';

import styles2 from './styles';
const props = {
    value:String,
    onPress:Function,
    styles:Object,
}
export default function ButtonSubmit({value, onPress, styles = {}, disabled = false} = props) {
    return (
        <Pressable 
        style={disabled ? [styles2.button,styles2.button_disabled,styles] : [styles2.button,styles] }
        android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}
        onPress={onPress}>
            <Text style={[styles2.text, styles?.text]}>{value}</Text>
        </Pressable>
    )
}
