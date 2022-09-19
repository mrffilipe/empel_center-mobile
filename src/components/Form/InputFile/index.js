import React, {useState} from 'react'
import styles from "./styles";
import IImagePlus from "../../../assets/icons/imagePlus";
import {Pressable, View, Text, Modal} from "react-native";
// import {Camera} from "react-native-vision-camera";
import ImagePicker from "../ImagePicker";
import ViewImage from '../../ViewImage';
// import CameraComponent from "../Camera";
export default function InputFile({setValue, value, title}) {
    const [isOpenCamera, setIsOpenCamera] = useState(false);
    const [isOpenImage, setIsOpenImage] = useState(false);
    const openCamera = async()=>{
        // const newCameraPermission = await Camera.requestCameraPermission()
        // if(newCameraPermission === "authorized"){
            setIsOpenCamera(true);
        // }
    }

    const openImage = ()=>{
        setIsOpenImage(true);
    }

    return (
        <View style={styles.file_input_wrap}>
            {!value?
                <Pressable 
                android_ripple={{ color: "rgba(220, 220, 220, 0.9)"}}
                onPress={openCamera} 
                style={styles.file_input}>
                    <IImagePlus style={styles.icon}/>
                    <Text style={styles.btn_text}>Adicionar Documento</Text>
                </Pressable>
            :
                <Pressable 
                android_ripple={{ color: "rgba(220, 220, 220, 0.9)"}}
                onPress={openImage} 
                style={styles.file_input}>
                    <IImagePlus style={styles.icon}/>
                    <Text style={styles.btn_text}>{value?.fileName}</Text>
                </Pressable>
            }


            <ViewImage
                isOpen={isOpenImage}
                close={setIsOpenImage}
                image={value}
                setImage={setValue}/>
            

            {isOpenCamera && 
                <ImagePicker
                    value={value}
                    setValue={setValue}
                    closePicker={setIsOpenCamera} />
            }
        </View>
    )
}
