import styles from "../../../components/Dragables/styles";
import styles2 from "./styles";
import React from "react";
import {View, Text} from "react-native";
import AllClear from "../../../components/AllClear";
export default function Table({data = [], title}) {
    return (
        <View style={[styles.container,styles2.container]}>
            <Text style={styles2.title}>{title}</Text>

            <View style={[styles.list,styles2.list]}>
                {data.length ?
                    data.map((value,key)=>{
                        return(
                            <View
                            key={key} 
                            style={[styles.list_wrap,styles2.info]}>

                                <View style={[styles.info]}>
                                    <View style={styles2.table_wrap}>
                                        {/* GRUPO A */}

                                        {value.pontaKWH && 
                                            <View style={styles2.text_wrap}>
                                                <Text style={[styles2.h5,styles.h5,styles.h5_content]}>TIPO: </Text>
                                                <Text style={[styles.h5,styles2.h5,styles2.black]}>KWH/MÊS</Text>
                                                <Text style={[styles.h5,styles2.h5,styles2.right,styles2.black]}>R$/KWH</Text>
                                            </View>
                                        }

                                        {value.pontaKWH && 
                                            <View style={styles2.text_wrap}>
                                                <Text style={[styles2.h5,styles.h5,styles.h5_content]}>Ponta: </Text>
                                                <Text style={[styles.h5,styles2.h5]}>{value.pontaKWH.toFixed(2).replace(".",",")}</Text>
                                                <Text style={[styles.h5,styles2.h5,styles2.right]}>{value.pontaRS.toFixed(2).replace(".",",")}</Text>
                                            </View>
                                        }
                                        {value.foraPontaKWH && 
                                            <View style={styles2.text_wrap}>
                                                <Text style={[styles2.h5,styles.h5,styles.h5_content]}>Fora Ponta:</Text>
                                                <Text style={[styles.h5,styles2.h5]}>{value.foraPontaKWH.toFixed(2).replace(".",",")}</Text>
                                                <Text style={[styles.h5,styles2.h5,styles2.right]}>{value.foraPontaRS.toFixed(2).replace(".",",")}</Text>
                                            </View>
                                        }
                                        {value.horaKWH && 
                                            <View style={styles2.text_wrap}>
                                                <Text style={[styles2.h5,styles.h5,styles.h5_content]}>Hora: </Text>
                                                <Text style={[styles.h5,styles2.h5]}>{value.horaKWH.toFixed(2).replace(".",",")}</Text>
                                                <Text style={[styles.h5,styles2.h5,styles2.right]}>{value.horaRS.toFixed(2).replace(".",",")}</Text>
                                            </View>
                                        }
                                        {value.demandaKWH && 
                                            <View style={styles2.text_wrap}>
                                                <Text style={[styles2.h5,styles.h5,styles.h5_content]}>Demanda: </Text>
                                                <Text style={[styles.h5,styles2.h5]}>{value.demandaKWH.toFixed(2).replace(".",",")}</Text>
                                                <Text style={[styles.h5,styles2.h5,styles2.right]}>{value.demandaRS.toFixed(2).replace(".",",")}</Text>
                                            </View>
                                        }
                                        {value.desconto !== undefined && 
                                            <View style={[styles2.text_wrap,styles2.marginTop]}>
                                                <Text style={[styles2.h5,styles.h5,styles.h5_content,styles2.flex1]}>DESCONTO IRRIGANTE: </Text>
                                                <Text style={[styles.h5,styles2.h5,styles2.right]}>{value.desconto?"Sim":"Não"}</Text>
                                                {/* <Text style={[styles.h5,styles2.h5,styles2.right]}></Text> */}
                                            </View>
                                        }

                                        {/* GRUPO B */}

                                        {value?.medidaConsumo !== undefined && 
                                            <View style={[styles2.text_wrap]}>
                                                <Text style={[styles2.h5,styles.h5,styles.h5_content]}>MEDIDA DE CONSUMO: </Text>
                                                <Text style={[styles.h5,styles2.h5,styles2.right]}>{value.medidaConsumo}</Text>
                                            </View>
                                        }
                                        {value?.valorFinal !== undefined && 
                                            <View style={[styles2.text_wrap]}>
                                                <Text style={[styles2.h5,styles.h5,styles.h5_content]}>VALOR FINAL: </Text>
                                                <Text style={[styles.h5,styles2.h5,styles2.right]}>{value.valorFinal}</Text>
                                            </View>
                                        }
                                        {value?.precoPorKWH !== undefined && 
                                            <View style={[styles2.text_wrap]}>
                                                <Text style={[styles2.h5,styles.h5,styles.h5_content]}>PREÇO POR kWh: </Text>
                                                <Text style={[styles.h5,styles2.h5,styles2.right]}>{value.precoPorKWH}</Text>
                                            </View>
                                        }

                                        {value?.fornecimento !== undefined && 
                                            <View style={[styles2.text_wrap]}>
                                                <Text style={[styles2.h5,styles.h5,styles.h5_content]}>FORNECIMENTO: </Text>
                                                <Text style={[styles.h5,styles2.h5,styles2.right]}>{value.fornecimento}</Text>
                                            </View>
                                        }

                                        {/* VALORES ADICIONAIS */}

                                        {value.description !== undefined && 
                                            <View style={[styles2.text_wrap]}>
                                                <Text style={[styles2.h5,styles.h5,styles.h5_content]}>DESCRIÇÃO: </Text>
                                                <Text style={[styles.h5,styles2.h5,styles2.right,styles2.flex1]}>{value.description}</Text>
                                            </View>
                                        }
                                        {value.value !== undefined && 
                                            <View style={[styles2.text_wrap]}>
                                                <Text style={[styles2.h5,styles.h5,styles.h5_content]}>VALOR: </Text>
                                                <Text style={[styles.h5,styles2.h5,styles2.right]}>R$ {value.value.toFixed(2).replace(".",",")}</Text>
                                            </View>
                                        }

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

