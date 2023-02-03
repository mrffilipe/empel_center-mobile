import React from 'react'
import styles from './styles';
import Lottie from 'lottie-react-native';
import { Modal, View, Text } from 'react-native';
import {useAuthContext} from "../../contexts/authContext";
import Animation from "animation/loading.json";
import uploadAnimation from "animation/uploading.json";
import deleteAnimation from "animation/delete.json";
import LoadingPDF from "animation/loading_pdf.json";
export default function Loading({loading2 = false, animation = "main",text, progress}) {
    const {loading} = useAuthContext();

    const animations = {
        "main":Animation,
        "upload":uploadAnimation,
        "delete":deleteAnimation,
        "pdf":LoadingPDF
    }

    const options = {
        animationData: animations[animation],
        loop: true,
    };

    const progressPersent = progress?.progress !== undefined ? progress?.progress+"%" : progress ? progress+"%" : "0%";
    
    return (
        <Modal 
            animationType="fade"
            transparent={true}
            visible={loading ? loading : loading2}>
                <View style={styles.modal}>
                    <Lottie style={styles.animation} resizeMode="contain" autoSize source={animations[animation]} autoPlay loop />

                    {progress !== undefined ?
                        <View style={styles.progress}>
                            <Text style={progress?.error ? [styles.text,styles.error] : [styles.text]}>{progress?.name}</Text>
                            <Text style={styles.progress_text}>{progressPersent}</Text>
                            <View style={[styles.progress_bar_wrap]}>
                                <View style={[styles.progress_bar,styles.progress_bar_placeholder]}></View>
                                <View style={[styles.progress_bar,{width:progressPersent}]}></View>
                            </View>
                        </View>
                        :<></>
                    }
                </View>
        </Modal>
    )
}
