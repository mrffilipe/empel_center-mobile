import React, {useState, useEffect} from 'react'
import InputMask from "../../../components/Form/InputMask";
import InputText from "../../../components/Form/InputText";
import Modal from "../../../components/Modal";
import IPen from "../../../assets/icons/pen";
import styles from "../styles";
import {View, TouchableOpacity} from "react-native";
import ButtonSubmit from "../../../components/Form/ButtonSubmit";
import { useAuthContext } from '../../../contexts/authContext';
import Callback from "../../../components/Modal/Callback";
import API from "../../../services/api";
import Loading from "../../../components/Loading";
export default function Commission({commissionValue,consultantId,id}) {
    const {hasPermission} = useAuthContext();
    const [commission, setCommission] = useState("");
    const [edit, setEdit] = useState("");
    const [callback, setCallback] = useState(null);
    const [loading, setLoading] = useState(false);

    const changeCommission = (val)=>{
        // console.log(commission)
        setCommission(val);
    }

    const save = async()=>{
        if(!consultantId) return;
        
        try{
            let params = {
                "id": consultantId,
                "percentageCommission": parseInt(commission),
                "idUser": id,
            };
            setLoading(true);
            let res = await API.put("Consultant",params).catch(err => err);

            if(res.error) throw new Error(res.error);
            setEdit(false);
        }catch(err){
            setCallback({
                message:err.message,
                close:()=>setCallback(null),
                action:()=>setCallback(null),
                actionName:"Ok!"
            });
        }
        setLoading(false);
        
    }

    const handleEdit = (e)=>{
        e.preventDefault();
        setEdit(true);
    }

    const close = (e)=>{
        e.preventDefault();
        setCommission(commissionValue);
        setEdit(false);
    }

    useEffect(()=>{
        setCommission(commissionValue);
    },[commissionValue])

    return (
        <View>
            <Callback params={callback} />
            <Loading loading2={loading}/>
            <InputText
                label="Comissão"
                value={commission ? commission+"%" : "0%"}
                editable={false}
            />
            {hasPermission()?
                <TouchableOpacity onPress={handleEdit} style={styles.btn_edit}><IPen style={styles.btn_edit_icon}/></TouchableOpacity>
                :<></>
            }
            <Modal isOpen={edit} close={close} title={"Editar comissão"} closeTop={true} >
                <InputMask
                    label="Comissão (%)"
                    value={commission}
                    mask="percent_only"
                    setValue={changeCommission}
                    keyboardType="number-pad"
                />

                <ButtonSubmit styles={styles.btn_save} onPress={save} value={"Salvar"}/>
            </Modal>


        </View>
    )
}
