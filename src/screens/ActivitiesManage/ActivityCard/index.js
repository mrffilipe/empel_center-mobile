import React, {useState} from 'react'
import { formatDate } from '../../../services/tools';
import selectOptions from "../../../data/selectOptions.json";
import {useAuthContext} from "../../../contexts/authContext";
import { useMainContext } from '../../../contexts/mainContext';
import API from "../../../services/api";
import Loading from "../../../components/Loading";
import Callback from "../../../components/Modal/Callback";
import { Alert } from 'react-native';
import TableList from '../../../components/Tables/TableList';
import ICheck from "../../../assets/icons/check";

export default function ActivityCard({data, setData}) {
    const {hasPermission} = useAuthContext();
    const {getActivities} = useMainContext();
    const [loading2, setLoading2] = useState(false);
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(null);

    const deleteActivity = async(id)=>{
        const confirmed = async()=>{
            try{
                setLoading2(true);
                let res = await API.deletar(`UserActivity/${id}`).catch(err => err);
                setLoading2(false);
                if(res?.error)
                    throw new Error(res.error);

                let arr = [...data];
                arr = arr.filter(val => val.id !== id);
                setData(arr);
            }catch(e){
                setCallback({
                    message:e.message,
                    actionName:"Ok!",
                    action:()=>setCallback(null),
                })
            }
        }

        let title = "Deletar";
        let message = `Deletar Atividade?`
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

    const markConcluded = async(id)=>{
        try{
            let arr = [...data];
            arr = arr.map(val => {
                if(val.id === id){
                    val.activityStatus = 1;
                    val.finishedIn = formatDate(new Date().toISOString().replace("Z",""),true);
                    val.state = selectOptions.activityStatus[val?.activityStatus];
                    val.stateColor = val?.activityStatus === 1? "green": val?.activityStatus === 2? "red" : "yellow";
                }
                return val;
            } );
            setData(arr);

            let res = await API.post(`UserActivity/confirmCompletion/${id}`).catch(err => err);
            
            if(res.error)
                throw new Error(res.error);

        }catch(e){
            setCallback({
                message:e.message,
                actionName:"Ok!",
                action:()=>setCallback(null),
            })

            getActivities(false);
        }
    }

    const filds = [
        {
            label:"Nota",
            key:"note",
        },
        {
            label:"",
        },
        {
            label:"Responsavel",
            key:"responsible",
        },
        {
            label:"Prazo",
            key:"expiresIn",
        },
        {
            label:"",
        },
        {
            label:"Criado por",
            key:"createdBy",
        },
        {
            label:"Criado Em",
            key:"createdAt",
        },
        {
            label:"",
        },
        {
            label:"Finalizado em",
            key:"finishedIn",
        },

    
    ]

    const actions = hasPermission() ? [
        {
            onPress:deleteActivity,
            onPressReturn:"id",
            color:"red"
        },
        {
            icon:ICheck,
            onPress:markConcluded,
            onPressReturn:"id",
            color:"green",
            condiction:(val)=> val.activityStatus !== 1,
            
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
