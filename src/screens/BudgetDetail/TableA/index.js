import styles from "../../../components/Dragables/styles";
import styles2 from "./styles";
import React from "react";
import {View, Text} from "react-native";
import AllClear from "../../../components/AllClear";
import SelectOptions from "../../../data/selectOptions.json";
import { toMoney } from "../../../services/tools";

export default function Table({data = [], group}) {
    const fildExists = (val)=>{
        return val !== undefined && val !== "";
    }
    return (
        <View style={[styles.container,styles2.container]}>
            <Text style={styles2.title}>{group === 0 ? "Grupo A" : "Grupo B"}</Text>

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
                                        {   group === 0?
                                            <>
                                                {fildExists(value.pontaKWH) ? 
                                                    <View style={styles2.text_wrap}>
                                                        <Text style={[styles2.h5,styles.h5,styles.h5_content]}>TIPO: </Text>
                                                        <Text style={[styles.h5,styles2.h5,styles2.black]}>kWh/Mês</Text>
                                                        <Text style={[styles.h5,styles2.h5,styles2.right,styles2.black]}>R$/kWh</Text>
                                                    </View>
                                                    :<></>
                                                }

                                                {fildExists(value.pontaKWH) ? 
                                                    <View style={styles2.text_wrap}>
                                                        <Text style={[styles2.h5,styles.h5,styles.h5_content]}>PONTA: </Text>
                                                        <Text style={[styles.h5,styles2.h5]}>{toMoney(value.pontaKWH)}</Text>
                                                        <Text style={[styles.h5,styles2.h5,styles2.right]}>{toMoney(value.pontaRS)}</Text>
                                                    </View>
                                                    :<></>
                                                }
                                                {fildExists(value.foraPontaKWH) ? 
                                                    <View style={styles2.text_wrap}>
                                                        <Text style={[styles2.h5,styles.h5,styles.h5_content]}>FORA PONTA:</Text>
                                                        <Text style={[styles.h5,styles2.h5]}>{toMoney(value.foraPontaKWH)}</Text>
                                                        <Text style={[styles.h5,styles2.h5,styles2.right]}>{toMoney(value.foraPontaRS)}</Text>
                                                    </View>
                                                    :<></>
                                                }
                                                {fildExists(value.horaKWH)  ? 
                                                    <View style={styles2.text_wrap}>
                                                        <Text style={[styles2.h5,styles.h5,styles.h5_content]}>HORA: </Text>
                                                        <Text style={[styles.h5,styles2.h5]}>{toMoney(value.horaKWH)}</Text>
                                                        <Text style={[styles.h5,styles2.h5,styles2.right]}>{toMoney(value.horaRS)}</Text>
                                                    </View>
                                                    :<></>
                                                }
                                                {fildExists(value.demandaKWH) ? 
                                                    <View style={styles2.text_wrap}>
                                                        <Text style={[styles2.h5,styles.h5,styles.h5_content]}>DEMANDA: </Text>
                                                        <Text style={[styles.h5,styles2.h5]}>{toMoney(value.demandaKWH)}</Text>
                                                        <Text style={[styles.h5,styles2.h5,styles2.right]}>{toMoney(value.demandaRS)}</Text>
                                                    </View>
                                                    :<></>
                                                }
                                                {fildExists(value.desconto) ? 
                                                    <View style={[styles2.text_wrap,styles2.marginTop]}>
                                                        <Text style={[styles2.h5,styles.h5,styles.h5_content,styles2.flex1]}>DESCONTO IRRIGANTE: </Text>
                                                        <Text style={[styles.h5,styles2.h5,styles2.right]}>{value.desconto?"Sim":"Não"}</Text>
                                                        {/* <Text style={[styles.h5,styles2.h5,styles2.right]}></Text> */}
                                                    </View>
                                                    :<></>
                                                }
                                            </>
                                            :
                                            <>
                                                {/* GRUPO B */}

                                                {fildExists(value?.mediaConsumo) ? 
                                                    <View style={[styles2.text_wrap]}>
                                                        <Text style={[styles2.h5,styles.h5,styles.h5_content]}>MEDIDA DE CONSUMO: </Text>
                                                        <Text style={[styles.h5,styles2.h5,styles2.right]}>{toMoney(value.mediaConsumo)} kWh</Text>
                                                    </View>
                                                    :<></>
                                                }
                                                {fildExists(value?.valorFinal) ? 
                                                    <View style={[styles2.text_wrap]}>
                                                        <Text style={[styles2.h5,styles.h5,styles.h5_content]}>VALOR FINAL: </Text>
                                                        <Text style={[styles.h5,styles2.h5,styles2.right]}>{value.valorFinal}</Text>
                                                    </View>
                                                    :<></>
                                                }
                                                {fildExists(value?.precoPorKWH) ? 
                                                    <View style={[styles2.text_wrap]}>
                                                        <Text style={[styles2.h5,styles.h5,styles.h5_content]}>PREÇO: </Text>
                                                        <Text style={[styles.h5,styles2.h5,styles2.right]}>{toMoney(value.precoPorKWH)} R$/kWh</Text>
                                                    </View>
                                                    :<></>
                                                }

                                                {fildExists(value?.fornecimento) ? 
                                                    <View style={[styles2.text_wrap]}>
                                                        <Text style={[styles2.h5,styles.h5,styles.h5_content]}>FORNECIMENTO: </Text>
                                                        <Text style={[styles.h5,styles2.h5,styles2.right]}>{SelectOptions.instalationType[value?.fornecimento]}</Text>
                                                    </View>
                                                    :<></>
                                                }

                                                {/* VALORES ADICIONAIS */}

                                                {fildExists(value.description) ? 
                                                    <View style={[styles2.text_wrap]}>
                                                        <Text style={[styles2.h5,styles.h5,styles.h5_content]}>DESCRIÇÃO: </Text>
                                                        <Text style={[styles.h5,styles2.h5,styles2.right,styles2.flex1]}>{value.description}</Text>
                                                    </View>
                                                    :<></>
                                                }
                                                {fildExists(value.value) ? 
                                                    <View style={[styles2.text_wrap]}>
                                                        <Text style={[styles2.h5,styles.h5,styles.h5_content]}>VALOR: </Text>
                                                        <Text style={[styles.h5,styles2.h5,styles2.right]}>R$ {toMoney(value.value)}</Text>
                                                    </View>
                                                    :<></>
                                                }
                                                </>
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

