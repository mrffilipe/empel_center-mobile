import React from "react";
import API from "../../../services/api";
import {Alert} from "react-native";
import Table from "../../../components/Tables/Table";
import { useNavigation } from '@react-navigation/native';
import { useMainContext } from '../../../contexts/mainContext';
export default function TableServices({data = [], setData, getData, onCustome = false, setLoading, setCallback}) {
    const navigation = useNavigation();
    const {getServicesActives} = useMainContext();  

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
                if(!onCustome){
                    setData(arr);
                }else{
                    getData(true);
                    getServicesActives(false);
                }
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
            label:"Status",
            key:"status",
        },
        {
            label:"Ultima atualização",
            key:"updated",
        }
    ];

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
                filds={filds.filter((val,key) => key != 1 || !onCustome)}
                actions={actions}
            />
        </>
    )
}
