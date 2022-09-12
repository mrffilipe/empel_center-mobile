import styles from "./styles.js";
import {View, Pressable, ScrollView, Modal, Text} from "react-native";
import ITrash from "../../../assets/icons/trash";
import IDotts from "../../../assets/icons/dotts";
import React,{ useState, useEffect} from "react";
const props = {
    msgs:Array,
    setMsgs:Function,
    deleteMessage:Function,
}
export default function Reminder({msgs, setMsgs, deleteMessage} = props){
    const [data, setData] = useState([]);
    const [openOptions, setOpenOptions] = useState(false);

    const exclude = (msgId)=>{
        let arr = [...data];
        arr = arr.filter(obj => obj.id !== msgId);
        setData(arr)
        deleteMessage(arr);
    }

    const close = ()=>{
        setMsgs(null);
    }

    useEffect(()=>{
        if(msgs)
            setData(msgs);
    },[msgs])

        return(
            <Modal 
            animationType="fade"
            transparent={true}
            visible={!!msgs}>
                <View style={styles.modal}>
                    <Pressable onPress={close} style={styles.closeModal}/>

                    <View style={styles.modal_content_wrap}>
                        <View style={styles.message_title_wrap}>
                            <Text style={styles.message_title}>Lembretes</Text>
                            <Pressable title="opções" onPress={()=>setOpenOptions(!openOptions)}><IDotts style={styles.icon}/></Pressable>
                        </View>
                        <ScrollView style={styles.messages_wrap}>
                            {data.map((val,key)=>{
                                return(
                                    <View key={key} style={styles.messages_single}>
                                        <View style={styles.message_title_wrap}>
                                            <Text style={styles.message_username}>{val.name}</Text>
                                            {openOptions && <Pressable onPress={()=>exclude(val?.id)} style={styles.red}><ITrash style={[styles.icon,styles.trash]}/></Pressable>}
                                        </View>

                                        <Text style={styles.msg}>{val.msg}</Text>  
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        )
}
