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
import { useMainContext } from '../../contexts/mainContext';
import Loading from "../../components/Loading";
export default function User({route}) {
    const roteId = route?.params;
    const {setCallback, user, hasPermission} = useAuthContext();
    const {users} = useMainContext();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const id = roteId?.id ? roteId.id : user.id;

    const getUserInList = async () => {
        let arr = [...users];
        console.log(roteId);
        try{
            let userRes = arr.filter((val) => val.id === parseInt(id))[0];
            
            if(!userRes)
                throw new Error("Usuario não encontrado!");
            
            setData(userRes);
        }catch(e){
            // getUsers(false);
            return setCallback({
                message:e.message,
                type: 0,
                close:()=>setCallback(null),
                action:()=>{setCallback(null)},
                actionName:"Ok!",
            })
        };
    }

    useEffect(()=>{
        if(users.length)
            getUserInList();
    },[users]);

    // useEffect(()=>{
    //     getUsers(false);
    // },[]);

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

                        <Text style={styles.name}>{data?.fullName}</Text>
                    </View>

                    <View style={styles.form}>

                        <View>
                            <View style={styles.info_single_wrap}>
                                <InputText
                                    label="E-mail"
                                    value={data?.email}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View>
                            <View style={styles.info_single_wrap}>
                                <Role roleValue={data?.typeAccess} />
                            </View>
                        </View>
                        {hasPermission() || user.id === parseInt(id)?
                            <View>
                                <View style={styles.info_single_wrap}>
                                    <Commission id={id} consultantId={data?.consultant?.id} commissionValue={data?.consultant?.commissionInPercentage}/>
                                </View>
                            </View>
                        :<></>
                        }
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
