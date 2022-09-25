import React from 'react'
import {Modal, ScrollView, View} from 'react-native';
import styles from "./styles";
const props = {
    close: Function ///fechar modal
}
export default function AddCity({isOpen, children} = props) {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
        >
            <View style={styles.modal}>
                
                <View style={styles.modal_main}>
                    <ScrollView>
                        {children}
                    </ScrollView>
                </View>
                
            </View>
        </Modal>
    )
}
