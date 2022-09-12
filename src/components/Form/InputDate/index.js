import React, {useState} from 'react';
import {View, Text, Pressable, Modal} from "react-native"; 
import styles from "../InputText/styles";
import ICalendar from "../../../assets/icons/calendar";
import Calendar from "./Calendar";
export default function InputDate({
  label = "",
  value = {},
  setValue = Function,
}) {

    const [isOpenCalendar, setIsOpenCalendar] = useState(false);

    const openCalendar = ()=>{
        setIsOpenCalendar(true);
    }

    function formatData(date = "") {
        if (!date) {//formatar data atual
            return "";
        } else {//formatar data no parametro
            let d = date.split("-");
            var dia = d[2];
            var mes = d[1];
            var ano = d[0];
            return dia + "/" + mes + "/" + ano;
        }
    }

    return (
        <View style={styles.input_Wrap}>
             <Modal
            style={styles.modal}
            animationType="fade"
            transparent={true}
            visible={isOpenCalendar}>
                <Calendar setModalVisible={setIsOpenCalendar} setSave={setValue} select={value} />
            </Modal>

            <Pressable onPress={openCalendar} android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}>
                <View style={styles.label_wrap}>
                    <Text style={styles.label}>
                    {label}
                    </Text>
                    <ICalendar style={styles.icon}/>
                </View>
                <Text style={[styles.input]}>
                    {formatData(Object.keys(value)[0])}
                </Text>
            </Pressable>
        </View>
    )
}
