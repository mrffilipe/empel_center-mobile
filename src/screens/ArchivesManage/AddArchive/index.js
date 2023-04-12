import React, { useEffect, useState } from 'react'
import Modal from "../../../components/Modal";
import styles from "./styles";
import Select from "../../../components/Form/Select";
import InputText from "../../../components/Form/InputText";
import Textarea from "../../../components/Form/Textarea";
import { useAuthContext } from '../../../contexts/authContext';
import API from "../../../services/api";
import InputFile from '../../../components/Form/InputFile';
import selectOptions from "../../../data/selectOptions.json";
import {updateProgress} from "../../../services/tools";
import Loading from '../../../components/Loading';
import { View } from 'react-native';
import ButtonSubmit from '../../../components/Form/ButtonSubmit';
import Callback from "../../../components/Modal/Callback";
import { renameFile } from '../../../services/tools';

export default function AddArchive({isOpen, close, getData}) {
    const {user} = useAuthContext();
    const [callback, setCallback] = useState(null);

    const [file, setFile] = useState([]);
    const [fileName, setFileName] = useState("");
    const [note, setNote] = useState("");
    const [typeAccess, setTypeAccess] = useState(0);

    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async()=>{
        try{
            var fileToSend = file[0];

            if(!fileToSend)
                throw new Error("Nenhum arquivo encontrado");


            const params = new FormData();
            params.append('file', renameFile({file:fileToSend,newName:fileToSend.name}));
            params.append("name", fileName);
            params.append("note", note);
            params.append("AccessPermissionLevel", typeAccess);
            params.append("IdUser", user.id);

            setLoading(true);
            let res = await API.post("StoredFile",params,{
                headers: {
                    'Content-Type': 'multipart/form-data;charset=utf-8'
                },
                onUploadProgress:(val)=>updateProgress({
                    bites:val,
                    fileName:fileName,
                    setProgress
                })
            }).catch(e => e);

            setLoading(false);

            if(res?.error){
                let obj = {
                    name:progress?.name,
                    progress:progress?.progress,
                    error:true
                };
                setProgress(obj);
                throw new Error(res?.error);
            }
            setCallback({
                message:"Arquivo salvo!",
                actionName:"Ok!",
                action:()=>{
                    setCallback(null);
                    clearFilds();
                },
                type:1
            });
            
            getData(true);
        }catch(e){
            setCallback({
                message:e.message,
                actionName:"Ok!",
                action:()=>setCallback(null),
            });
        }
    }

    const clearFilds = (closeTo = true)=>{
        setFile([]);
        setNote("");

        if(closeTo)
            close();
    }

    const addFileNameInput = ()=>{
        setFileName(file[0].name);
    }

    const typeAccessViewated = ()=>{
        let arr = selectOptions.typeAccess.map((val,key) => {
            if(key === 0)
                return `${val} Apenas`;

            return `${val} ou superior`;
        })
        return arr;
    }

    const addFile = (val)=>{
        setFile(val);
    }

    useEffect(()=>{
        if(file.length)
            addFileNameInput();
    },[file])


    return (
        <View>
            <Modal isOpen={isOpen} close={clearFilds} title={"Adicionar Arquivo"}>
                {loading ? <Loading loading2={loading} animation="upload" progress={progress} /> :<></>}
                <Callback params={callback} />
                <View onSubmit={handleSubmit} className={styles.View}>
                
                    <View className={styles.View_group+" "+styles.file_wrap}>
                        <InputFile
                            value={file}
                            setValue={addFile}
                            label={"Selecione um arquivo"}
                            open={true}
                            required={true}
                        />
                    </View>

                    {file.length ?
                        <>
                            <View className={styles.View_group}>
                                <InputText
                                    value={fileName}
                                    setValue={setFileName}
                                    label={"Nome do Arquivo"}
                                    open={true}
                                    required={true}
                                />
                            </View>

                            <View className={styles.View_group}>
                                <Select 
                                    label={"Nivel de Acesso"}
                                    value={typeAccessViewated()[typeAccess]}
                                    setValue={setTypeAccess}
                                    labelTop={true}
                                    values={typeAccessViewated()}
                                    required={true}
                                />
                            </View>

                            <View className={styles.View_group}>
                                <Textarea 
                                    label={"Nota"}
                                    value={note}
                                    setValue={setNote}
                                />
                            </View>
                        </>
                        :<></>
                    }

                    <View style={styles.btn_wrap}>
                        <ButtonSubmit styles={[styles.btn,styles.btn_cancel]} onPress={close} value={"Cancelar"} />
                        <ButtonSubmit styles={styles.btn} onPress={handleSubmit} disabled={file.length === 0} value={"Salvar"} />                 
                    </View>

                </View>
            </Modal>
        </View>
    )
}
