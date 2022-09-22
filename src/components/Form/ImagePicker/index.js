import React, {useEffect} from 'react'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Alert} from 'react-native';
// import {uploadTest} from "../../../services/api";
import {storageFile} from "../../../services/tools";
export default function ImagePicker({setValue, closePicker}) {

    const handleImageUser = ()=>{
        Alert.alert(
            "Selecione",
            "Informe de onde voçê quer pegar a foto",
            [
                {
                    text:"Galeria",
                    onPress:()=> pickFromGalery()
                },
                {
                    text:"Camera",
                    onPress:()=> pickFromCamera(),
                    type:"default"
                }
            ],
            {
                cancelable: true,
                onDismiss:()=> cancel()
            }
        )
    }

    const pickFromCamera = async()=> {
        const options = {
            mediaType:"photo",
            saveToPhotos:false,
            cameraType:"back",
            quality:1
        }

        const result = await launchCamera(options)


        if(result.assets){
            save(result.assets[0]);
            return;
        }

        closePicker(false)
    }

    const pickFromGalery = async()=> {
        const options = {
            mediaType:"photo",
        }

        const result = await launchImageLibrary(options);

        if(result.assets){
            save(result.assets[0]);
            return;
        }

        closePicker(false)
    }

    const cancel = ()=>{
        closePicker(false);
    }

    const save = async(val)=>{
        let res = await storageFile(val);
        if(res){
            val.uri = res.uri;
            val.fileName = res.fileName;  
            val.storage = true;
        }

        setValue(val);
        closePicker(false);
    }

    useEffect(()=>{
        handleImageUser();
    },[])

    return (
        <></>
    )
}
