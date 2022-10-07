import React, {useState} from 'react'
import styles from "./styles";
import IImagePlus from "../../../assets/icons/file";
import {Pressable, View, Text} from "react-native";
import FilePicker from "../FilePicker";
// import ViewImage from '../../Modal/ViewImage';

export default function InputFile({setValue,label, required = false, onlyFile = false}) {
    const [isOpenCamera, setIsOpenCamera] = useState(false);
    const openCamera = async()=>{
        setIsOpenCamera(true);
    }

    const addValue = (val)=>{
        setIsOpenCamera(false);
        setValue(val);
    }
    return (
        <View style={styles.file_input_wrap}>
            <Pressable 
            android_ripple={{ color: "rgba(220, 220, 220, 0.9)"}}
            onPress={openCamera} 
            style={styles.file_input}>
                <IImagePlus style={styles.icon}/>
                <View>
                    <Text style={styles.btn_text}>{label}</Text>
                    {required && <Text  style={styles.small}>(Opcional)</Text>}
                </View>
            </Pressable>
            

            {isOpenCamera && 
                <FilePicker
                    setValue={addValue}
                    onlyFile={onlyFile}
                    closePicker={()=>setIsOpenCamera(false)} />
            }
        </View>
    )
}
