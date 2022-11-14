import React, {useState} from 'react'
import IMessage from "../../../assets/icons/message1";
import styles from "./styles";
import {View, TouchableOpacity, Text, Linking} from "react-native";
import Modal from "../";
import ButtonSubmit from '../../Form/ButtonSubmit';
export default function Feedback() {
    const [isOpenFeedback, setIsOpenFeedback] = useState(false);
    const close = ()=>{
        setIsOpenFeedback(false);
    }

    const handleSubmit = ()=>{
        let url = "https://api.whatsapp.com/send?phone=556496459874&text=Olá Felipe. Gostaria de deixar meu feedback sobre o aplicativo Empel."
        Linking.canOpenURL(url).then((supported) => {
            return Linking.openURL(url);
        });
    }



    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>setIsOpenFeedback(true)} style={styles.btn}>
                <IMessage style={styles.message_icon} />
            </TouchableOpacity>

            <Modal isOpen={isOpenFeedback} close={close} title={"Feedback"} closeTop={true}>
                <Text style={styles.text}>Envie seu feedback para o desenvolvedor, sugestões ou possíveis erros.</Text>
                <ButtonSubmit onPress={handleSubmit} style={styles.submit} value={"Enviar feedback"} />
            </Modal>
        </View>
    )
}
