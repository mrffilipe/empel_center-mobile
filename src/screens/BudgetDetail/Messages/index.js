import React, {useState} from 'react';
import styles from './styles';
import { formatDate } from '../../../services/tools';
import BiUser from "../../../assets/icons/user";
import Textarea from "../../../components/Form/Textarea";
import { useAuthContext } from '../../../contexts/authContext';
import {View, Text} from "react-native";
import ButtonSubmit from '../../../components/Form/ButtonSubmit';
export default function Messages({sellerId}) {
    const [text, setText] = useState("");
    const {hasPermission, user} = useAuthContext();
    const message = [
        {
            date: formatDate(new Date(), true, true, false),
            message: "Documento enviado",
            name: "Brunno"
        },
        {
            date: formatDate(new Date(), true, true, false),
            message: "Documento enviado",
            name: "Brunno"
        },
        {
            date: formatDate(new Date(), true, true, false),
            message: "Documento enviado",
            name: "Brunno"
        }
    ]

    const handleSubmit = (e)=>{
        e.preventDefault();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.h2}>Mensagens</Text>

            <View style={styles.messages}>
                {message.map((val,key)=>{
                    return(
                        <View style={styles.message} key={key}>
                            <View style={styles.icon_wrap} >
                                {val?.perfil
                                    ? <View style={[styles.icon, styles.img]}/>
                                    : <BiUser style={styles.icon} />
                                } 
                            </View>
                            <View  style={styles.content_wrap}>
                                <Text style={styles.h5}>{val?.date}</Text>
                                <Text style={styles.span}>{val?.name} </Text>
                                <Text style={styles.p}>{val.message}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
            {
                hasPermission() || user.id === sellerId ?
                    <View style={styles.form}>
                        <Textarea 
                            value={text}
                            setValue={setText}
                            label={"Escrever Mensagem"}
                        />

                        <View style={styles.btn_wrap}>
                            <ButtonSubmit disabled={text.length === 0} value={"Enviar"} styles={styles.btn} onPress={handleSubmit} />
                        </View>
                    </View>
                    :<></>
            }
        </View>
    )
}
