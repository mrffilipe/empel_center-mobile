import React, { useState } from 'react'
import Modal from "../../../components/Modal";
import styles from "./styles";
import Select from "../../../components/Form/Select";
import InputDate from "../../../components/Form/InputDate";
import Textarea from "../../../components/Form/Textarea";
import {useMainContext} from "../../../contexts/mainContext";
import { useAuthContext } from '../../../contexts/authContext';
import API from "../../../services/api";
import {View} from "react-native";
import ButtonSubmit from '../../../components/Form/ButtonSubmit';
import {convertDateToUTC} from "../../../services/tools";

import Loading from "../../../components/Loading";
import Callback from "../../../components/Modal/Callback";

export default function AddActivity({isOpen, close}) {
    const {users, getActivities} = useMainContext();
    const {hasPermission, user} = useAuthContext();

    const [idReceivingUser, setIdReceivingUser] = useState("");
    const [activityCode, setActivityCode] = useState("");
    const [note, setNote] = useState("");
    const [completionDate, setCompletionDate] = useState("");

    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(null);
    const [invalid, setInvalid] = useState(null);

    const handleSubmit = async()=>{
        try{
            setInvalid(null);

            if(activityCode === "" || idReceivingUser === "" || completionDate === ""){
                setInvalid({input:"",message:"Campo obrigatório!"});
                return;
            }

            var params = {
                activityCode:parseInt(activityCode),
                note,
                activityStatus:0,
                completionDate: convertDateToUTC(new Date(Object.keys(completionDate)[0]+"T"+completionDate?.time)),
                idTransmittingUser: user.id,
                idReceivingUser: parseInt(idReceivingUser)
            }

            //console.log(new Date(completionDate).toISOString()); //2023-01-18T13:00:00.000Z

            setLoading(true);
            let res = await API.post("UserActivity",params).catch(err => err);
            setLoading(false);

            if(res?.error)
                throw new Error(res.error);

            setCallback({
                message:"Atividade cadastrada!",
                type:1,
                actionName:"Ok!",
                action:()=>setCallback(null),
            })

            getActivities(false);
            clearFilds(false);
        }catch(e){
            setCallback({
                message:e.message,
                actionName:"Ok!",
                action:()=>setCallback(null),
            });
        }
    }

    const clearFilds = (closeTo = true)=>{
        setIdReceivingUser("");
        setActivityCode("");
        setNote("");
        setCompletionDate("");

        if(closeTo)
            close();
    }

    const usersList = ()=>{
        let arr = users.map(user => {
            return {
                name:user.firstName+ " " + user.lastName, 
                id:user.id
            }
        });
        return arr;
    }

    if(!hasPermission)
        return <></>

    return (
        <View>
            <Loading loading2={loading} />
            <Callback params={callback} />
            <Modal isOpen={isOpen} close={clearFilds} title={"Criar Atividade"}>
                <View style={styles.form}>

                    <View style={styles.form_group}>
                        <Select 
                            label={"Tipo de atividade"}
                            value={activityCode}
                            setValue={setActivityCode}
                            labelTop={true}
                            values={["0","1"]}
                            required={true}
                            invalid={invalid?.input === activityCode ? invalid?.message : null}
                        />

                        <Select 
                            label={"Responsável"}
                            value={usersList().filter(u => u.id === idReceivingUser)[0]?.name}
                            setValue={setIdReceivingUser}
                            labelTop={true}
                            values={usersList()}
                            required={true}
                            invalid={invalid?.input === idReceivingUser ? invalid?.message : null}
                        />

                    </View>

                    <View style={styles.form_group}>
                        <InputDate
                            value={completionDate}
                            setValue={setCompletionDate}
                            label={"Prazo"}
                            dateTime={true}
                            invalid={invalid?.input === completionDate ? invalid?.message : null}
                        />
                    </View>

                    <View style={styles.form_group}>
                        <Textarea 
                            label={"Nota"}
                            value={note}
                            setValue={setNote}
                        />
                    </View>

                    <View style={styles.btn_wrap}>
                        <ButtonSubmit styles={[styles.btn,styles.btn_cancel]} onPress={clearFilds} value={"Cancelar"} />
                        <ButtonSubmit styles={styles.btn} onPress={handleSubmit} disabled={!!!idReceivingUser} value={"Salvar"} />                 
                    </View>
                </View>
            </Modal>
        </View>
    )
}
