import styles from "./styles";
import React, {useState, useEffect} from "react";
import {View, Text, ScrollView, TouchableOpacity} from "react-native";
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
import enumData from "../../data/enum.json";
import CancelBudget from "./CancelBudget";

export default function BudgetDetail({route, navigation}) {
    const {cities, setTaskSelected} = useMainContext();
    route.taskData = [1];

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
                message:res?.error ? res.error : `Orçamento não encontrado!`,
                action:()=>{getBudget();setCallback(null)},
                actionName:"Tentar Novamente",
            });
        }
        setAtualStatus(res?.status);
        setData(res);
        setTaskSelected({tasks:res?.tasks,id:res.id});
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
        "Finalizado!",
        "Cancelado!",
    ]; 
    
    useEffect(()=>{
        if(data?.consumerUnits){
            let formatData = data?.consumerUnits.map((val,key)=>{
                return{
                    id:key,
                    reference:val?.reference,
                    group:val?.group,
                    isGenerator:val?.isGeneratingUnit,
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

            setDataA(formatData.filter(val => val.group === "A" && !val.isGenerator));
            setDataB(formatData.filter(val => val.group === "B" && !val.isGenerator));

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
                                <TouchableOpacity onPress={()=>navigation.navigate("Perfil",{id:data?.consultant?.user?.id})}>
                                    <InputText
                                        label="Vendedor"
                                        editable={false}
                                        value={data?.consultant? data?.consultant.user.firstName + " " + data?.consultant.user.lastName:""}
                                    />
                                </TouchableOpacity>
                            </View>
                            
                            <View style={styles.info_single}>
                                <TouchableOpacity onPress={()=>navigation.navigate("Cliente",{id:data?.customer?.id})}>
                                    <InputText
                                        label="Cliente"
                                        editable={false}
                                        value={customerName}
                                    />
                                </TouchableOpacity>
                            </View>                    
                        </View>

                        <Text style={styles.h2}>Unidade Geradora</Text>

                        <View style={styles.info_wrap}>
                            <View style={styles.info_single}>
                                <InputMask
                                    label="Taxa de luz minima"
                                    value={dataGenerator?.taxaMinima? dataGenerator?.taxaMinima+" kWh":""}
                                    editable={false}
                                />  
                            </View>

                            
                            <View style={styles.info_single}>
                                <InputText
                                    label="Produção extra"
                                    value={dataGenerator?.extra !== undefined? toMoney(dataGenerator?.extra)+" kWh":""}
                                    editable={false}
                                />
                            </View>

                            {dataGenerator?.addressType !== undefined ?
                                <View style={styles.info_single}>
                                    <InputText
                                        label="Zona"
                                        value={selectOptions.addressType[dataGenerator?.addressType]}
                                        readonly={true}
                                        open={true}
                                    />   
                                </View>
                                :<></>
                            }
                            
                            <View style={styles.info_single}>
                                <InputText
                                    editable={false}
                                    label="Local da instalação"
                                    value={selectOptions.instalationLocation[enumData.instalationLocation[dataGenerator?.installationLocation]]}
                                />
                            </View>

                            <View style={styles.info_single}>
                                <InputText
                                    editable={false}
                                    label="Distancia"
                                    value={dataGenerator?.workDistance? dataGenerator?.workDistance+" Km" :""}
                                />
                            </View>

                            {dataGenerator?.transformer ?
                                <View style={styles.info_single}>
                                    <InputText
                                        label="transformador existente"
                                        value={dataGenerator?.transformer+" kVA"}
                                        readonly={true}
                                        open={true}
                                    />
                                </View>
                                :<></>
                            }

                            <View style={styles.info_single}>
                                <InputText
                                    label="Local da instalação"
                                    editable={false}
                                    value={selectOptions.instalationLocation[enumData.instalationLocation[dataGenerator?.installationLocation]]}
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
                                        label="Transformador existente"
                                        editable={false}
                                        value={dataGenerator?.transformer+" kVA"}
                                    />
                                </View>
                                :<></>
                            }

                            {/* <View style={styles.info_single}>
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
                            </View> */}

                            <View style={styles.info_single}>
                                <InputText
                                    label="Fornecimento"
                                    value={selectOptions.instalationType[enumData.installationType[dataGenerator?.instalationType]]}
                                    readonly={true}
                                    open={true}
                                />  
                            </View>

                        </View>
                        <TableA data={dataGenerator?.unidade? dataGenerator?.unidade : []} group={dataGenerator?.unidade && dataGenerator?.unidade[0]?.group? dataGenerator?.unidade[0]?.group : 0}/>

                        { dataA.length || dataB.length ?
                            <>
                                <Text style={styles.h2}>Unidades consumidoras</Text>
                                
                                <TableA data={dataA} group={0}/>
                                <TableA data={dataB} group={1}/>
                            </>
                            :<></>
                        }

                        {dataGenerator?.note ?
                            <>
                                <Text style={styles.h2}>Nota:</Text>
                                <Text style={styles.note}>{dataGenerator?.note}</Text>
                            </>
                            :<></>
                        }

                        <Files data={data} getBudget={getBudget} />
                        
                        <History data={data?.pvFormChangeHistorys ?? []}/>

                        {/* <Messages data={[]} /> */}
                        <Text style={styles.h2}></Text>
                        <CancelBudget/>
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}
