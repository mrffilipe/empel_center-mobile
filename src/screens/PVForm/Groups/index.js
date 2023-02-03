import React from 'react';
import styles from '../styles';
import ITrash from "../../../assets/icons/trash";
import InputMask from "../../../components/Form/InputMask";
import InputText from "../../../components/Form/InputText";
import Select from "../../../components/Form/Select";
import Checkbox from "../../../components/Form/Checkbox";
import selectOptions from "../../../data/selectOptions.json";
import {View, Text, Pressable, Alert} from "react-native";

const deleteOne = async(index, groups, setGroups , confirmDeleteGroup)=>{
    let arr = [...groups];
    if(!await confirmDeleteGroup(`Deletar grupo da unidade ${arr[index].isGenerator?"Geradora":"Consumidora"}?`))
        return;

    arr = arr.filter((obj, key)=> key !== index);

    setGroups(arr);

}

export function UnitGroupB({key,groups, setGroups, invalid, confirmDeleteGroup}){

    const insertValue = async(value,objName)=>{
        let arr = [...groups];
        if(objName === "precoPorKWH")
            value = await confirmFinalValue(value,arr[key][objName]);

        arr[key][objName] = value;
        setGroups(arr);
    }

    const confirmFinalValue = (val,lastValue)=>{
        return new Promise((resolve)=>{
            let valInt = parseFloat(val.replace(",","."));
            let lastInt = lastValue? parseFloat(lastValue.replace(/\./g,"").replace(",",".")) : 0;
            if(valInt > 2 && valInt > lastInt) {

                Alert.alert(
                    "Valor final "+val+" kWh",
                    "Este valor está correto?",
                    [
                        {
                            text:"Sim",
                            onPress:()=> resolve(val)
                        },
                        {
                            text:"Não",
                            onPress:()=> resolve(lastValue),
                            type:"default"
                        }
                    ],
                    {
                        cancelable: true,
                        onDismiss:()=> resolve(lastValue)
                    }
                )
            }else{
                resolve(val);
            }
                        
        })
        
    }

    return (
        <View style={styles.uc}>
            {/* ADICIONAR NÚMERO DA UNIDADE CRIADA */}
            <View style={styles.group_title}>
                <Text style={styles.subtitle_2}>Grupo B</Text>
                <Pressable onPress={()=>deleteOne(key, groups, setGroups, confirmDeleteGroup)}>
                    <ITrash style={styles.icon_trash}/>
                </Pressable>
            </View>
            
            <InputMask
                keyboardType="number-pad"
                label="Média de consumo (kWh)"
                invalid={invalid?.input === groups[key]["mediaConsumo"] ? invalid?.message : null}
                value={groups[key]["mediaConsumo"]}
                setValue={insertValue}
                name="mediaConsumo"
            />

            <InputText
                keyboardType="number-pad"
                label="Preço (kWh)"
                invalid={invalid?.input === groups[key]["precoPorKWH"] ? invalid?.message : null}
                value={groups[key]["precoPorKWH"]}
                setValue={insertValue}
                name="precoPorKWH"
            />

        </View>
    );
}

export function UnitGroupA({key,groups, setGroups, invalid, confirmDeleteGroup}) {

    const insertValue = (value,objName)=>{
        let arr = [...groups];
        arr[key][objName] = value;
        setGroups(arr);
    }

    return (
        <View style={styles.uc}>
            {/* ADICIONAR NÚMERO DA UNIDADE CRIADA, ex: Grupo A #2 */}
            <View style={styles.group_title}>
                <Text style={styles.subtitle_2}>Grupo A</Text>
                <Pressable onPress={()=>deleteOne(key, groups, setGroups, confirmDeleteGroup)}>
                    <ITrash style={styles.icon_trash}/>
                </Pressable>
            </View>

            <InputMask
                keyboardType="number-pad"
                label="Ponta (kWh/mês)"
                invalid={invalid?.input === groups[key]["pontaKWH"] ? invalid?.message : null}
                value={groups[key]["pontaKWH"]}
                setValue={insertValue}
                name="pontaKWH"
            />
            
            <InputMask
                keyboardType="number-pad"
                label="Ponta (R$/kWh)"
                invalid={invalid?.input === groups[key]["pontaRS"] ? invalid?.message : null}
                value={groups[key]["pontaRS"]}
                setValue={insertValue}
                name="pontaRS"
                mask="BRL_CURRENCY"
            />

            <InputMask
                keyboardType="number-pad"
                label="Fora ponta (kWh/mês)"
                invalid={invalid?.input === groups[key]["foraPontaKWH"] ? invalid?.message : null}
                value={groups[key]["foraPontaKWH"]}
                setValue={insertValue}
                name="foraPontaKWH"
            />

            <InputMask
                keyboardType="number-pad"
                label="Fora ponta (R$/kWh)"
                invalid={invalid?.input === groups[key]["foraPontaRS"] ? invalid?.message : null}
                value={groups[key]["foraPontaRS"]}
                setValue={insertValue}
                name="foraPontaRS"
                mask="BRL_CURRENCY"
            />

            <InputMask
                keyboardType="number-pad"
                label="Hora (kWh/mês)"
                invalid={invalid?.input === groups[key]["horaKWH"] ? invalid?.message : null}
                value={groups[key]["horaKWH"]}
                setValue={insertValue}
                name="horaKWH"
            />

            <InputMask
                keyboardType="number-pad"
                label="Hora (R$/kWh)"
                invalid={invalid?.input === groups[key]["horaRS"] ? invalid?.message : null}
                value={groups[key]["horaRS"]}
                setValue={insertValue}
                name="horaRS"
                mask="BRL_CURRENCY"
            />

            <InputMask
                keyboardType="number-pad"
                label="Demanda (kWh/mês)"
                invalid={invalid?.input === groups[key]["demandaKWH"] ? invalid?.message : null}
                value={groups[key]["demandaKWH"]}
                setValue={insertValue}
                name="demandaKWH"
            />

            <InputMask
                keyboardType="number-pad"
                label="Demanda (R$/kWh)"
                invalid={invalid?.input === groups[key]["demandaRS"] ? invalid?.message : null}
                value={groups[key]["demandaRS"]}
                setValue={insertValue}
                name="demandaRS"
                mask="BRL_CURRENCY"
            />

            <Checkbox
                label="Desconto irrigante"
                value={groups[key]["desconto"]}
                setValue={insertValue}
                name="desconto"
            />

        </View>
    );
}