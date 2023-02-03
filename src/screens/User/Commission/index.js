import React, {useState, useEffect} from 'react'
import InputMask from "../../../components/Form/InputMask";
import InputText from "../../../components/Form/InputText";
import Modal from "../../../components/Modal";
import IPen from "../../../assets/icons/pen";
import styles from "../styles";
import {View, TouchableOpacity} from "react-native";
import ButtonSubmit from "../../../components/Form/ButtonSubmit";
export default function Commission({commissionValue}) {

    const [commission, setCommission] = useState("");
    const [edit, setEdit] = useState("");

    const changeCommission = (val)=>{
        // console.log(commission)
        setCommission(val);
    }

    const save = (e)=>{
        e.preventDefault();
        setEdit(false);
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
            <InputText
                label="Comissão"
                value={commission ? commission+"%" : "0%"}
                editable={false}
            />

            {/* <TouchableOpacity onPress={handleEdit} style={styles.btn_edit}><IPen style={styles.btn_edit_icon}/></TouchableOpacity> */}

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
