import React, {useState} from 'react'
import IBell from "../../../assets/icons/bell"; 
import styles from "./styles";
import {View, TouchableOpacity, Text, ScrollView} from "react-native";
export default function NotificationHeader() {
    const [isOpenNotification, setIsOpenNotification] = useState(false);
    const [notifications, setNotifications] = useState([,]);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>setIsOpenNotification(true)}>
                <Text style={styles.amount}>{notifications.length?notifications.length:""}</Text>
                <IBell style={styles.bell}/>
            </TouchableOpacity>
        </View>
    )
}
