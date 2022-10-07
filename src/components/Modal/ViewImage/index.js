import React from 'react'
import styles from './styles';
import {Image,View, Text, Pressable, Modal} from "react-native";
export default function ViewImage({uri, isOpen = false, close}) {

    return (
        <Modal 
        animationType="fade"
        transparent={true}
        visible={isOpen}>
            <View style={styles.image_wrap}>
                <Image source={{uri: uri}} resizeMode="contain" autoSize style={styles.image}/>

                <View style={styles.btn_wrap}>
                    <Pressable onPress={()=>close(null)} style={styles.btn}>
                        <Text style={styles.btn_text}>Voltar</Text>
                    </Pressable>
                </View>

            </View>
        </Modal>
    )
}


