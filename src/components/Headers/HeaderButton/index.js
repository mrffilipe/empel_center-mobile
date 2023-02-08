import React from 'react'
import IPlus from "icons/plus";
import styles from './styles';
import {TouchableOpacity, View, Text } from 'react-native';
export default function HeaderButton(props) {
    return (
        <View style={styles.container}>
            <Text style={[styles.title,{color:props.tintColor}]}>{props.title}</Text>

            {props.onPress ?
                <TouchableOpacity onPress={props.onPress} style={styles.btn}>
                    {typeof props.children === 'object'
                        ? props.children
                        : <IPlus style={styles.icon}/>
                    }  
                </TouchableOpacity>
                :<></>
            }
        </View>
    )
}