import React from 'react';
import styles from '../styles';
import {View, Text, Pressable}  from "react-native";
import IPlus from "../../../assets/icons/plus";
import ILess from "../../../assets/icons/less";
export default function ConsumerUnity({groups,setGroups,UnitGroupA, UnitGroupB, setOpenConfirm, invalid, confirmDeleteGroup}){
    
    const groupModelA = {
        "groupA":true,
        "name":"",
        "tipoDeInstalacao":"",
        "isGenerator":false,
        "pontaKWH":"",
        "pontaRS":"",
        "foraPontaKWH":"",
        "foraPontaRS":"",
        "horaKWH":"",
        "horaRS":"",
        "demandaKWH":"",
        "demandaRS":"",
        "desconto":false
    }
    
    const groupModelB = {
        "groupB":true,
        "name":"",
        "tipoDeInstalacao":"",
        "isGenerator":false,
        "mediaConsumo":"",
        "precoPorKWH":""
    }

    const addGroupA = () => {
        setGroups([...groups, groupModelA]);
    }

    const addGroupB = () => {
        setGroups([...groups, groupModelB]);
    }


    const clearGroups = async() => {
        if(!await confirmDeleteGroup(`Deletar todos as unidade Consumidoras?`))
            return;

        let arr = [...groups];
        arr = arr.filter(val => val.isGenerator);
        setGroups(arr);
    }

    return(
        <View>
            <View style={styles.ucs}>
                <Text style={styles.subtitle}>Unidades consumidoras</Text>
                <Text style={styles.small}>(Opcional)</Text>
                {/* {groups.length === 0 ? <Text style={styles.small}>Adicione pelo menos uma UC</Text> : <></>} */}
                {groups.map((group, key) =>{ 
                    
                    if(!group.isGenerator){
                        return (
                            group.groupA
                                ? <View style={styles.costs_wrap} key={key}>{UnitGroupA({key,groups,setGroups, invalid, confirmDeleteGroup})}</View>
                                : <View style={styles.costs_wrap} key={key}>{UnitGroupB({key,groups,setGroups, setOpenConfirm, invalid, confirmDeleteGroup})}</View>
                        )
                    }
                })}
            </View>

            <View style={styles.addUcs}>
                {/* <Pressable 
                android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}
                style={styles.btn_group} 
                onPress={addGroupA}>
                    <IPlus style={styles.icon}/>
                    <Text style={styles.btn_text}>Grupo A</Text>
                </Pressable> */}
                <Pressable 
                android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}
                style={styles.btn_group}
                onPress={addGroupB}>
                    <IPlus style={styles.icon}/>
                    <Text style={styles.btn_text}>Grupo B</Text>
                </Pressable>

                <Pressable 
                android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}
                style={groups.filter(val => val.isGenerator === false).length
                    ? [styles.btn_group,styles.btn_clear]
                    : [styles.btn_group,styles.btn_clear,styles.desabled]} 
                onPress={groups.filter(val => val.isGenerator === false).length?clearGroups:()=>{}}>
                    <ILess style={[styles.icon,styles.btn_clear_icon]}/>
                    <Text style={styles.btn_text}>Limpar</Text>
                </Pressable>
            </View>

        </View>
    )
}
