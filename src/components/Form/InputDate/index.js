import React, {useState} from 'react';
import {View, Text, Pressable} from "react-native"; 
import styles from "../InputText/styles";
import styles2 from "./styles";
import ICalendar from "../../../assets/icons/calendar";
import Calendar from "./Calendar";
import Select from '../Select';
import Modal from '../../Modal';
import ButtonSubmit from '../ButtonSubmit';
export default function InputDate({
    label = "",
    value = {},
    setValue = Function,
    dateTime = false,
    required = false,
}) {

    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [isOpenTime, setIsOpenTime] = useState(false);
    const [timeHours, setTimeHours] = useState("00");
    const [timeMinutes, setTimeMinutes] = useState("00");

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

    const saveDate = (val)=>{
        setValue(val);
        if(dateTime){
            setIsOpenTime(true);
        }
    }

    const saveTime = ()=>{
        setIsOpenCalendar(false);
        setIsOpenTime(false);
        value.time = timeHours + ':' + timeMinutes;
        setValue(value);
    }

    const hours = ()=>{
        let d = [];
        for(let i = 0;i < 24; i++){
            let j = i < 10 ? "0"+i : ""+i;

            d.push(j);
        }

        return d;
    }

    const minutes = ()=>{
        let d = [];
        for(let i = 0;i < 60; i++){
            let j = i < 10 ? "0"+i : ""+i;

            d.push(j);
        }

        return d;
    }
    return (
        <View style={styles.input_Wrap}>
            <Modal
                isOpen={isOpenCalendar}>
                <Calendar setModalVisible={setIsOpenCalendar} setSave={saveDate} select={value ? value : {}} />
            </Modal>

            <Modal
                title={"Horário"}
                isOpen={isOpenTime}>

                    <View style={styles2.time_wrap}>
                        <View style={styles2.select_wrap}>
                            <Select 
                                label="Hora"
                                value={timeHours}
                                labelTop={true}
                                setValue={setTimeHours}
                                values={hours()}
                                getValue={true}
                            />
                        </View>
                        <Text style={styles2.dots}>:</Text>
                        <View style={styles2.select_wrap}>
                            <Select 
                                label="Minutos"
                                value={timeMinutes}
                                labelTop={true}
                                setValue={setTimeMinutes}
                                values={minutes()}
                                getValue={true}
                            />
                        </View>
                    </View>


                <ButtonSubmit onPress={saveTime} value={"Salvar"} />
            </Modal>

            <Pressable onPress={openCalendar} android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}>
                <View style={styles.label_wrap}>
                    <Text style={styles.label}>
                    {label}{required ? "*" : ""}
                    </Text>
                    <ICalendar style={styles.icon}/>
                </View>
                <Text style={[styles.input]}>
                    {formatData(Object.keys(value)[0])}
                    {value.time? " "+value.time : ""}
                </Text>
            </Pressable>
        </View>
    )
}
