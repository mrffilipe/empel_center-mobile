import React from 'react'
import {Modal, ScrollView, View, Text, TouchableOpacity} from 'react-native';
import styles from "./styles";
import ITimes from "../../assets/icons/times";
const props = {
    isOpen:Boolean,
    title:String,
    close: Function ///fechar modal
}
export default function AddCity({isOpen, close, children, title, closeTop = false} = props) {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
        >
            <View style={styles.modal}> 
                
                <View style={styles.modal_main}>
                    {closeTop &&
                        <TouchableOpacity style={styles.modal_btn_close} onPress={close}>
                            <ITimes style={styles.icon_close}/>
                        </TouchableOpacity>
                    }

                    {title
                        ? <Text style={styles.title}>{title}</Text>
                        : <></>
                    }
                    <ScrollView>
                        {children}
                    </ScrollView>
                </View>
                
            </View>
        </Modal>
    )
}
