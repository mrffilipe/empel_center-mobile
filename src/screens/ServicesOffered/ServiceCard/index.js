import React, {useEffect, useState} from 'react'
import styles from "./styles.module.css";
import { formatDate } from '../../../services/tools';
import {BiDotsVerticalRounded, BiTrash, BiChevronDown, BiCheck, BiMinus} from "react-icons/bi";
import {useAuthContext} from "../../../contexts/authContext";
import {useMainContext} from "../../../contexts/mainContext";
import API from "../../../services/api";
import Loading from "../../../components/Loading";
import Confirm from "../../../components/Modal/Confirm";

export default function ArchiveCard({data}) {
    const {hasPermission, setCallback, setLoading} = useAuthContext();
    const {setServices, services} = useMainContext(); 

    const [menuCard, setMenuCard] = useState(null);
    const [menuInfo, setMenuInfo] = useState(null);
    const [loading2, setLoading2] = useState(false);
    const [confirmParams ,setConfirmParams] = useState(null);

    const openMenuCard = (e,keyMenu)=>{
        stopPropagation(e);
        if(keyMenu === menuCard)
            return setMenuCard(null);

        setMenuCard(keyMenu);
    }

    const openInfo = (e,keyInfo)=>{
        stopPropagation(e);
        if(keyInfo === menuInfo)
            return setMenuInfo(null);

        setMenuInfo(keyInfo);
    }

    const stopPropagation = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopPropagation();
    }

    const deleteService = async(e,id,name)=>{
        stopPropagation(e);
        if(!hasPermission())
            return

        const next = async()=>{
            try{
                setLoading2(true);
                let res = await API.deletar(`ServiceOffered/${id}`).catch(err => err);
                setLoading2(false);
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

            setConfirmParams(null);
        }

        setConfirmParams({
            next,
            cancel:()=>setConfirmParams(null),
            message:`Deletar o serviço "${name}"?`
        })
    }

    useEffect(()=>{
        setMenuCard(null);
        if(data.length === 1){
            setMenuInfo(0);
        }else{
            setMenuInfo(null);
        }
    },[data])

    return (
        <div className={styles.activities_wrap}>
            <Confirm params={confirmParams} close={()=>setConfirmParams(null)} />
            {loading2 ? <Loading loading2={loading2} animation="delete" /> :<></>}
            {data.map((val,key)=>{
                let hasMenu = hasPermission();
                let isActive = val.active === true;
                return(
                    <div className={styles.service_single} style={{maxHeight:menuInfo === key ? "500px" : "40px"}} key={key} >
                        <div className={styles.service_single_main}>
                            <div className={styles.name_file_wrap}>
                                {isActive
                                    ? <h3><BiCheck/></h3>
                                    : <h3 className={styles.no_active}><BiMinus/></h3>
                                }
                                

                                <button onClick={(e)=>openInfo(e,key)}>
                                    <h4 className={"limit-text-one-line"}>{val.name}</h4>
                                </button>
                            </div>

                            <div className={styles.actions_wrap}>
                                {key === menuCard ?
                                    <button disabled={!hasMenu} title="Excluir" className={styles.delete} onClick={(e)=>deleteService(e,val.id,val.name)}>
                                        <BiTrash />
                                    </button>
                                    :<></>
                                }

                                <button title="Detalhes" className={key === menuInfo ? styles.info_card_open : ""} onClick={(e)=>openInfo(e,key)}>
                                    <BiChevronDown/>
                                </button>
                                
                                {hasPermission() 
                                    ? <button disabled={!hasMenu} className={key === menuCard ? styles.menu_card_open : ""} onClick={(e)=>openMenuCard(e,key)}>
                                        <BiDotsVerticalRounded />
                                    </button>
                                    :<></>
                                }
                            </div>
                        </div>
                        <div className={styles.info_wrap}>
                            <h5><span>Ativo: </span><p>{isActive ? "Sim" : "Não"}</p></h5>
                            <h5><span>Criado em: </span><p>{formatDate(val.createdAt,false, true)}</p></h5>
                            {val.description?<h5><span>Descrição: </span><p>{val.description}</p></h5> : <></>}
                            
                            {/* {isActive 
                                ? <button className={styles.not_active_btn}>Desativar</button>
                                : <button>Ativar</button>
                            } */}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
