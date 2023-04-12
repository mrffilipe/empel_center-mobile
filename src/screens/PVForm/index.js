import React, {useState, useRef, useEffect} from 'react';
import {View, ScrollView, Alert} from "react-native"; 
import styles from "./styles";
import VMasker from "vanilla-masker";
import ButtonSubmit from "../../components/Form/ButtonSubmit";
import API from "../../services/api";
import {useAuthContext} from "../../contexts/authContext";
import {useMainContext} from "../../contexts/mainContext";
import {verifyFildsClient, toNumber, splitName, documentType} from "../../services/tools";
import AddCity from '../../components/Modal/AddCity';
import  FormProgressSingle from "./FormProgressSingle";
import ConsumerUnity from "./ConsumerUnity";
import { UnitGroupA, UnitGroupB } from "./Groups";
import GeneratorUnity from "./GeneratorUnity";
import CustomerGroup from "./CustomerGroup";
import Extras from "./Extras";
export default function PVForm({navigation, route}) {
    const {setTasksStoraged, tasksStoraged, setCallback, user, setLoading} = useAuthContext();
    const {cities} = useMainContext();

    const routeParams = route.params;
    
    const formProgressStatus = useRef();

    const [formStatusNow, setFormStatusNow] = useState(0);

    const [groups, setGroups] = useState([]);
    // const [costs, setCosts] = useState([costsModel]);
    const [name, setName] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [generatorId, setGeneratorId] = useState("");
    const [address, setAddress] = useState("");
    const [addressType, setAddressType] = useState(1);
    const [installLocation,setInstallLocation] = useState("");
    const [distance, setDistance] = useState("");

    const [extra, setExtra] = useState("0");
    const [minRate, setMinRate] = useState("10,00");
    const [installationType, setInstallationType] = useState("");

    const [observation, setObservation] = useState("");
    const [demand, setDemand] = useState([""]);
    const [customizedDemand, setCustomizedDemand] = useState(true);

    const [transformer, setTransformer] = useState("");

    const [invalid, setInvalid] = useState({});

    const [isOpenAddCity, setIsOpenAddCity] = useState(false);

    const formStatus = [
        "Cliente",
        "Geradora",
        "Consumidora",
        "Extra"
    ];

    const handleSubmit = async()=>{
        setInvalid(null)

        if(!verifyDemand())
            return setFormStatusNow(3);

        if(!verifyClient())
            return setFormStatusNow(0);

        if(!verifyGenerator())
            return setFormStatusNow(1);

        if(!verifyConsumer())
            return setFormStatusNow(2);

        if(!user?.idConsultant)
            return alert("Este usuário não é válido");

        const {firstName, lastName} = splitName(name);

        let params = {
            "lightRateValue": toNumber(minRate),
            "workDistance": toNumber(distance),
            "extraProduction": toNumber(extra),
            "pvDemand": {
                "isCustom": customizedDemand,
                "demands": demand.map(val=>toNumber(val))
            },
            "note": observation,
            "installationLocation": toNumber(installLocation),//solo/telhado
            "installationType":toNumber(installationType),/// monofasico, bi, tri
            "idConsultant": user?.idConsultant,
            "idAddress": toNumber(address) ,
            "customer": {
                "firstName": firstName,
                "lastName": lastName,
                "company": null,
                "document": {
                    "record": VMasker.toNumber(cpfCnpj),
                    "documentType": documentType(cpfCnpj),
                },
                "email": email,
                "isLead": true,
                "leadOrigin": 0,
                "telephones": [
                    {
                    "number": VMasker.toNumber(phoneNumber),
                    "isWhatsapp": true
                    }
                ]
            },
            "consumerUnits":groups.map((val) =>{
                return{
                        "reference":generatorId,
                        "group": val?.groupA? 0 : 1,
                        "isGeneratingUnit": val?.isGenerator,
                        "tipPowerMonth": toNumber(val?.pontaKWH),
                        "tipPricePowerMonth": toNumber(val?.pontaRS),
                        "offTipPowerMonth": toNumber(val?.foraPontaKWH),
                        "offTipPricePowerMonth": toNumber(val?.foraPontaRS),
                        "hourPowerMonth": toNumber(val?.horaKWH),
                        "hourPricePowerMonth": toNumber(val?.horaRS),
                        "demandPowerMonth": toNumber(val?.demandaKWH),
                        "demandPricePowerMonth": toNumber(val?.demandaRS),
                        "irrigationDiscount": val?.desconto? val.desconto : false,
                        "powerMonth": toNumber(val?.mediaConsumo), //confirmar
                        "powerPriceMonth": toNumber(val?.precoPorKWH),
                    }
            }),
            "costs": [
                {
                    "description": "string",
                    "value": 0
                }
            ]
        }

        setLoading(true)
        let res = await API.post("PVForm",params).catch(e => e);

        setLoading(false);

        if(res?.error || res?.status !== 200){
            const tryAgain = () => {
                setCallback(null);
                handleSubmit()
            }

            return setCallback({
                type: 0,
                message:res?.error ? res?.error : "Error: "+res?.status,
                action:tryAgain,
                actionName:"Tentar novamente!",
                close:()=>setCallback(null)
            })
        }

        setCallback({
            type: 1,
            message:"Formulário enviado com sucesso",
            action:()=>{
                navigation.navigate("Orçamentos",{
                    screen:"Detalhes do orçamento",
                    initial: false,
                    params:{
                        id:res?.data.id
                    }
                });
                setCallback(null)},
            actionName:"Ir para orçamento!",
            close:()=>setCallback(null)
        })

        clearForm();
    }

    const clearForm = ()=>{
        setFormStatusNow(0)
        setGroups([]);
        setName("");
        setCpfCnpj("");
        setPhoneNumber("");
        setEmail("");
        setGeneratorId("");
        setAddress("");
        setAddressType(1);
        setInstallLocation("");
        setTransformer("");
        setInvalid(null);
        setExtra("0");
        setMinRate("10,00");
        setDistance("");
        setInstallationType("");
        setDemand([""]);
        setCustomizedDemand(true);
        setObservation("");
    }
    
    
    const confirmDeleteGroup = (title,message)=>{
        return new Promise((resolve)=>{

            Alert.alert(
                title,
                message,
                [
                    {
                        text:"Sim",
                        onPress:()=> resolve(true)
                    },
                    {
                        text:"Não",
                        onPress:()=> resolve(false),
                        type:"default"
                    }
                ],
                {
                    cancelable: true,
                    onDismiss:()=> resolve(false)
                }
            )
        })
    }


    const verifyClient = ()=>{

        if(name === "" || cpfCnpj === "" || phoneNumber === "" || email === ""){
                setInvalid({input:"",message:"Campo obrigatório!"});
                return false;
        }

            if(!verifyFildsClient({
                setInvalid, 
                name, 
                cpfCnpj,
                phoneNumber,
                email,
            })){
                return false;
            }
            
        return true;
    }

    const verifyGenerator = ()=>{
        if(generatorId === "" || address === "" || addressType === "" || installLocation === "" || minRate === "" || distance === ""){
            setInvalid({input:"",message:"Campo obrigatório!"});
            return false;
        }
        
        // if(addressType === 0 && transformer === ""){
        //     setInvalid({input:"",message:"Campo obrigatório!"});
        //     return false;
        // }

        if(groups.filter(val => val.isGenerator).length === 0){
            alert("Adicione um grupo a unidade geradora!");
            return false;
        }

        for(const i in groups){
            for(const keys of Object.keys(groups[i])){
                
                if(groups[i][keys] === "" && groups[i].isGenerator){
                    setInvalid({input:"",message:"Campo obrigatório!"});
                    return false;
                }
            }
        }

        return true;
    }

    const verifyConsumer = ()=>{
        // if(groups.filter(val => !val.isGenerator).length === 0){
        //     alert("Adicione pelo menos uma unidade consumidora!");
        //     return false;
        // }
        
        for(const i in groups){
            for(const keys of Object.keys(groups[i])){
                if(groups[i][keys] === "" && !groups[i].isGenerator){
                    setInvalid({input:"",message:"Campo obrigatório!"});
                    return false;
                }
            }
        }

        return true;
    }

    const verifyDemand = ()=>{
        let res = true;
        demand.map((val)=>{
            if(val === ""){
                setInvalid({input:"",message:"Campo obrigatório!"});
                res = false;
            }
        })

        return res;
    }

    const nextStap = ()=>{
        setInvalid(null);

        //VERRIFICAR SE OS CAMPOS ESTÃO PREENCHIDOS PRIMEIRO
        if(formStatusNow === 0){
            if(!verifyClient())
                return setFormStatusNow(0);
        }

        if(formStatusNow === 1){
            if(!verifyGenerator())
                return setFormStatusNow(1);
        }

        if(formStatusNow === 2){
            if(!verifyConsumer())
                return setFormStatusNow(2);
        }

        if(formStatusNow < formStatus.length - 1)
            setFormStatusNow(formStatusNow + 1);
    }

    const prevStap = ()=>{
        setInvalid(null);
        if(formStatusNow > 0)
            setFormStatusNow(formStatusNow - 1);
    }

    const checkIsValid = ()=>{
        setInvalid(null);
        verifyFildsClient({
            setInvalid, 
            name, 
            cpfCnpj,
            phoneNumber,
            email,
        })
    }

    const closeAddCity = ()=>{
        setIsOpenAddCity(false);
    }

    useEffect(()=>{
        console.log(routeParams)
        if(routeParams?.name && !name){
            let obj = routeParams;

            setName(obj.name);
            setEmail(obj.email);
            setPhoneNumber(obj.phone ? VMasker.toPattern(obj.phone,"(99) 99999-9999") : "");
            setCpfCnpj(obj.cpfCnpj ? VMasker.toPattern(obj.cpfCnpj,"99.999.999/9999-99") : "");
        }
    },[routeParams])

    useEffect(()=>{
        if(customizedDemand){
            let d = [...demand];
            d.length = 1;
    
            setDemand([...d]);
        }
    },[customizedDemand])

    return (
        <ScrollView>
            <View style={styles.container}>
                <AddCity isOpen={isOpenAddCity} close={closeAddCity} />

                <View style={styles.limitSize}>

                    <View style={styles.form_progress}>
                        <View ref={formProgressStatus} style={styles.history_wrap}>


                            {formStatus.map((val,key)=>{

                                return(
                                    FormProgressSingle({val,key,formStatus, formStatusNow})
                                )
                            })}
                        </View>

                    </View>

                    <View style={styles.form_group}>

                        

                        {
                            formStatusNow === 0 ?
                                CustomerGroup({
                                    name,
                                    setName,
                                    cpfCnpj,
                                    setCpfCnpj,
                                    phoneNumber,
                                    setPhoneNumber,
                                    email,
                                    setEmail,
                                    invalid,
                                    checkIsValid
                                })
                            :formStatusNow === 1 ?              
                                GeneratorUnity({
                                    generatorId,
                                    setGeneratorId,
                                    minRate,
                                    setMinRate,
                                    extra,
                                    setExtra,
                                    address,
                                    setAddress,
                                    cities,
                                    addressType,
                                    groups,
                                    setGroups,
                                    transformer,
                                    setTransformer,
                                    distance,
                                    setDistance,
                                    installLocation,
                                    setInstallLocation,
                                    invalid,
                                    setIsOpenAddCity,
                                    UnitGroupA,
                                    UnitGroupB,
                                    confirmDeleteGroup,
                                    setAddressType,
                                    setInstallationType,
                                    installationType
                                })
                            :formStatusNow === 2 ?
                                ConsumerUnity({
                                    groups, 
                                    setGroups, 
                                    UnitGroupA, 
                                    UnitGroupB, 
                                    confirmDeleteGroup,
                                    invalid
                                })
                            :
                                Extras({
                                    observation,
                                    setObservation,
                                    demand,
                                    setDemand,
                                    customizedDemand, 
                                    setCustomizedDemand,
                                    invalid
                                })
                        }

                        
                        {formStatus.length - 1 === formStatusNow ?
                        
                            <View style={styles.btn_wrap}>
                                <ButtonSubmit onPress={prevStap} value={"Voltar"} styles={[styles.btn_submit,styles.btn_goBack]}/>
                                <ButtonSubmit onPress={handleSubmit} value={"Enviar para análise"} styles={styles.btn_submit}/>
                            </View>

                        :
                            <View style={styles.btn_wrap}>
                                {formStatusNow > 0 ?
                                    <ButtonSubmit onPress={prevStap} value={"Voltar"} styles={[styles.btn_submit,styles.btn_goBack]}/>
                                :<></>}
                                <ButtonSubmit onPress={nextStap} value={"Avançar"} styles={[styles.btn_submit, styles.btn_goNext]}/>
                            </View>
                    }
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}


