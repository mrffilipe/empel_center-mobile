import React, {useState, useEffect} from 'react'
import Select from '../../../components/Form/Select';
import optionsSelect from "../../../data/selectOptions.json";
import InputText from "../../../components/Form/InputText";
import Modal from "../../../components/Modal";
import IPen from "../../../assets/icons/pen";
import styles from "../styles";
import {View, TouchableOpacity} from "react-native";
import ButtonSubmit from "../../../components/Form/ButtonSubmit";
import enumData from "../../../data/enum.json";
export default function Role({roleValue}) {
    const [role, setRole] = useState(roleValue);

    const [edit, setEdit] = useState("");

    const changePermision = (val)=>{
        setRole(val);
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
        setRole(roleValue);
        setEdit(false);
    }

    useEffect(()=>{
        setRole(roleValue);
    },[roleValue])

    return (
        <View>

            <InputText
                label={"Cargo"} 
                value={optionsSelect?.typeAccess[enumData.typeAccess[role]]} 
                editable={false}
            />
            

            {/* <TouchableOpacity onPress={handleEdit} style={styles.btn_edit}><IPen style={styles.btn_edit_icon}/></TouchableOpacity> */}

            <Modal isOpen={edit} close={close} title={"Editar comissão"} closeTop={true} >
                <Select 
                    labelTop={true} 
                    label={"Cargo"} 
                    value={optionsSelect?.typeAccess[enumData.typeAccess[role]]} 
                    setValue={changePermision} 
                    values={optionsSelect?.typeAccess} 
                />

                <ButtonSubmit styles={styles.btn_save} onPress={save} value={"Salvar"}/>
            </Modal>
        </View>
    )
}
