import React from 'react'
import styles from "./styles";
import {View, Text} from 'react-native';

export default function LogoTitle({tintColor,title, children}) {
    return (
        <View style={styles.container}>
            <Text style={[styles.title,{color:tintColor}]}>{title}</Text>
            {children}
        </View>
    );
}
