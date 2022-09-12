import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, Modal, Pressable} from "react-native";
import styles from "./styles";

export default function newMessage({newMessageInfo = Object, saveMessage = Function, title = "Digite seu lembrete"}) {
    const [msg, setMsg] = useState("");
    useEffect(() =>{
        let boo = !!newMessageInfo;
        if(!boo){
            setMsg("")
        }
    },[newMessageInfo])
    return (
        <View>
            <Modal 
            animationType="fade"
            transparent={true}
            visible={!!newMessageInfo}>
                <View style={styles.modal}>
                    <View style={styles.modal_visible}>
                        <Text style={styles.title}>{title}</Text>

                        <TextInput
                        style={styles.new_msg}
                        multiline={true}
                        value={msg}
                        onChangeText={text => setMsg(text)}
                        />

                        <View style={styles.actions_new_msg}>
                            <Pressable onPress={() =>saveMessage("")}  style={[styles.submit,styles.cancel]}>
                                <Text style={styles.btn_text}>Cancelar</Text>
                            </Pressable>

                            <Pressable onPress={() =>saveMessage(msg)}  style={styles.submit}>
                                <Text style={styles.btn_text}>Salvar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
