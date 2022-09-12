import styles from "./styles";
import React, {useState, useEffect} from "react";
import {View, Text, ScrollView, Pressable} from "react-native";
import InputText from "../../components/Form/InputText";
import InputMask from "../../components/Form/InputMask";
import Button from "../../components/Form/ButtonSubmit";
import TableA from "./TableA";
export default function BudgetDetail({navigation}) {
    const [atualStatus, setAtualStatus] = useState("");
    const [dataGroupA, setDataGroupA] = useState([]);
    const [dataGroupB, setDataGroupB] = useState([]);
    const [dataGroupC, setDataGroupC] = useState([]);


    const data1 = [
        {
            id:1,
            pontaKWH:20.22,
            pontaRS:200.00,
            foraPontaKWH:2000.00,
            foraPontaRS:333,
            horaKWH:4000,
            horaRS:2000,
            demandaKWH:200,
            demandaRS:200,
            desconto:1,
        }
    ]

    const data2 = [
        {
            id:1,
            medidaConsumo:1800.00,
            valorFinal:200.00,
            fornecimento:"Pires do Rio",
            local:"Pires do Rio",
            extra:5+"00,50",
        },
        {
            id:1,
            medidaConsumo:1800.00,
            valorFinal:200.00,
            fornecimento:"Pires do Rio",
            local:"Pires do Rio",
            extra:5+"",
        }
    ]

    const data3 = [
        {
            id:1,
            description: "Distancia ate o local",
            value:200.00
        },
        {
            id:2,
            description: "Distancia ate o local",
            value:200.00
        }
    ]

    useEffect(()=>{
        setDataGroupA(data1);
        setDataGroupB(data2);
        setDataGroupC(data3); 
    },[])

    const statusData = [
        {
            name:"Formulario enviado!",
            date:"04/08/2022",
            finish:1
        },
        {
            name:"Orçamento criado!",
            date:"04/08/2022",
            finish:1
        },
        {
            name:"Proposta enviada!",
            date:"04/08/2022",
            finish:1
        },
        {
            name:"Em negociação!",
            date:"04/08/2022",
            finish:0
        },
        {
            name:"Finalizado!",
            date:"04/08/2022",
            finish:0
        },
    ];

    useEffect(()=>{
        statusData.map((val)=>{
            if(val.finish === 1){
                setAtualStatus(val.name);
            }
        })
    },[])

    return (
        <ScrollView style={styles.budget_detail}>

            <View style={styles.container}>
                <View style={styles.main}>
                    <View>
                        <View style={[styles.actions_wrap_1,styles.margin]}>
                            <Text style={styles.category}>Fotovoltaica</Text>
                            <Text style={atualStatus === "Finalizado!"?[styles.status,styles.green]:[styles.status]}>{atualStatus}</Text>

                            <View style={[styles.actions_wrap_1,styles.actions_wrap]}>
                                <Button onPress={()=>navigation.navigate("Proposta")} styles={styles.btn} value={"Visualizar Proposta"} />
                                <Button styles={[styles.btn,styles.btn_send]} value={"Enviar Proposta"} />
                            </View>
                        </View>


                        <View style={styles.info_wrap}>
                            <View style={styles.info_single}>
                                <InputText
                                    label="Data"
                                    value={"03/08/2022"}
                                    editable={false}
                                />  
                            </View>
                            
                            <View style={styles.info_single}>
                                <InputText
                                    label="Vendedor"
                                    editable={false}
                                    value={"Bruno"}
                                />
                            </View>
                            
                            <View style={styles.info_single}>
                                <InputText
                                    label="Cliente"
                                    editable={false}
                                    value={"Felipe"}
                                />
                            </View>
                          
                            <View style={styles.info_single}>
                                <InputMask
                                    label="CPF / CNPJ do Cliente"
                                    value={"999.999.999-99"}
                                    editable={false}
                                />
                            </View>
                           
                            <View style={styles.info_single}>
                                <InputMask
                                    label="Telefone"
                                    value={"(99) 99999-9999"}
                                    editable={false}
                                />  
                            </View>
                            
                            <View style={styles.info_single}>
                               <InputMask
                                    label="E-mail"
                                    value={"felipe@gmail.com"}
                                    editable={false}
                                /> 
                            </View>
                            
                            <View style={styles.info_single}>
                                <InputMask
                                    label="Distancia "
                                    value={"50 KM"}
                                    editable={false}
                                />
                            </View>
                            
                            <View style={styles.info_single}>
                                <InputMask
                                    label="ID da unidade geradora"
                                    value={"#1238378"}
                                    editable={false}
                                />  
                            </View>
                            
                                        
                        </View>
                        
                        <TableA data={dataGroupA} title="Grupo A"/>
                        <TableA data={dataGroupB} title="Grupo B"/>
                        <TableA data={dataGroupC} title="Valores adiconais"/>
                        {/* <TableB/> */}
                        {/* <TableCosts/> */}
                    </View>

                    {/* <AsideHistory/> */}

                </View>
            </View>
        </ScrollView>
    )
}
