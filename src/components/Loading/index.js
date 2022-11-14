import React from 'react'
import styles from './styles';
import Lottie from 'lottie-react-native';
import { Modal, View } from 'react-native';
import {useAuthContext} from "../../contexts/authContext";
import Animation from "../../assets/animation/loading.json";
export default function Loading({loading2 = false}) {
    const {loading} = useAuthContext();
    return (
        <Modal 
            animationType="fade"
            transparent={true}
            visible={loading || loading2}>
                <View style={styles.modal}>
                    <Lottie style={styles.animation} resizeMode="contain" autoSize source={Animation} autoPlay loop />
                </View>
        </Modal>
    )
}
