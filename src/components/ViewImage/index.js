import React from 'react'
import styles from './styles';
import {Image,View, Text, Pressable, Modal} from "react-native";
import {deleteFile} from "../../services/tools";
export default function ViewImage({image, isOpen, close, setImage}) {

    const descart = async()=>{
        await deleteFile(image);

        setImage(null);
        close(false);
    }

    const save = ()=>{
        close(false);
    }

    return (
        <Modal 
        animationType="fade"
        transparent={true}
        visible={isOpen}>
            <View style={styles.image_wrap}>
                <Image source={{uri: image?.uri}} style={styles.image}/>

                <View style={styles.btn_wrap}>
                    <Pressable onPress={descart} style={[styles.btn, styles.btn_red]}>
                        <Text style={[styles.btn_text]}>Descartar</Text>
                    </Pressable>

                    <Pressable onPress={save} style={styles.btn}>
                        <Text style={styles.btn_text}>Está Bom!</Text>
                    </Pressable>
                </View>

            </View>
        </Modal>
    )
}


