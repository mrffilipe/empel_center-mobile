import React from 'react'
import styles from './styles';
import Lottie from 'lottie-react-native';
import { Modal, View } from 'react-native';
import {useMainContext} from "../../contexts/mainContext";
import Animation from "../../assets/animation/loading.json";
export default function Loading() {
    const {loading} = useMainContext();
    return (
        <Modal 
            animationType="fade"
            transparent={true}
            visible={loading}>
                <View style={styles.modal}>
                    <Lottie style={styles.animation} resizeMode="contain" autoSize source={Animation} autoPlay loop />
                </View>
        </Modal>
    )
}
