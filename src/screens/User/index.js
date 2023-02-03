import React, {useState, useEffect} from 'react'
import styles from "./styles.js";

import InputText from "../../components/Form/InputText";
import InputMask from "../../components/Form/InputMask";
import VMasker from "vanilla-masker";
import Role from "./Role";
import Commission from "./Commission";
import IUser from "../../assets/icons/user";
import {View, Text, ScrollView} from "react-native";
import API from '../../services/api';
import { useAuthContext } from '../../contexts/authContext';
import Loading from "../../components/Loading";
export default function User({route}) {
    const roteId = route?.params;
    const {setCallback, user} = useAuthContext();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const getUser = async () => {
        try{
            let id = roteId?.id ? roteId.id : user.id;
            setLoading(true);
            let userRes = await API.get(`Consultant/details/${id}`).catch((e) => e);
            setLoading(false);
            
            if(userRes.error || !user)
                throw new Error(userRes.error ? userRes.error : "Usuario não encontrado.");
            

            userRes.username = userRes.user ? userRes.user.firstName + ' ' + userRes.user.lastName : "";
            userRes.permission = userRes.user? userRes.user.typeAccess : "";

            setData(userRes);
        }catch(e){
            return setCallback({
                message:e.message,
                type: 0,
                close:()=>setCallback(null),
                action:()=>{getUser();setCallback(null)},
                actionName:"Tentar novamente!",
            })
        };
    }

    useEffect(()=>{
        getUser();
    },[])

    return (
        <ScrollView style={styles.user}>
            <Loading loading2={loading} />
            <View style={styles.container}>
                <View style={styles.info_wrap}>
                    <View style={styles.profile_image_wrap}>
                        {data?.perfil
                            ? <Image style={[styles.img]} source={{"url":data?.perfil}}/>
                            : <View style={styles.profile_image}>
                                <IUser style={styles.img} />
                            </View>
                        }

                        <Text style={styles.name}>{data?.username}</Text>
                    </View>

                    <View style={styles.form}>

                        <View>
                            <View style={styles.info_single_wrap}>
                                <InputText
                                    label="E-mail"
                                    value={ data?.user ? data?.user.email : ""}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View>
                            <View style={styles.info_single_wrap}>
                                <Role roleValue={data?.permission} />
                            </View>
                        </View>

                        <View>
                            <View style={styles.info_single_wrap}>
                                <Commission commissionValue={data?.commissionInPercentage}/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
