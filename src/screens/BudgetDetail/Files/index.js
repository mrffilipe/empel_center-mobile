import React, {useState, useEffect} from 'react';
import {View, Text,TouchableOpacity, Alert} from "react-native";
import styles from './styles';
import Documents from "../../../components/Modal/Documents";
import Loading from "../../../components/Loading";
import IDownload from "../../../assets/icons/download";
import ITrash from "../../../assets/icons/trash";
import API from "../../../services/api";
import { useAuthContext } from "../../../contexts/authContext";
import {updateProgress, renameFile} from "../../../services/tools";
import Callback  from "../../../components/Modal/Callback";

export default function File({data = [], getBudget}) {
    const {user} = useAuthContext();

    const [files, setFiles] = useState([]);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [progress, setProgress] = useState();
    const [filesSaved, setFilesSaved] = useState([]);
    const [callback, setCallback] = useState();

    const uploadFile = (params,fileName)=>{
        return new Promise(async(resolve, reject)=>{
            
            try{
                let res = await API.post("PVForm/sendFile",params,{
                    headers: {
                        'Content-Type': 'multipart/form-data;charset=utf-8'
                    },
                    onUploadProgress:(val)=>updateProgress({
                        bites:val,
                        fileName:decodeURIComponent(fileName),
                        setProgress
                    })
                }).catch(e => e);

                if(res?.error){
                    if(progress){
                        let obj = {
                            name:progress?.name,
                            progress:progress?.progress,
                            error:true
                        };
                        setProgress(obj);
                    }
                    throw new Error(res?.error);
                }

                resolve(true);
            }catch(e) {
                reject({message:e.message});
            }
        })
    }

    const sendFiles = async()=>{
        var success =  [];
        var errors = [];
        try{
            if(!data.id)
                throw new Error("Orçamento não encontrado");
            

            setLoading2(true);
            let i = 0;
            for (const val of files) {
                let key = i;
                i++;

                if(!val?.value)
                    continue

                if(val.label !== "OUTROS"){//ja tem um nome padrão para o arquivo

                    if(val?.value && val?.value?.name){
                        let file = val.value;

                        const params = new FormData();
                        params.append('file', renameFile({file,newName:val.label}));
                        params.append("PVDocumentType", 0);
                        params.append("idPVForm", data?.id);
                        params.append("idUser", user.id);
                        // console.log(params.getParts());
                        await uploadFile(params, file.name)
                        .then(()=>{
                            success.push({name:file.name});
                        })
                        .catch(err => {errors.push({name:file.name,error:err.message});});
                    }

                }else{
                    let filesArr = val.value; 
                    for (const file of filesArr) {
                        if(file.name){
                            const params = new FormData();
                        
                            params.append('file', renameFile({file,newName:file.name}));
                            params.append("idPVForm", data?.id);
                            params.append("idUser", user.id);

                            await uploadFile(params, file.name)
                            .then(()=>{
                                success.push({name:file.name});
                            })
                            .catch(err => {errors.push({name:file.name,error:err.message});});
                        }
                    }
                
                }
            }

            setProgress(undefined);
            setLoading2(false);
            getBudget(false);
            setFiles([]);
            
            return setCallback({
                type: success.length ? 1 : 0,
                message:`Arquivos enviados: ${success.length}/${success.length + errors.length}`,
                message2:errors.length ? `Erros: ${errors.length}` : "",
                action:()=>setCallback(null),
                actionName:"Ok!",
            })

            

        }catch(err){
            setLoading2(false);
            return setCallback({
                type: 0,
                message:err?.message ? err?.message : `Algo deu errado!`,
                action:()=>setCallback(null),
                actionName:"Ok!",
            })
        }
    }

    const addFilesSaved = (arr)=>{

        let newArr = arr.map((val)=>{
            return {
                label: val.file.filename, 
                url: val.file.url,
                id: val.id
            };
        })

        setFilesSaved(newArr);
    }

    const deleteFile = async (idFile,filename = "")=>{
        console.log(idFile)
        try{
            const confirmed = async()=>{
                try{
                    setLoading3(true);
                    let res = await API.deletar(`PVForm/deleteFileByID/${idFile}`).catch(err=> err);
                    setLoading3(false);
                    if(res?.error)
                        throw new Error(res?.error);
                    
                    let arr = [...filesSaved];
                    arr = arr.filter(val => val.id !== idFile);
                    setFilesSaved(arr);
                }catch(e){
                    setCallback({
                        type: 0,
                        message:e.message ? e.message : `Não foi possivel deletar o arquivo!`,
                        action:()=>setCallback(null),
                        actionName:"Ok!",
                    })
                }
            }

            let title = "Deletar arquivo"
            let message = `Deletar "${decodeURIComponent(filename)}"?`

            
            Alert.alert(
                title,
                message,
                [
                    {
                        text:"Sim",
                        onPress:()=> confirmed()
                    },
                    {
                        text:"Não",
                        onPress:()=> {},
                        type:"default"
                    }
                ],
                {
                    cancelable: true,
                    onDismiss:()=> {}
                }
            )
        }catch(e) {
            console.log(e)
        }
    }

    useEffect(()=>{
        if(data?.pvFormFile)
            addFilesSaved(data.pvFormFile);
    },[data])

    if(data?.status !== 3){
        return <></>;
    }

    return (
        <View>
            <Text style={styles.h2}>Documentos ({filesSaved.length})</Text> 
            {loading2 ? <Loading loading2={loading2} animation={"upload"} progress={progress} /> : <></>}
            {loading3 ? <Loading loading2={loading3} animation={"delete"} /> : <></>}
            {callback? <Callback params={callback} /> : <></>}
            
            <View style={styles.files_wrap}>
            
                {filesSaved.map((val,key)=>{
                    // arquivos para downsload
                    return (
                        <View key={key} style={styles.file_single}>
                            <View style={styles.file_info}>
                                <TouchableOpacity>
                                    <IDownload style={styles.icon_download} />
                                </TouchableOpacity>

                                <Text style={styles.p}>{decodeURIComponent(val.label)}</Text>
                            </View>

                            <TouchableOpacity onPress={()=>deleteFile(val.id,val.label)}>
                                <ITrash style={[styles.icon_download, styles.icon_delete]} />
                            </TouchableOpacity>
                        </View>
                    )
                })}

                <View style={styles.add_document}>
                    <Documents
                        text="Adicionar arquivo"
                        value={files}
                        setValue={setFiles}
                        valueSaved={filesSaved}
                        submit={sendFiles}
                    />
                </View>
            </View>
        </View>
    )
}
