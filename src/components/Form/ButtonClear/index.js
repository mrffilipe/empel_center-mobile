import React from 'react';
import {Text, TouchableOpacity} from "react-native"; 
import styles from "./styles";

export default function ButtonClear({onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.btn} >
            <Text  style={styles.btn_text}>Limpar</Text>
        </TouchableOpacity>
    )
}
