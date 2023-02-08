import React, {useState} from 'react'
import styles from "./styles";
import IImagePlus from "../../../assets/icons/file";
import {Pressable, View, Text, TouchableOpacity} from "react-native";
import FilePicker from "../FilePicker";
import ImageView from '../../Modal/ViewImage';

export default function InputFile({setValue, label, value, required = false, onlyFile = false}) {
    const [isOpenCamera, setIsOpenCamera] = useState(false);
    const [imageToView, setImageToView] = useState(null);

    const openCamera = async()=>{
        setIsOpenCamera(true);
    }

    const addValue = (val)=>{
        setIsOpenCamera(false);
        setValue(val);
    }

    const filesView = ()=>{

        const remove = (index)=>{
            let arr = [...value];
            
            let val = arr.filter((v,i) => i !== index); 
            arr = val;
            setValue(arr);
        }

        return(
            <>
                {value.map((valArr,index)=>{
                    return(
                        <View key={index} style={styles.files_single}>
                        
                            {valArr?.type && valArr?.type.split("/")[0] === "image"? 
                                <TouchableOpacity onPress={()=>setImageToView(valArr.uri)}>
                                    <Text style={[styles.file_name, styles.a]}>{!valArr?.name ? "" :valArr?.name.length > 25? valArr?.name.substring(0,25)+"...":valArr?.name}</Text>
                                </TouchableOpacity>
                                : 
                                <Text style={styles.file_name}>{!valArr?.name ? "" : valArr?.name.length > 25? valArr?.name.substring(0,25)+"...":valArr?.name}</Text>
                            }
                            
                            <TouchableOpacity onPress={()=>remove(index)}>
                                <Text style={styles.remove_file}>Remover</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </>
        )
    }
    return (
        <View style={styles.file_input_wrap}>
            <ImageView isOpen={!!imageToView} uri={imageToView} close={setImageToView} />
            {!value.length ?
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
            :
                filesView()

            }

            {isOpenCamera && 
                <FilePicker
                    setValue={addValue}
                    onlyFile={onlyFile}
                    multiple={true}
                    closePicker={()=>setIsOpenCamera(false)} />
            }
        </View>
    )
}
