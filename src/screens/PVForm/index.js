import React, {useState, useRef, useEffect} from 'react';
import {View, ScrollView, Alert, Text} from "react-native"; 
import styles from "./styles";
import VMasker from "vanilla-masker";
import ButtonSubmit from "../../components/Form/ButtonSubmit";
import API from "../../services/api";
import {useAuthContext} from "../../contexts/authContext";
import {verifyFildsClient, toNumber, splitName, documentType} from "../../services/tools";
import AddCity from '../../components/Modal/AddCity';
import  FormProgressSingle from "./FormProgressSingle";
import ConsumerUnity from "./ConsumerUnity";
import { UnitGroupA, UnitGroupB } from "./Groups";
import GeneratorUnity from "./GeneratorUnity";
import CustomerForm from "../../components/Form/Customer";
import AddressForm from "../../components/Form/Address";
import Extras from "./Extras";
import enumData from "../../data/enum.json";
export default function PVForm({navigation, route}) {
    const {setTasksStoraged, tasksStoraged, setCallback, user, setLoading} = useAuthContext();

    const routeData = route.params;
    
    const formProgressStatus = useRef();

    const [formStatusNow, setFormStatusNow] = useState(0);

    const [groups, setGroups] = useState([]);
    // const [costs, setCosts] = useState([costsModel]);
    const [name, setName] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [email, setEmail] = useState("");
    const [origin, setOrigin] = useState("");
    const [company, setCompany] = useState("");
    const [phones, setPhones] = useState([
        {
            number:"",
            isWhatsapp:true,
        }
    ]);

    const [postalCode, setPostalCode] = useState("");
    const [citie, setCitie] = useState("");
    const [state, setState] = useState("GO");
    const [country, setCountry] = useState("BR");
    const [neighborhood, setNeighborhood] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [conplement, setConplement] = useState("");
    const [coordinates, setCoordinates] = useState({latitude: "", longitude: ""});
    
    const [addressType, setAddressType] = useState(1);
    const [installLocation,setInstallLocation] = useState("");
    const [transformer, setTransformer] = useState(""); //não esta sendo usado
    const [invalid, setInvalid] = useState(null);
    const [extra, setExtra] = useState("0");
    const [minRate, setMinRate] = useState("10,00");
    const [distance, setDistance] = useState("");
    // const [installationType, setInstallationType] = useState("");

    const [demand, setDemand] = useState([""]);
    const [customizedDemand, setCustomizedDemand] = useState(true);
    const [observation, setObservation] = useState("");

    const [isOpenAddCity, setIsOpenAddCity] = useState(false);

    const formStatus = [
        "Cliente",
        "Endereço",
        "Geradora",
        "Consumidora",
        "Extra"
    ];

    const handleSubmit = async()=>{
        setInvalid(null)

        // if(!verifyDemand())
        //     return setFormStatusNow(4);

        if(!verifyClient())
            return setFormStatusNow(0);

        if(!verifyGenerator())
            return setFormStatusNow(2);

        if(!verifyConsumer())
            return setFormStatusNow(3);

        if(!user?.idConsultant)
            return alert("Seu cadastro não foi finalizado!");

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
            // "installationType":toNumber(installationType),/// monofasico, bi, tri
            "idConsultant": user?.idConsultant,
            "customer": {
                "firstName": firstName,
                "lastName": lastName,
                "company": company,
                "document": {
                    "record": VMasker.toNumber(cpfCnpj),
                    "documentType": documentType(cpfCnpj)
                },
                "email": email,
                "leadOrigin": origin,
                "address": {
                    "postalCode": postalCode,
                    "city": citie,
                    "state": state,
                    "country": country,
                    "neighborhood": neighborhood,
                    "street": street,
                    "number":toNumber(number),
                    "complement": conplement,
                    "coordinates": {
                        "latitude": coordinates.latitude.toString(),
                        "longitude": coordinates.longitude.toString(),
                    }
                },
                "telephones": [
                    {
                    "number": VMasker.toNumber(phones[0].number),
                    "isWhatsapp": true
                    }
                ]
            },
            "consumerUnits":groups.map((val) =>{
                return{
                        "reference":val.name,
                        "group": val?.groupA? "A" : "B",
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
        };

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
        setPhones([
            {
                number:"",
                isWhatsapp:true,
            }
        ]);
        setEmail("");
        // setGeneratorId("");
        // setAddress("");
        setAddressType(1);
        setInstallLocation("");
        setTransformer("");
        setInvalid(null);
        setExtra("0");
        setMinRate("10,00");
        setDistance("");
        // setInstallationType("");
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
                        text:"Não",
                        onPress:()=> resolve(false),
                        type:"default"
                    },
                    {
                        text:"Sim",
                        onPress:()=> resolve(true)
                    },
                ],
                {
                    cancelable: true,
                    onDismiss:()=> resolve(false)
                }
            )
        })
    }


    const verifyClient = ()=>{

        if(name === "" || cpfCnpj === "" || phones[0].number === "" || email === "" || origin === ""){
            setInvalid({input:"",message:"Campo obrigatório!"});
            return false;
        }

        if(!verifyFildsClient({
            setInvalid, 
            name, 
            cpfCnpj,
            phoneNumber:phones[0].number,
            email,
        })){
            return false;
        }
            
        return true;
    }

    const verifyGenerator = ()=>{
        if(addressType === "" || installLocation === "" || minRate === "" || distance === ""){
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
            if(!verifyAddress())
                return setFormStatusNow(1);
        }

        if(formStatusNow === 2){
            if(!verifyGenerator())
                return setFormStatusNow(2);
        }

        if(formStatusNow === 3){
            if(!verifyConsumer())
                return setFormStatusNow(3);
        }

        if(formStatusNow < formStatus.length - 1)
            setFormStatusNow(formStatusNow + 1);
    }

    const prevStap = ()=>{
        setInvalid(null);
        if(formStatusNow > 0)
            setFormStatusNow(formStatusNow - 1);
    }

    const verifyAddress = ()=>{

        if(street === "" || number === "" || postalCode === "" || citie === ""|| state === ""|| country === "" || neighborhood === ""){
                setInvalid({input:"",message:"Campo obrigatório!"});
                return false;
        }
        return true;
    }

    const closeAddCity = ()=>{
        setIsOpenAddCity(false);
    }

    useEffect(()=>{
        // console.log(routeData.data.fullName);
        if(routeData?.data?.email && !name){
            let customer =  routeData.data;

            if(!customer) return;

            setName(customer?.fullName ?? "");
            setEmail(customer?.email ?? "");
            setCompany(customer?.company);
            setPhones([
                {
                    number:customer?.phone ? VMasker.toPattern(customer?.phone,"(99) 99999-9999") : "",
                    isWhatsapp:true,
                }
            ]);
            // enumData.origin
            setOrigin(customer?.leadOrigin ? enumData.leadOrigin[customer?.leadOrigin] : "");
            setCpfCnpj(customer?.document ? VMasker.toPattern(customer?.document?.record ?? "",customer?.document?.documentType === 0 ? "999.999.999-99" :"99.999.999/9999-99") : "");
            setStreet(customer?.address?.city ?? "");
            setCitie(customer?.address?.city);
            setState(customer?.address?.state);
            setCountry(customer?.address?.country);
            setNeighborhood(customer?.address?.neighborhood);
            setConplement(customer?.address?.complement);
            setPostalCode(customer?.address?.postalCode);
            setNumber(customer?.address?.number);
            setCoordinates({
                latitude: customer?.address?.coordinates.latitude, 
                longitude: customer?.address?.coordinates.longitude
            });
        }
    },[routeData])

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
                                <>
                                    <Text style={[styles.subtitle,styles.subtitle_first]}>Cliente</Text>
                                    <CustomerForm
                                        fullName={name}
                                        setFullName={setName}
                                        email={email}
                                        setEmail={setEmail}
                                        cpfCnpj={cpfCnpj}
                                        setCpfCnpj={setCpfCnpj}
                                        invalid={invalid}
                                        setInvalid={setInvalid}
                                        origin={origin}
                                        setOrigin={setOrigin}
                                        company={company}
                                        setCompany={setCompany}
                                        phones={phones}
                                        setPhones={setPhones}
                                    />
                                </>
                            :formStatusNow === 1 ?    
                                <>
                                    <Text style={[styles.subtitle,styles.subtitle_first]}>Endereço</Text>
                                    <AddressForm 
                                        postalCode={postalCode}
                                        setPostalCode={setPostalCode}
                                        citie={citie}
                                        setCitie={setCitie}
                                        state={state}
                                        setState={setState}
                                        country={country}
                                        setCountry={setCountry}
                                        neighborhood={neighborhood}
                                        setNeighborhood={setNeighborhood}
                                        street={street}
                                        setStreet={setStreet}
                                        number={number}
                                        setNumber={setNumber}
                                        conplement={conplement}
                                        setConplement={setConplement}
                                        coordinates={coordinates}
                                        setCoordinates={setCoordinates}
                                        invalid={invalid}
                                    />
                                </>
                            :formStatusNow === 2 ?              
                                GeneratorUnity({
                                    // generatorId,
                                    // setGeneratorId,
                                    minRate,
                                    setMinRate,
                                    extra,
                                    setExtra,
                                    // address,
                                    // setAddress,
                                    // cities,
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
                                    // setIsOpenAddCity,
                                    UnitGroupA,
                                    UnitGroupB,
                                    confirmDeleteGroup,
                                    setAddressType,
                                    // setInstallationType,
                                    // installationType
                                })
                            :formStatusNow === 3 ?
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
                                <ButtonSubmit onPress={handleSubmit} value={"Enviar Para Análise"} styles={styles.btn_submit}/>
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


