import React from 'react';
import styles from "../styles";
import styles2 from "./styles";
import Checkbox from "../../../components/Form/Checkbox";
import InputText from "../../../components/Form/InputText";
import Textarea from "../../../components/Form/Textarea";
import ITrash from "../../../assets/icons/trash";
import IPlus from "../../../assets/icons/plus";
import {View, Text, Pressable, TouchableOpacity} from "react-native";
export default function Extras({
    observation,
    setObservation,
    demand,
    setDemand,
    customizedDemand, 
    setCustomizedDemand,
    invalid,
}){

    const plusDemand = (e)=>{
        e.preventDefault();
        let d = [...demand];

        setDemand([...d,""]);
    }

    const deletDemand = (e)=>{
        e.preventDefault();
        let d = [...demand];
        d.length = d.length - 1;
        setDemand([...d]);
    }

    return(
        <View>
            
            {/* <View style={styles2.demand}>
                <Text style={[styles.subtitle,styles.subtitle_first]}>Demanda</Text>

                <Checkbox
                    label="Demanda Customizada"
                    value={customizedDemand}
                    setValue={setCustomizedDemand}
                />

                {demand.map((val,key)=>{

                    const addDemand = (value)=>{
                        let d = [...demand];
                        d[key] = value;
                        setDemand(d);
                    }
                    var demandKey = key+1;

                    return(
                        <View key={key} style={styles2.demand_wrap}>
                            <InputText
                                label={customizedDemand ? "Valor da demanda" : "Mês "+ demandKey}
                                keyboardType="number-pad"
                                value={val}
                                setValue={addDemand}
                                invalid={invalid?.input === val ? invalid?.message : null}
                            />

                            {demand.length > 1 && key === demand.length - 1 ?
                                <TouchableOpacity style={styles2.delete} onPress={deletDemand}><ITrash style={[styles.icon, styles2.red]}/></TouchableOpacity>
                                :<></>
                            }
                        </View>
                    )
                })}

                {!customizedDemand && demand.length < 13 ?
                    <View style={styles.addUcs}>
                        <Pressable 
                            android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}
                            style={styles.btn_group} 
                            onPress={plusDemand}>

                            <IPlus style={styles.icon}/>
                            <Text style={styles.btn_text}>Mês {demand.length + 1}</Text>
                            
                        </Pressable>
                    </View>

                    :<></>
                }
            </View> */}

            <View style={styles2.observation_wrap}>
                <Text style={[styles.subtitle,styles.subtitle_first]}>Observação</Text>
                <Textarea 
                    value={observation} 
                    label={"(Opcional)"} 
                    setValue={setObservation}  />
            
            </View>

        </View>
    )
}