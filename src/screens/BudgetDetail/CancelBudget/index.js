import React, {useState} from 'react'
import API from "../../../services/api";
import {Alert, View} from "react-native";
import { useAuthContext } from "../../../contexts/authContext";
import ButtonSubmit from '../../../components/Form/ButtonSubmit';
import {colors} from "../../../styles/defount.json";
export default function CancelBudget({id}) {
    const {setLoading, setCallback} = useAuthContext();
    const [openConfirm, setOpenConfirm] = useState(null);
    const markAsCanceled = async()=>{
        let message = "Remover esse orçamento?";
        if(await confirmDelete("Confirmar",message)){
            console.log("Confirmed");

            setOpenConfirm(null);
        }
        
    }

    const confirmDelete = (title,message)=>{
        return new Promise((resolve)=>{

            Alert.alert(
                title,
                message,
                [
                    {
                        text:"Não",
                        onPress:()=> resolve(false),
                        type:"default"
                    },
                    {
                        text:"Sim",
                        onPress:()=> resolve(true)
                    },
                ],
                {
                    cancelable: true,
                    onDismiss:()=> resolve(false)
                }
            )
        })
    }

    return (
        <View style={{
            paddingHorizontal:15,
            alignItems:"flex-end",
        }}>
            <ButtonSubmit onPress={markAsCanceled} value="Cancelar Orçamento!" styles={{backgroundColor:colors.red}} />
        </View>
    )
}
