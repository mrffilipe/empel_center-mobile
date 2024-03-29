import React, {useState, useEffect, useRef} from 'react'
import styles from "./styles";
import {View, Text, Pressable, Modal, ScrollView, Animated, Easing} from 'react-native';

import ICloudUpload from "../../../assets/icons/cloudUpload";
import IHistory from "../../../assets/icons/history";
import IRefresh from "../../../assets/icons/refresh";
import API from "../../../services/api";
import NetInfo from "@react-native-community/netinfo";
import {useAuthContext} from "../../../contexts/authContext";
import {formatDate} from "../../../services/tools";

export default function HistoryBeckup() {
    const {tasksStoraged,setTasksStoraged} = useAuthContext([]);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    const [sincronized, setSincronized] = useState([]);
    const [notSincronized, setNotSincronized] = useState([]);

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
        deleteOldHistory()
        if(updating) return;
        setUpdating(true);
        let arr = [...tasksStoraged];
        try{
            for (const [key, val] of arr.entries()) {
                if(!val.status){
                    let req = await API[val.function](val.params);
                    if(!req.error){//remover da fila caso de sucesso
                        arr = arr[key].status = 1;
                    }
                }
            }
        }catch(e){
            console.log(e)
        }

        setTasksStoraged(arr);
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

    const deleteOldHistory = ()=>{
        const compareDate = new Date();
        compareDate.setDate(compareDate.getDate() - 7);
        let arr = [...tasksStoraged];

        arr = arr.filter( val => {
            let date = new Date(val.date);
            return compareDate.getTime() <= date.getTime() || !val.status;
        });

        setTasksStoraged(arr);
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

    useEffect(() => {
        let s = tasksStoraged.filter((val)=> val.status);
        let ns = tasksStoraged.filter((val)=> !val.status);
        setSincronized(s);
        setNotSincronized(ns);
    },[tasksStoraged])

    return (
        <View style={styles.container}>

            <Pressable style={[styles.btn_pendent]} onPress={()=>setIsOpenModal(!isOpenModal)}>
                <Text style={styles.amount}>{notSincronized.length?notSincronized.length:""}</Text>

                {notSincronized.length || !isConnected
                    ? <ICloudUpload style={isConnected?[styles.icon_on]:[styles.icon_on,styles.of]}/>
                    : <IHistory style={isConnected?[styles.icon_on]:[styles.icon_on,styles.of]}/>
                }
            </Pressable>

            <Modal visible={isOpenModal} transparent={true} animationType="fade">
                <View style={styles.modal}>
                    <Pressable onPress={()=>setIsOpenModal(!isOpenModal)} style={styles.closeModal}/>
                    <View style={styles.modal_content_wrap}>

                        <ScrollView style={styles.tasks_wrap}>
                            {notSincronized.length ?
                                <View style={styles.modal_header}>
                                    <Text style={styles.title_2}>Aguardando conexão</Text>
                                    <Pressable onPress={sincronize} style={styles.btm_refresh} android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}>
                                        {sinclonizeLoading}
                                    </Pressable>
                                </View>
                                :<></>
                            }

                            {notSincronized.map((val,key)=>{

                                if(!val.status){
                                    return (
                                        <View key={key} style={styles.tasks}>
                                            <Text style={styles.task_title}>{val?.title}</Text>

                                            <Text style={styles.task_title}>
                                                {formatDate(val?.date, true)}
                                            </Text>
                                        </View>
                                    )
                                }
                            })}

                            <View style={[styles.modal_header, styles.modal_header_2]}>
                                <Text style={styles.title_2}>
                                    Ultimas atividades  concluidas
                                </Text>
                            </View>

                            <View style={styles.modal_itens_wrap}>
                                {sincronized.map((val,key)=>{
                                    if(val.status){
                                        return (
                                            <View key={key} style={styles.tasks}>
                                                <Text style={styles.task_title}>{val?.title}</Text>

                                                <Text style={styles.task_title}>
                                                    {formatDate(val?.date, true)}
                                                </Text>
                                            </View>
                                        )
                                    }
                                })}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
