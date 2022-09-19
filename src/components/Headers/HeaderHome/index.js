import React, {useState, useEffect, useRef} from 'react'
import styles from "./styles";
import {View, Text, Pressable, Modal, ScrollView, Animated, Easing} from 'react-native';

import ICloudUpload from "../../../assets/icons/cloudUpload";
import IRefresh from "../../../assets/icons/refresh";
import API from "../../../services/api";
import NetInfo from "@react-native-community/netinfo";
import {useMainContext} from "../../../contexts/mainContext";
export default function LogoTitle({tintColor,title}) {
    const {DB,setDB} = useMainContext([]);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const unsubscribe = NetInfo.addEventListener(state => {
        if(state.isConnected !== isConnected) 
            setIsConnected(state.isConnected);
    });

    const [updating, setUpdating] = useState(false);
    
    // Unsubscribe
    unsubscribe();

    const rotateY = useRef(new Animated.Value(0)).current  // Initial
    const anim = useRef(Animated.loop(
        Animated.timing(
            rotateY,
            {
                toValue:360,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver:true
            }
        )

    )).current;

    const sincronize = async()=>{//tentar cadastrar dados quando conectado
        if(updating) return;
        setUpdating(true);
        let arr = [...DB];
        try{
            for (const [key, val] of arr.entries()) {
                let req = await API[val.function](val.params);
                console.log(req)
                if(!req.error){//remover da fila caso de sucesso
                    arr = arr.filter((val,index)=> index !== key);
                }
            }
        }catch(e){
            console.log(e)
        }

        setDB(arr);
        setUpdating(false);
    }

    const sinclonizeLoading = ()=>{
        return(
            <Animated.View                 // Special animatable View
            style={{
                transform: [
                    {
                        rotate: rotateY.interpolate({
                        inputRange: updating?[0, 360]:[0, 0],
                        outputRange: updating?['0deg', '360deg']:["0deg","0deg"]}),
                    },
                { perspective: 10000 } // without this line this Animation will not render on Android while working fine on iOS
                ]
                
            }}>
                <IRefresh style={styles.refresh}/>
            </Animated.View>
        )
    }

    useEffect(() => {
        if(updating && isOpenModal){
            anim.start() 
        }else{
            anim.stop();
             rotateY.setValue(0)
        }

        return () => anim.stop();
    }, [updating,isOpenModal])

    useEffect(() => {
        if(isConnected){
            sincronize();
        }
    },[isConnected])

    if(DB.length || !isConnected){
        return (
            <View style={styles.container}>
                <Text style={[styles.title,{color:tintColor}]}>{title}</Text>
                <Pressable style={[styles.btn_pendent]} onPress={()=>setIsOpenModal(!isOpenModal)}>
                    <Text style={styles.amount}>{DB.length?DB.length:""}</Text>
                    <ICloudUpload style={isConnected?[styles.icon_on]:[styles.icon_on,styles.of]}/>
                </Pressable>


                {DB.length ?
                    <Modal visible={isOpenModal} transparent={true} animationType="fade">
                        <View style={styles.modal}>
                            <Pressable onPress={()=>setIsOpenModal(!isOpenModal)} style={styles.closeModal}/>
                            <View style={styles.modal_content_wrap}>
                                <View style={styles.modal_header}>
                                    <Text style={styles.title_2}>Aguardando conexão</Text>

                                    <Pressable onPress={sincronize} style={styles.btm_refresh} android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}>

                                           {sinclonizeLoading}
                                        
                                    </Pressable>
                                </View>

                                <ScrollView style={styles.tasks_wrap}>
                                    {DB.map((val,key)=>{
                                        return (
                                            <View key={key} style={styles.tasks}>
                                                <Text style={styles.task_title}>{val?.title}</Text>

                                                {val.status?
                                                    <Pressable>
                                                        <Text>Ok!</Text>
                                                    </Pressable>
                                                :
                                                    <Text style={styles.task_title}>
                                                        {val.date}
                                                    </Text>
                                                }
                                            </View>
                                        )
                                    })}
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>

                    :<></> 
                } 
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <Text style={[styles.title,{color:tintColor}]}>{title}</Text>
        </View>
    )
}
