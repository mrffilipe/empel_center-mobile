import React, {useState} from 'react'
import InputMask from "../../../components/Form/InputMask";
import Modal from "../../../components/Modal";
import styles from "./styles";
import {View, Text} from "react-native";
import {useAuthContext} from "../../../contexts/authContext";
import API from "../../../services/api";
import { toNumber } from '../../../services/tools';
import ButtonSubmit from '../../../components/Form/ButtonSubmit';

export default function RegisterConsultant({params, setParams}) {
    const {setCallback, setLoading} = useAuthContext();

    const [commission, setCommission] = useState("0");

    const save = async(e)=>{
        e.preventDefault();
        setLoading(true);
        let res = await API.post("Consultant", {
            "commissionInPercentage": toNumber(commission),
            "idUser": params?.id
        }).catch(e => e);
        setLoading(false);

        if(res.error){
            return setCallback({
                message:res?.error,
                type: 0,
                close:()=>setCallback(null),
                action:()=>{save(e);setCallback(null)},
                actionName:"Tentar novamente!",
            })
        }

        
        setCallback({
            message:"Conta ativada!",
            type: 1,
            close:()=>setCallback(null),
            action:()=>{setCallback(null)},
            actionName:"Ok!",
        });
        params.getData();
        setParams(null);
    }

    return (
        <Modal isOpen={!!params} close={()=>setParams(null)} title={"Cadastrar comissão"} >
            <Text style={styles.name}>({params?.name})</Text>
            <View style={styles.form}>
                <View>
                    <InputMask
                        label="Comissão (%)"
                        value={commission}
                        mask="percent-only"
                        readonly={false}
                        setValue={setCommission}
                    />
                </View>
                <View style={styles.btn_wrap}>
                    <ButtonSubmit value={"Ativar conta"} onPress={save} styles={styles.btn} />  
                </View>
                
            </View>
            
        </Modal>
    )
}
