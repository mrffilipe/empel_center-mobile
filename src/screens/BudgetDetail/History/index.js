import React from 'react';
import styles from './styles';
import {View, Text, ScrollView} from "react-native";
import { formatDate } from '../../../services/tools';
export default function History({data}) {

    return (
        <View style={styles.container}>
            <Text style={styles.h2}>Historico</Text>
            <ScrollView style={styles.historyScroll}>
                <View style={styles.historys}>
                
                    {data.map((val,key)=>{
                        let isLast = key === data.length -1;
                        return(
                            <View key={key}>
                                <View style={styles.text_wrap}>
                                    <View style={styles.text_wrap_header}>
                                        <Text style={styles.text_name}>{val?.user} - </Text>
                                        <Text style={styles.text}>{formatDate(val?.createdAt,true, true, true)}</Text>
                                    </View>
                                    <Text style={styles.text_note}>{val?.changeMade}</Text>
                                </View>
                                <View style={!isLast? [styles.conected_line] : [styles.conected_line, styles.history_last]}/>
                            </View>
                        )
                    })}
                    
                </View>
            </ScrollView>
        </View>
    )
}
