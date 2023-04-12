import React, { useState } from 'react'
import Modal from "../../../components/Modal";
import styles from "./styles";
import InputText from "../../../components/Form/InputText";
import Textarea from "../../../components/Form/Textarea";
import { useAuthContext } from '../../../contexts/authContext';
import API from "../../../services/api";
import ButtonSubmit from '../../../components/Form/ButtonSubmit';
import {View} from "react-native";
import Loading from '../../../components/Loading';
import Callback from '../../../components/Modal/Callback';

export default function AddService({isOpen, close, getData}) {
    const {hasPermission} = useAuthContext();

    const [name, setName] = useState("");
    const [note, setNote] = useState("");

    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(null);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{

            let params = {
                name,
                description: note
            }

            setLoading(true);
            let res = await API.post("ServiceOffered",params).catch(e => e);

            setLoading(false);

            if(res?.error){
                throw new Error(res?.error);
            }

            setCallback({
                message:"Serviço Criado!",
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
        setName("");
        setNote("");

        if(closeTo)
            close();
    }

    if(!hasPermission)
        return <></>

    return (
        <View>

            <Modal isOpen={isOpen} close={clearFilds} title={"Adicionar Serviço"}>
                <Callback params={callback} />
                <Loading loading2={loading} />
                <View style={styles.form}>
                
                    <View style={styles.form_group}>
                        <InputText
                            value={name}
                            setValue={setName}
                            label={"Nome"}
                            open={true}
                            required={true}
                        />
                    </View>

                    <View style={styles.form_group}>
                        <Textarea 
                            label={"Descrição"}
                            value={note}
                            setValue={setNote}
                        />
                    </View>

                    <View style={styles.btn_wrap}>
                        <ButtonSubmit styles={[styles.btn,styles.btn_cancel]} onPress={close} value={"Cancelar"} />
                        <ButtonSubmit styles={styles.btn} onPress={handleSubmit} value={"Salvar"} />                 
                    </View>

                </View>
            </Modal>
        </View>
    )
}
