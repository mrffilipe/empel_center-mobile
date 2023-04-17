import React, {useState} from 'react'
import IBell from "../../../assets/icons/bell"; 
import styles from "./styles";
import {View, TouchableOpacity, Text} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { formatDate } from '../../../services/tools.js';
export default function NotificationHeader() {
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState([
        {
            name:"Nova mensagem de Bruno",
            date:formatDate(new Date(), true, true, false),
            url:"/chat/1",
            view:false
        },
        {
            name:"Nova cidade em análise",
            date:formatDate(new Date(), true, true, false),
            url:"/cidades/1/2",
            view:false
        },
        {
            name:"Nova atividade",
            date:formatDate(new Date(), true, true, false),
            url:"/atividades",
            view:true
        },
    ]);

    const amountNotifications = notifications.filter(val => val.view === false).length;

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity onPress={()=>navigation.navigate("Notificações",{
                notifications
            })}>
                <Text style={styles.amount}>{amountNotifications}</Text>
                <IBell style={styles.bell}/>
            </TouchableOpacity> */}
        </View>
    )
}
