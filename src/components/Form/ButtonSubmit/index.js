import React from 'react';
import {Text, Pressable} from 'react-native';

import styles2 from './styles';
const props = {
    value:String,
    onPress:Function,
    styles:Object,
}
export default function ButtonSubmit({value, onPress, styles = {}} = props) {
    return (
        <Pressable 
        style={[styles2.button,styles]}
        android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}
        onPress={onPress}>
            <Text style={styles2.text}>{value}</Text>
        </Pressable>
    )
}
