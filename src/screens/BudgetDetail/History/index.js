import React from 'react';
import styles from './styles';
import {View, Text} from "react-native";
import { formatDate } from '../../../services/tools';
export default function History() {
    const history = [
        {
            date: formatDate(new Date(), true, true, false),
            name: "Documento enviado"
        },
        {
            date: formatDate(new Date(), true, true, false),
            name: "Documento enviado"
        },
        {
            date: formatDate(new Date(), true, true, false),
            name: "Documento enviado"
        }
    ]

    return (
        <View style={styles.container}>
            <Text style={styles.h2}>Historico</Text>

            <View style={styles.historys}>
                {history.map((val,key)=>{
                    let isLast = key === history.length -1;
                    return(
                        <View style={styles.history} key={key}>
                            <View style={styles.text_wrap}>
                                <Text style={styles.text}>{val?.name}</Text>
                                <Text style={styles.text}>{val?.date}</Text>
                            </View>
                            <View style={!isLast? [styles.conected_line] : [styles.conected_line, styles.history_last]}/>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}
