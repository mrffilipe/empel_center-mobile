import React, {useEffect, useState} from 'react'
import {useAuthContext} from "../../../contexts/authContext";
import {useMainContext} from "../../../contexts/mainContext";
import API from "../../../services/api";
import Loading from "../../../components/Loading";
import Callback from "../../../components/Modal/Callback";
import TableList from "../../../components/Tables/TableList";
import { Alert } from 'react-native';

export default function ArchiveCard({data = []}) {
    const {hasPermission} = useAuthContext();
    const {setServices, services} = useMainContext(); 

    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(null);

    const removeService = async(id,name)=>{
        if(!hasPermission())
            return

        const confirmed = async()=>{
            try{
                setLoading(true);
                let res = await API.deletar(`ServiceOffered/${id}`).catch(err => err);
                setLoading(false);
                if(res?.error)
                    throw new Error(res.error);

                let arr = [...services];
                arr = arr.filter(val => val.id !== id);
                
                setServices(arr);
            }catch(e){
                setLoading(false);
                setCallback({
                    message:e.message,
                    actionName:"Ok!",
                    action:()=>setCallback(null),
                })
            }
        }

        let title = "Deletar";
        let message = `Deletar o serviço "${name}"?`;
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
            label:"Nome",
            key:"name",
            labelMinWidth:80,
        },
        {
            label:"Ativo",
            key:"state",
            labelMinWidth:80,
        },
        {
            label:"Criado em",
            key:"created",
            labelMinWidth:80,
        },
        {
            label:"Descrição",
            key:"description",
            labelMinWidth:80,
        }
    
    ]

    const actions = hasPermission() ? [
        {
            onPress:removeService,
            onPressReturn2:"name",
            onPressReturn:"id",
            color:"red"
        }
    ] : [];

    return (
        <>
            <Loading loading2={loading} />
            <Callback params={callback} />
            <TableList data={data} filds={filds} actions={actions}/>
        </>
    )
}
