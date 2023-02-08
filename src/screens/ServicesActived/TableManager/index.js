import React from "react";
import API from "../../../services/api";
import {Alert} from "react-native";
import Table from "../../../components/Tables/Table";
import { useNavigation } from '@react-navigation/native';

export default function TableServices({data = [], setData, getData, onCustome = false, setLoading, setCallback}) {
    const navigation = useNavigation();

    const removeService = (name,id)=>{
        const confirmed = async()=>{
            //desabilitar conta
            try{
                setLoading(true);
                let res = await API.deletar("ActiveService/"+id).catch(e => e);
                setLoading(false);

                if(res.error || !res)
                    throw new Error(res.error? res.error : "Não foi possive deletar o serviço");

                let arr = [...data];
                arr = arr.filter(obj => obj.id !== id);
                setData(arr);
            }catch(e){
                
                getData(true);
                setCallback({
                    message:e.message,
                    actionName:"Ok!",
                    action:()=>setCallback(null),
                });
            
            }
        }

        let title = "Remover serviço";
        let message = `Remover serviço ${name ? name :id}?`;
        Alert.alert(
            title,
            message,
            [
                {
                    text:"Não",
                    onPress:()=> {},
                    type:"default"
                },
                {
                    text:"Sim",
                    onPress:()=> confirmed()
                }
            ],
            {
                cancelable: true,
                onDismiss:()=> {}
            }
        )

    }

    const filds = [
        {
            label:"Serviço",
            key:"service",
            onPress:(id)=>navigation.navigate("Serviços",{id}),
            onPressReturn: "serviceId"
        },
        {
            label:"Nome do cliente",
            key:"customerName",
            onPress:(id)=>navigation.navigate("Cliente",{id}),
            onPressReturn: "customerId"
        },
        {
            label:"Ultima atualização",
            key:"updatedAt",
        }
    ]

    const actions = [
        {
            name:"Remover",
            onPress:removeService,
            onPressReturn:"service",
            onPressReturn2:"id",
            color:"red"
        }
    ]

    return (
        <>
            <Table 
                data={data}
                filds={filds}
                actions={actions}
            />
        </>
    )
}
