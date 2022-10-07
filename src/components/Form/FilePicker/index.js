import React, {useEffect, useCallback} from 'react'
import {launchCamera} from 'react-native-image-picker';
import {Alert} from 'react-native';
import DocumentPicker, { types } from 'react-native-document-picker';
import {storageFile} from "../../../services/tools";
import {Camera} from "react-native-vision-camera";
export default function ImagePicker({setValue, closePicker, accept = false, multiple = false, onlyFile = false}) {

    const getPermissions = async()=>{
        const newCameraPermission = await Camera.requestCameraPermission()
        if(newCameraPermission === "authorized"){
            handleImageUser();
        }
    }

    const handleImageUser = ()=>{
        if(!accept && !onlyFile){
            Alert.alert(
                "Selecione",
                "Informe de onde voçê quer pegar o arquivo",
                [
                    {
                        text:"Selecionar arquivo",
                        onPress:()=> handleDocumentSelection(),
                        type:"default"
                    },
                    {
                        text:"Tirar foto",
                        onPress:()=> pickFromCamera(),
                    }
                ],
                {
                    cancelable: true,
                    onDismiss:()=> cancel()
                }
            )
        }else{
            handleDocumentSelection()
        }
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
            save(result.assets);
            return;
        }

        closePicker()
    }

    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
            presentationStyle: 'fullScreen',
            type: accept ?[types.pdf] : onlyFile ?[types.pdf, types.doc,types.docx, types.xls, types.xlsx, types.ppt, types.pptx, types.plainText] : [types.pdf, types.images,types.doc,types.docx, types.xls, types.xlsx, types.ppt, types.pptx, types.plainText],
            allowMultiSelection: multiple,
            });

            if(multiple)
                setValue(response);
            else
                setValue(response[0]);
        } catch (err) {
                // console.warn(err);
                closePicker();
        }
    }, []);

    const cancel = ()=>{
        closePicker();
    }

    const save = async(val)=>{
        let res = await storageFile(val[0]);
        if(res){
            val[0].uri = res.uri;
            val[0].name = res.fileName;  
            val[0].storage = true;
        }

        setValue(val);
    }

    useEffect(()=>{
        getPermissions();
    },[])

    return (
        <></>
    )
}
