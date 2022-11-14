import styles from "./styles";
import React, {useState, useEffect} from "react";
import {View, Text, ScrollView, TouchableOpacity} from "react-native";
import InputText from "../../components/Form/InputText";
import InputMask from "../../components/Form/InputMask";
import Button from "../../components/Form/ButtonSubmit";
import TableA from "./TableA";
import IHistory from "../../assets/icons/history";
import Documents from "../../components/Modal/Documents";
import IDownload from "../../assets/icons/download";
import GenerateProposal from "./GenerateProposal";
export default function BudgetDetail({navigation}) {
    const [atualStatus, setAtualStatus] = useState("");
    const [dataGroupA, setDataGroupA] = useState([]);
    const [dataGroupB, setDataGroupB] = useState([]);
    const [dataGenerate, setDataGenerate] = useState([])
    const [isOpenModalHistory, setIsOpenModalHistory] = useState(false);

    const [documents, setDocuments] = useState([])
    const [files, setFiles] = useState([]);

    const handleSubmit = ()=>{

    }

    const viewProposal = ()=>{

    }

    const data = [
        {
            group: 'A',
            isGenerator:false,
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
        },
        {
            group: 'B',
            isGenerator:false,
            id:2,
            medidaConsumo:1800.00+" kWh",
            valorFinal:200.00 +" kWh",
            fornecimento:"Mofásico",
            precoPorKWH:"R$ 20,00"
        },
        {
            group: 'B',
            isGenerator:true,
            id:3,
            medidaConsumo:1800.00+" kWh",
            valorFinal:200.00 +" kWh",
            fornecimento:"Mofásico",
            precoPorKWH:"R$ 20,00"
        }
    ]

    const filesSaved = []

    useEffect(()=>{
        setDataGroupA(data.filter(val => !val.isGenerator && val.group === "A"));
        setDataGroupB(data.filter(val => !val.isGenerator && val.group === "B"));
        setDataGenerate(data.filter(val => val.isGenerator));
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
                            <View style={[styles.actions_wrap,styles.actions_wrap_2]}>
                                <Text style={styles.category}>Fotovoltaica</Text>
                                <Text style={atualStatus === "Finalizado!"?[styles.status,styles.green]:[styles.status]}>{atualStatus}</Text>
                            </View>

                            <View style={[styles.actions_wrap]}>
                                <GenerateProposal/>
                                {/* <Button styles={[styles.btn,styles.btn_send]} value={"Enviar Proposta"} /> */}
                                <TouchableOpacity style={[styles.btn_history]} onPress={()=>setIsOpenModalHistory(!isOpenModalHistory)}>
                                    <IHistory style={styles.icon_history}/>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={styles.info_wrap}>
                            <View style={styles.info_single}>
                                <InputText
                                    label="Data de envio"
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
                                    value={"felipe@gmail.comkjgf"}
                                    editable={false}
                                /> 
                            </View>                        
                        </View>

                        <Text style={styles.h2}>Unidade geradora/consumidora</Text>

                        <View style={styles.info_wrap}>
                            <View style={styles.info_single}>
                                <InputMask
                                    label="ID da unidade/Referencia"
                                    value={"#1238378"}
                                    editable={false}
                                />  
                            </View>

                            
                            <View style={styles.info_single}>
                                <InputText
                                    label="Taxa de luz minima (kWh)"
                                    editable={false}
                                    value={"1,22"}
                                />
                            </View>

                            
                            <View style={styles.info_single}>
                                <InputText
                                    label="Produção extra"
                                    editable={false}
                                    value={"2%"}
                                />
                            </View>

                            <View style={styles.info_single}>
                                <InputText
                                    label="Endereço de instalação"
                                    editable={false}
                                    value={"Pires do Rio"}
                                />
                            </View>

                            <View style={styles.info_single}>
                                <InputText
                                    label="Zona"
                                    editable={false}
                                    value={"Urbana"}
                                />
                            </View>

                            <View style={styles.info_single}>
                                <InputText
                                    label="Local da instalação"
                                    editable={false}
                                    value={"Telhado"}
                                />
                            </View>

                            <View style={styles.info_single}>
                                <InputText
                                    label="transformador existente"
                                    editable={false}
                                    value={"2 kVA"}
                                />
                            </View>
                        </View>
                        <TableA data={dataGenerate} title={"Grupo "+dataGenerate[0]?.group}/>

                        <Text style={styles.h2}>Unidades consumidoras</Text>
                        
                        <TableA data={dataGroupA} title="Grupo A"/>
                        <TableA data={dataGroupB} title="Grupo B"/>

                        <Text style={styles.h2}>Documentos ({filesSaved.length})</Text>

                        <View style={styles.files_wrap}>
                            {filesSaved.map((val,key)=>{
                                // arquivos para downsload
                                return (
                                    <View key={key} style={styles.file_single}>
                                        <TouchableOpacity>
                                            <IDownload style={styles.icon_download} />
                                        </TouchableOpacity>
                                        <Text style={styles.p}>{val.label}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        
                    </View>

                    {/* <AsideHistory/> */}

                </View>
            </View>
        </ScrollView>
    )
}
