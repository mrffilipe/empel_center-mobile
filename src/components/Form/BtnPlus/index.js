import React from 'react';
import styles from './styles';
import Plus from "../../../assets/icons/plus";
import {View, TouchableOpacity} from "react-native";
export default function BtnPlus({onPress}) {
    return (
        <>
            {onPress
                ? <TouchableOpacity style={styles.btn} onPress={onPress}><Plus style={styles.icon}/></TouchableOpacity>
                : <View style={styles.btn} onPress={onPress}><Plus style={styles.icon}/></View>
            }
        </>
    )
}
