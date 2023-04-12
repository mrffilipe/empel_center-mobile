import React, {useEffect, useState} from 'react'
import {useAuthContext} from "../../../contexts/authContext";
import API from "../../../services/api";
import Loading from "../../../components/Loading";
import Callback from "../../../components/Modal/Callback";
import TableList from '../../../components/Tables/TableList';
import { Alert } from 'react-native';

export default function ArchiveCard({data, setData}) {
    const {hasPermission} = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(null);

    const [loading2, setLoading2] = useState(false);

    const deleteArchive = async(id,name)=>{
        const confirmed = async()=>{
            try{
                setLoading2(true);
                let res = await API.deletar(`StoredFile/${id}`).catch(err => err);
                setLoading2(false);
                if(res?.error)
                    throw new Error(res.error);

                let arr = [...data];
                arr = arr.filter(val => val.id !== id);

                setData(arr);
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
        let message = `Deletar arquivo "${name}"?`
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
        },
        {
            label:"Extenção",
            key:"extension",
        },
        {
            label:"Enviado Por",
            key:"sendedBy",
        },
        {
            label:"Enviado em",
            key:"created",
        },
        {
            label:"Nome do arquivo",
            key:"filename",
        },
        {
            label:"Permissão",
            key:"permission",
        },
        {
            label:"Nota",
            key:"note",
        }
    
    ]

    const actions = hasPermission() ? [
        {
            onPress:deleteArchive,
            onPressReturn2:"name",
            onPressReturn:"id",
            color:"red"
        }
    ] : [];

    return (
        <>
            <Loading loading2={loading} />
            <Callback params={callback} />
            {loading2 ? <Loading loading2={loading2} animation="delete" /> :<></>}

            <TableList data={data} actions={actions} filds={filds} />
        </>

    )
}
