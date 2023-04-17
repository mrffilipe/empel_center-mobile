import React from 'react'
import styles from './styles.js';
import {useState} from "react";
import Select from "../../../../components/Form/Select";
import selectOptions from "../../../../data/selectOptions.json";
import API from "../../../../services/api";
import ButtonSubmit from '../../../Form/ButtonSubmit/index.js';
import Modal from "../../../Modal";
import {View} from "react-native";
import Loading from "../../../Loading";
import Callback  from "../../../Modal/Callback";

const props = {
    open:Number | null,
    save:Function,
    close:Function,
    title:String,
}

export default function AddMessage({isOpen,save,close, title = "Adicionar Tarefa", id} = props) {
    const [task, setTask] = useState("");
    const [invalid, setInvalid] = useState(null);

    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState();

    const handleSubmit = async ()=>{
        setInvalid(null);
        
        try{
            if(task === ""){
                return setInvalid({input:task,message:"Selecione uma tarefa"});
            }

            let params = {
                "taskCode": task,
                "idPVForm": id
            };
            setLoading(true);
            let res = await API.post("PVForm/create-task",params).catch(e => e);
            
            if(res.error){
                throw new Error(res.error);
            }

            save(res.data);
            setTask("");
            close();
        }catch(error){
            setCallback({
                type: 0,
                message: `Não foi possivel salvar tarefa!`,
                action:()=>{
                    setCallback(null)
                },
                actionName:"Ok!",
                close:()=>setCallback(null)
            })
        }
        setLoading(false);
    }

    const handleClose = (e)=>{
        e.preventDefault();
        setTask("");
        close(null);
        setInvalid(null);
    }

    return (
        <Modal isOpen={isOpen} close={handleClose} title={title}>
            {loading ? <Loading loading2={loading}/> : <></>}
            {callback? <Callback params={callback} /> : <></>}
            <View >
                <Select   
                    value={selectOptions.tasksPvForm[task]}
                    setValue={(val)=>setTask(val)}
                    values={selectOptions.tasksPvForm}
                    invalid={invalid?.input === task ? invalid?.message : null}
                />
                <View style={styles.action}>
                    <ButtonSubmit onPress={handleClose} styles={styles.btn_red} value="Cancelar" />
                    <ButtonSubmit onPress={handleSubmit} styles={styles.btn} value="Salvar" />
                </View>

            </View>
        </Modal>
    )
}
