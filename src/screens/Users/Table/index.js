import styles from "./styles";
import React, {useState} from "react";
import {View, Text, TouchableOpacity, Linking, Alert} from "react-native";
import AllClear from "../../../components/AllClear";
import optionsSelect from "../../../data/selectOptions.json";
import { useNavigation } from '@react-navigation/native';
import { limitText } from "../../../services/tools";
import Loading from "../../../components/Loading";
import RegisterConsultant from "../RegisterConsultant";
import API from "../../../services/api";
import enumData from "../../../data/enum.json";

const props = {
    data:[{
        id:Number,
        name:String,
        email:String,
        phone:Number,
        typeAccess:String,
    }],
    getData:Function
}
export default function Table({data, getData} = props) {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [registerNewConsultant, setRegisterNewConsultant] = useState(null);

    const desableAcess = (name,id)=>{

        Alert.alert(
            "Confirmar",
            "Desativar acesso do usuário "+name,
            [
                {
                    text:"Não",
                    onPress:()=> cancel(),
                    type:"default"
                },
                {
                    text:"Sim",
                    onPress:()=> confirmed(id)
                }
            ],
            {
                cancelable: true,
                onDismiss:()=> cancel()
            }
        )
    }

    const activateAcess = (name,id, isConsultant)=>{

        if(!isConsultant)
            return setRegisterNewConsultant({id,name,getData});

        Alert.alert(
            "Confirmar",
            "Ativar acesso do usuário "+name,
            [
                {
                    text:"Não",
                    onPress:()=> cancel(),
                    type:"default"
                },
                {
                    text:"Sim",
                    onPress:()=> confirmed(id)
                }
            ],
            {
                cancelable: true,
                onDismiss:()=> cancel()
            }
        )
    }

    const confirmed = async(id)=>{
        try{
            setLoading(true);
            await API.put("Consultant/"+id).catch(e => e);
            setLoading(false);
            getData(true);
        }catch(e){
            setLoading(false);
            alert(e.message);
        }
    }

    const cancel = ()=>{

    }

    const link = ({url})=> {
        Linking.canOpenURL(url).then((supported) => {
            return Linking.openURL(url);
        });
    }

    return (
        <View style={[styles.container]}>
            {loading ? <Loading loading2={loading} /> : <></>}
            <RegisterConsultant params={registerNewConsultant} setParams={setRegisterNewConsultant} />
            <View style={[styles.list]}>
                {
                data.map((val,key)=>{
                    var fullName = val?.firstName ? val?.firstName + " " + val?.lastName : "";
                    const isActive = val.consultant && val?.consultant.active;
                    const idActive = val?.consultant ? val?.consultant.id : val?.id;
                    const isConsultant = val?.consultant !== undefined;
                    return(
                        <View
                        key={key} 
                        style={isActive ?[styles.info]:[styles.info,styles.info_desabled]}>

                            
                                <View style={styles.table_wrap}>
                                    {/* GRUPO A */}

                                    <View style={styles.text_wrap}>
                                        <Text style={[styles.h5]}>Nome: </Text>
                                        <TouchableOpacity style={styles.content_wrap} onPress={()=>navigation.navigate("Perfil",{id:val?.id})}>
                                            <Text style={[styles.h5,styles.h5_content,styles.right]}>{fullName}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.text_wrap}>
                                        <Text style={[styles.h5]}>Email: </Text>
                                        <TouchableOpacity style={styles.content_wrap} onPress={()=>link({url:"mailto:"+val.email})}>
                                            <Text style={[styles.h5,styles.h5_content,styles.right]}>{limitText(val.email,28)}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.text_wrap}>
                                        <Text style={[styles.h5]}>Cargo: </Text>

                                        <Text style={[styles.h5,styles.h5_content,styles.right,styles.not_link]}>{optionsSelect?.typeAccess[enumData.typeAccess[val.typeAccess]]}</Text>
                                            
                                    </View>

                                    <View style={styles.text_wrap}>
                                        {isActive
                                            ? 
                                            <></>
                                            : 
                                            <TouchableOpacity style={[styles.btn,styles.btn_activete]} onPress={()=>activateAcess(fullName, idActive, isConsultant)}>
                                                <Text style={styles.btn_text}>{"Ativar conta"}</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>

                                </View>

                        </View>
                    )
                })
            }
            </View>
        </View>
    )
}

