import styles from "../../../components/Dragables/styles";
import React from "react";
import {View, Text, Pressable} from "react-native";
import IDetails from "../../../assets/icons/details";
export default function Table({data, navigate}) {
    return (
        <View style={styles.container}>

            <View style={styles.list}>
                {data.map((value,key)=>{
                    let status = value.status === 1 
                    ? {name:"Orçamento",color:"red"} 
                    : value.status === 2 ? {name:"Proposta Enviada",color:"dark_blue"} 
                    : value.status === 3 ? {name:"Negocição",color:"orange"} 
                    : {name:"Finalizado",color:"green"};

                    return(
                        <View
                        onDragEnd={(e)=>handleDragEnd(e,value,index)} 
                        draggable={true} 
                        key={key} 
                        style={styles.list_wrap}>

                            <View style={styles.info}>
                                <View>
                                    <View style={styles.text_wrap}>
                                        <Text style={[styles.h5, styles.h5_content]}>Vendedor: </Text>
                                        <Text style={styles.h5}>{value?.seller}</Text>
                                    </View>

                                    <View style={styles.text_wrap}>
                                        <Text style={[styles.h5, styles.h5_content]}>Cliente: </Text>
                                        <Text style={styles.h5}>{value?.customer}</Text>
                                    </View>
                                </View>

                                <View>
                                    <Text style={[styles.status,styles[status.color]]}>{status.name}</Text>
                                </View>
                            </View>
                        

                            <View style={styles.actions} >
                                <View>
                                    <Text style={[styles.small,styles.category]}>{value?.category}</Text>
                                </View>

                                <View>
                                    <Text style={styles.small}>{value?.date}</Text>
                                </View>

                                <View>
                                    <Pressable 
                                    onPress={()=>navigate({
                                        name: 'Detalhes do orçamento',
                                        params: { id: value.id },
                                        // merge: true,
                                    })} >
                                        <IDetails style={styles.icon}/>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    )
                })}

            </View>
        </View>
    )
}

