import React, {useState} from 'react'
import styles from "./styles";
import IImagePlus from "../../../assets/icons/imagePlus";
import {Pressable, View, Text} from "react-native";
import {Camera} from "react-native-vision-camera";
import ImagePicker from "../ImagePicker";
import ViewImage from '../../ViewImage';

export default function InputFile({setValue, value, label}) {
    const [isOpenCamera, setIsOpenCamera] = useState(false);
    const [isOpenImage, setIsOpenImage] = useState(false);
    const openCamera = async()=>{
        const newCameraPermission = await Camera.requestCameraPermission()
        if(newCameraPermission === "authorized"){
            setIsOpenCamera(true);
        }
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
                    <View>
                        <Text style={styles.btn_text}>{label}</Text>
                        <Text  style={styles.small}>(Opcional)</Text>
                    </View>
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
