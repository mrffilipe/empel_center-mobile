import styles from "./styles";
import React, {useState, useEffect} from "react";
import {View, Text, ScrollView} from "react-native";
import InputText from "../../components/Form/InputText";
import InputMask from "../../components/Form/InputMask";
import TableA from "./TableA";
import GenerateProposal from "./GenerateProposal";
import API from "../../services/api";
import {formatDate} from "../../services/tools";
import selectOptions from "../../data/selectOptions.json";
import {useMainContext} from "../../contexts/mainContext";
import { toMoney } from "../../services/tools";
import Loading from "../../components/Loading";
import Callback  from "../../components/Modal/Callback";
import History from "./History";
import Messages from "./Messages";
import Files from "./Files";

export default function BudgetDetail({route}) {
    const {cities} = useMainContext();

    const {id} = route.params;

    const [data, setData] = useState([]);
    const [atualStatus, setAtualStatus] = useState("");
    const [dataA, setDataA] = useState([]);
    const [dataB, setDataB] = useState([]);
    const [dataGenerator, setDataGenerator] = useState([]);
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState();

    const getBudget = async(load = true)=>{
        if(load)
            setLoading(true);

        let res = await API.get("PVForm/"+id);

        if(load)
            setLoading(false);

        if(res.error){
            return setCallback({
                type: 0,
                message:res?.error ? res.error : `Algo deu errado!`,
                action:()=>getBudget(),
                actionName:"Tentar Novamente",
            })
        }
        setAtualStatus(res?.status);
        setData(res)
    }

    const getCitie = ()=>{
        let city = dataGenerator?.address ? cities.filter(city => city.id === dataGenerator?.address)[0] : "";
        return city?.citie ? city?.citie + " - " + city?.state : "";
    }

    const customerName = data?.customer? data?.customer?.firstName + " " + data?.customer?.lastName: "";

    useEffect(()=>{
        getBudget();
    },[])

    const statusNumberFinished = (statusNumber) =>{
        return statusCode >= statusNumber ? 1 : 0;
    }

    const statusData = [
        "Orçamento criado!",
        "Proposta Enviada!",
        "Em negociação!",
        "Finalizado!"
    ]; 
    
    useEffect(()=>{
        if(data?.consumerUnits){
            let formatData = data?.consumerUnits.map((val,key)=>{
                return{
                    id:key,
                    generatorId:val?.reference,
                    group:val?.group,
                    isGenerator:val?.isGeneratingUnit,
                    installLocation:val?.installationLocation ,
                    fornecimento:val?.installationType ,
                    pontaKWH:val?.tipPowerMonth ,
                    pontaRS:val?.tipPricePowerMonth ,
                    foraPontaKWH:val?.offTipPowerMonth ,
                    foraPontaRS:val?.offTipPricePowerMonth ,
                    horaKWH:val?.hourPowerMonth ,
                    horaRS:val?.hourPricePowerMonth ,
                    demandaKWH:val?.demandPowerMonth,
                    demandaRS:val?.demandPricePowerMonth,
                    desconto:val?.irrigationDiscount ,
                    mediaConsumo:val?.powerMonth ,
                    precoPorKWH:val?.powerPriceMonth ,
                }
            })

            setDataA(formatData.filter(val => val.group === 0 && !val.isGenerator));
            setDataB(formatData.filter(val => val.group === 1 && !val.isGenerator));

            let unityGeneratorGroup = formatData.filter(val => val.isGenerator);
        
            setDataGenerator({
                generatorId:data?.consumerUnits[0].reference,
                taxaMinima:data?.lightRateValue,
                extra:data?.extraProduction,
                address:data?.idAddress,
                unidade:unityGeneratorGroup,
                installationLocation:data?.installationLocation,
                workDistance:data?.workDistance,
                greaterDemand:data?.greaterDemand,
                averageDemand:data?.averageDemand,
                installLocation:data?.installationLocation ,
                instalationType:data?.installationType ,
                note:data?.note
            });
        }
    },[data])

    return (
        <ScrollView style={styles.budget_detail}>
            {loading ? <Loading loading2={loading}/> : <></>}
            {callback? <Callback params={callback} /> : <></>}
            <View style={styles.container}>
                <View style={styles.main}>
                    <View>
                        <View style={[styles.actions_wrap_1,styles.margin]}>
                            <View style={[styles.actions_wrap,styles.actions_wrap_2]}>
                                <Text style={styles.category}>Fotovoltaica</Text>
                                <Text style={atualStatus === 3?[styles.status,styles.green]:[styles.status]}>{statusData[atualStatus]}</Text>
                            </View>

                            <View style={[styles.actions_wrap]}>
                                
                                <GenerateProposal id={id} customerName={customerName}/>
                                {/* <Button styles={[styles.btn,styles.btn_send]} value={"Enviar Proposta"} /> */}
                                {/* <TouchableOpacity style={[styles.btn_history]} onPress={()=>setIsOpenModalHistory(!isOpenModalHistory)}>
                                    <IHistory style={styles.icon_history}/>
                                </TouchableOpacity> */}
                            </View>
                        </View>


                        <View style={styles.info_wrap}>
                            <View style={styles.info_single}>
                                <InputText
                                    label="Data de envio"
                                    value={data?.createdAt?formatDate(data?.createdAt,false, true):""}
                                    editable={false}
                                />  
                            </View>
                            
                            <View style={styles.info_single}>
                                <InputText
                                    label="Vendedor"
                                    editable={false}
                                    value={data?.consultant? data?.consultant.user.firstName + " " + data?.consultant.user.lastName:""}
                                />
                            </View>
                            
                            <View style={styles.info_single}>
                                <InputText
                                    label="Cliente"
                                    editable={false}
                                    value={customerName}
                                />
                            </View>

                            <View style={styles.info_single}>
                                <InputMask
                                    label={data?.customer? `${selectOptions.documents[data.customer.document.documentType]} do clinete` : "Documento do cliente"}
                                    value={data?.customer? data?.customer.document.record:""}
                                    editable={false}
                                    mask={data?.customer? selectOptions.documents[data.customer.document.documentType].toLocaleUpperCase() : "CPF"}
                                />
                            </View>

                            <View style={styles.info_single}>
                                <InputMask
                                    label="Telefone"
                                    value={data?.customer? data?.customer?.telephones[0].number:""}
                                    editable={false}
                                    mask="BRL_PHONE"
                                />  
                            </View>
                            
                            <View style={styles.info_single}>
                                <InputMask
                                    label="E-mail"
                                    value={data?.customer? data?.customer?.email:""}
                                    editable={false}
                                /> 
                            </View>                        
                        </View>

                        <Text style={styles.h2}>Unidade geradora/consumidora</Text>

                        <View style={styles.info_wrap}>
                            <View style={styles.info_single}>
                                <InputMask
                                    label="ID da unidade/Referencia"
                                    value={dataGenerator?.generatorId}
                                    editable={false}
                                />  
                            </View>

                            
                            <View style={styles.info_single}>
                                <InputText
                                    label="Taxa de luz minima"
                                    value={dataGenerator?.taxaMinima? dataGenerator?.taxaMinima+" kWh":""}
                                    editable={false}
                                />
                            </View>

                            
                            <View style={styles.info_single}>
                                <InputText
                                    label="Produção extra"
                                    editable={false}
                                    value={dataGenerator?.extra !== undefined? toMoney(dataGenerator?.extra)+" kWh":""}
                                />
                            </View>

                            <View style={styles.info_single}>
                                <InputText
                                    label="Endereço de instalação"
                                    editable={false}
                                    value={getCitie()}
                                />
                            </View>

                            {dataGenerator?.addressType ?
                                <View style={styles.info_single}>
                                    <InputText
                                        label="Zona"
                                        editable={false}
                                        value={selectOptions.addressType[dataGenerator?.addressType]}
                                    />
                                </View>
                                :<></>
                            }

                            <View style={styles.info_single}>
                                <InputText
                                    label="Local da instalação"
                                    editable={false}
                                    value={selectOptions.instalationLocation[dataGenerator?.installationLocation]}
                                />
                            </View>

                            <View style={styles.info_single}>
                                <InputText
                                    label="Distancia"
                                    value={dataGenerator?.workDistance? dataGenerator?.workDistance+" Km" :""}
                                    editable={false}
                                /> 
                            </View>

                            {dataGenerator?.transformer ?
                                <View style={styles.info_single}>
                                    <InputText
                                        label="transformador existente"
                                        editable={false}
                                        value={dataGenerator?.transformer+" kVA"}
                                    />
                                </View>
                                :<></>
                            }

                            <View style={styles.info_single}>
                                <InputText
                                    label="Maior demanda"
                                    value={toMoney(dataGenerator?.greaterDemand)}
                                    readonly={true}
                                    open={true}
                                />  
                            </View>

                            <View style={styles.info_single}>
                                <InputText
                                    label="Demanda média"
                                    value={toMoney(dataGenerator?.averageDemand)}
                                    readonly={true}
                                    open={true}
                                />  
                            </View>

                            <View style={styles.info_single}>
                                <InputText
                                    label="Fornecimento"
                                    value={selectOptions.instalationType[dataGenerator?.instalationType]}
                                    readonly={true}
                                    open={true}
                                />  
                            </View>

                        </View>
                        <TableA data={dataGenerator?.unidade? dataGenerator?.unidade : []} group={dataGenerator?.unidade && dataGenerator?.unidade[0]?.group? dataGenerator?.unidade[0]?.group : 0}/>

                        <Text style={styles.h2}>Unidades consumidoras</Text>
                        
                        <TableA data={dataA} group={0}/>
                        <TableA data={dataB}group={1}/>

                        <Files data={data} getBudget={getBudget} />
                        
                        <History data={[]}/>

                        <Messages data={[]} />
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}
