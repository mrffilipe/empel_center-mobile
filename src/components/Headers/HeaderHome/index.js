import React, {useState} from 'react'
import styles from "./styles";
import {View, Text} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import {useAuthContext} from "../../../contexts/authContext";
import HistoryBeckup from "../../Modal/HistoryBeckup";
import NotificationHeader from '../../Modal/NotificationHeader';
export default function LogoTitle({tintColor,title}) {
    const {tasksStoraged} = useAuthContext([]);

    const [isConnected, setIsConnected] = useState(false);

    const unsubscribe = NetInfo.addEventListener(state => {
        if(state.isConnected !== isConnected) 
            setIsConnected(state.isConnected);
    });

    unsubscribe();



    if(tasksStoraged.length || !isConnected){
        return (
            <View style={styles.container}>
                <Text style={[styles.title,{color:tintColor}]}>{title}</Text>

                <View style={styles.icons_wrap}>
                    <HistoryBeckup/>

                    <NotificationHeader/>
                </View>
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <Text style={[styles.title,{color:tintColor}]}>{title}</Text>

            <View style={styles.icons_wrap}>
                <NotificationHeader/>
            </View>
        </View>
    )
}
