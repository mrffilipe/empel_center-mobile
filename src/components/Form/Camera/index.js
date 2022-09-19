import React, {useRef, useCallback, useState} from 'react'
import styles from './styles';
import { StyleSheet, View, Pressable, Image,Text, Platform} from 'react-native'
import {Camera, useCameraDevices, CameraCaptureError} from "react-native-vision-camera";
import ICamera from "../../../assets/icons/camera";
import IArrowLeft from "../../../assets/icons/arrowLeft";
import * as RNFS from 'react-native-fs';

import {uploadTest} from "../../../services/api";

const props = {
    isOpenCamera:Boolean,
    setIsOpenCamera: Function,
    setValue:Function,
    title:String,
    value:{
        uri:String,
        type:String,
        name:String,
    } | null
}
export default function CameraComponent({isOpenCamera, setIsOpenCamera, setValue, value, title} = props) {
    const devices = useCameraDevices('wide-angle-camera')
    const device = devices.back
    const camera = useRef(null)

    const [ imageTaked, setImageTaked] = useState(value);

    const takePicture = useCallback(async() => {
        
        try {
            const photo = await camera.current.takePhoto();
            // console.log(photo.path)
            let file = new FormData();
            var p = {
                uri:"file://"+photo.path,
                type: 'image/jpeg',
                name: `${new Date().getTime()}.jpg`,
            };
            file.append("file",p);
            setImageTaked(p);
            storage(photo);
            // let res = await uploadTest(file);
        } catch (e) {
            if (e instanceof CameraCaptureError) {
                switch (e.code) {
                case "capture/file-io-error":
                    console.error("Failed to write photo to disk!")
                    break
                default:
                    console.error(e)
                    break
                }
            }
        }
    }, [camera])

    const descart = async()=>{
        try{
            
            setImageTaked("");
            setValue(null);
        }catch(e){
            console.log(e)
        }
    }

    const save = ()=>{
        setValue(imageTaked);
        setIsOpenCamera(false);
    }

    if (device == null) return <></>
    return (
        <View style={StyleSheet.absoluteFill}>
            <Camera 
            style={StyleSheet.absoluteFill}
            device={device}
            ref={camera} 
            isActive={isOpenCamera && !imageTaked}
            photo={true}>
            </Camera>

            {imageTaked?
                <View style={styles.image_wrap}>
                    <Image source={{uri: imageTaked?.uri}} style={styles.image}/>

                    <View style={styles.btn_wrap}>
                        <Pressable onPress={descart} style={[styles.btn, styles.btn_red]}>
                            <Text style={[styles.btn_text]}>Descartar</Text>
                        </Pressable>

                        <Pressable onPress={save} style={styles.btn}>
                            <Text style={styles.btn_text}>Está Bom!</Text>
                        </Pressable>
                    </View>

                </View>
                :
                <>
                    <View style={styles.header}>
                        <Pressable onPress={()=>setIsOpenCamera(false)}>
                            <IArrowLeft style={styles.arrow}/>
                        </Pressable>

                        <Text style={styles.header_title}>{title}</Text>
                    </View>

                    <View style={styles.takePhoto_wrap}>
                        <Pressable onPress={takePicture} style={styles.takePhoto}>
                            <ICamera style={styles.icon} />
                        </Pressable>
                    </View>
                </>
            }
            
        </View>
    )
}

