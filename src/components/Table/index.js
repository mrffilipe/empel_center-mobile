import styles from "./styles";
import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import AllClear from "../AllClear";
import ITrash from "icons/trash";

const fildsProps = [
    {
        label:String,
        key:String,
        onPress:Function,
        onPressReturn: String,
    },
]

const actionsProps = [
    {
        name:String,
        onPress:Function,
        onPressReturn:String,
        onPressReturn2:String,
        color:String,
    }
]

const props = {
    data: Array,
    filds:fildsProps,
    actions: actionsProps
}
export default function Table({data = [], filds = [], actions = []} = props) {

    
    return (
        <View style={[styles.container]}>
            <View style={styles.container_length}>
                <Text style={styles.h2}>
                    Resultados ({data.length})
                </Text>
            </View>
            <View style={[styles.list]}>
                {data.length ?
                    data.map((val,key)=>{
                        return(
                            <View
                            key={key} 
                            style={[styles.info]}>

                                <View>
                                    <View style={styles.table_wrap}>
                                        {filds.map((value, index) =>{
                                            
                                            return(
                                                <View style={styles.text_wrap} key={index}>
                                                    {value.onPress ?
                                                        <>
                                                            <Text style={[styles.h5]}>{value?.label}: </Text>
                                                            <TouchableOpacity style={styles.content_wrap} onPress={()=>value.onPress(value?.onPressReturn)}>
                                                                <Text style={[styles.h5,styles.h5_content,styles.right]}>{val[value.key]}</Text>
                                                            </TouchableOpacity>
                                                        </>
                                                        :
                                                        <>
                                                            <Text style={[styles.h5]}>{value.label}: </Text>

                                                            <Text style={[styles.h5,styles.h5_content,styles.right,styles.not_link]}>{val[value.key]}</Text>
                                                        </>
                                                    }
                                                </View>
                                            )

                                        })}


                                        <View style={styles.text_wrap}>
                                            {actions.map((value,index)=>{
                                                return(
                                                    <TouchableOpacity style={[styles.btn,styles[value.color]]} onPress={()=>value?.onPress(val[value?.onPressReturn],val[value?.onPressReturn2])} key={index}>
                                                        {value.color === "red" 
                                                            ? <ITrash style={styles.icon}/>
                                                            : <></>
                                                        }
                                                        <Text style={styles.btn_text}>{value.name}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })}

                                        </View>

                                    </View>

                                </View>
                            </View>
                        )
                    })
                    :<AllClear msg={"Sem informações aqui!"}/>
                }

            </View>
        </View>
    )
}

