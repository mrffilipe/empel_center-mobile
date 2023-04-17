import React, {useState} from 'react'
import styles from "./styles";
import ButtonSubmit from "../../../components/Form/ButtonSubmit";
import {verifyFildsClient, documentType, splitName} from "../../../services/tools";
import api from "../../../services/api";
import { useMainContext } from '../../../contexts/mainContext';
import VMasker from 'vanilla-masker';
import {View, Text, ScrollView, Modal}  from "react-native";
import Callback from "../../../components/Modal/Callback";
import Loading from "../../../components/Loading";
import AddressForm from "../../../components/Form/Address";
import CustomerForm from "../../../components/Form/Customer";
const props = {
    isOpen: Boolean,
    updateUsers: Function,
    close: Function ///fechar modal
}
export default function AddUser({isOpen,close} = props) {
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(null);
    const {getCustomers} = useMainContext();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [invalid, setInvalid] = useState(null);
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


    const [step, setStep] = useState(0);

    const clear = ()=>{
        setFullName("");
        setEmail("");
        setCpfCnpj("");
        setOrigin("");
        close(false);
        setInvalid(null);
        setPhones([
            {
                number:"",
                isWhatsapp:true,
            }
        ]);

        setPostalCode("");
        setCitie("");
        setState("GO");
        setCountry("BR");
        setNeighborhood("");
        setStreet("");
        setNumber("");
        setConplement("");
        setCoordinates({latitude: "", longitude: ""});
    }

    const handleSubmit = async()=>{
        
        if(!verifyClient())
            return setStep(0);

        if(!verifyAddress())
            return setStep(1);

        const {firstName, lastName} = splitName(fullName);

        // return console.log(conplement);
        let params = {
            firstName,
            lastName,
            company,
            document: {
                record: VMasker.toNumber(cpfCnpj),
                documentType: documentType(cpfCnpj),
            },
            email,
            leadOrigin: origin,
            address: {
                postalCode: postalCode,
                city: citie,
                state: state,
                country: country,
                neighborhood: neighborhood,
                street: street,
                number: number,
                complement: conplement,
                coordinates: {
                    latitude: coordinates.latitude.toString(),
                    longitude: coordinates.longitude.toString(),
                }
            },
            telephones: [
                {
                    number: VMasker.toNumber(phones[0].number),
                    isWhatsapp: true
                }
            ]
        }
        
        
        try{
            setLoading(true);
            let res = await api.post("Customer",params).catch(e => e);
            setLoading(false);

            if(res?.error || res.status !== 200){
                throw new Error(res?.error?.status === 400 ? "E-mail ou documento já cadastrado!" : res.error);
            }

            setCallback({
                message:"Cliente cadastrado!",
                action:()=>{
                    clear();
                    setCallback(null);
                },
                type:1,
                actionName:"Ok!"
            });
            setStep(1);
            getCustomers();
        }catch(err){
            setCallback({
                message:err.message,
                close:()=>setCallback(null),
                action:()=>setCallback(null),
                actionName:"Ok!"
            });
        }finally{
            setLoading(false);
        }
    }

    const verifyClient = ()=>{
        
        if(fullName === "" || cpfCnpj === "" || email === "" || phones[0].number === "" || origin === ""){
                setInvalid({input:"",message:"Campo obrigatório!"});
                return false;
        }

        if(!verifyFildsClient({
            setInvalid, 
            name:fullName, 
            cpfCnpj,
            email,
        })){
            return false;
        }
        return true;
    }

    const verifyAddress = ()=>{
        
        if(postalCode === "" || citie === "" || state === "" || country === "" || neighborhood === "" || street === "" || number === "" || coordinates === ""){
                setInvalid({input:"",message:"Campo obrigatório!"});
                return false;
        }

        return true;
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
        >
            <View style={styles.modal}>
                <Callback params={callback} />
                <Loading loading2={loading}/>
                <View style={styles.modal_main}>
                    <ScrollView >
                        <View style={styles.modal_wrap}>
                            <Text style={styles.title}>Cadastrar Cliente</Text>

                            <View style={styles.form}>
                                {!step ?
                                    <View>
                                        <CustomerForm
                                            fullName={fullName}
                                            setFullName={setFullName}
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
                                    </View>
                                :
                                    <View>
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
                                            coordinatesRequired={true}
                                            invalid={invalid}
                                        />

                                    </View>
                                }

                                <View style={styles.btn_wrap}>
                                    
                                    {!step ?
                                        <>
                                            <ButtonSubmit styles={[styles.btn,styles.btn_close]} onPress={close} value={"Cancelar"} />
                                            <ButtonSubmit styles={[styles.btn]} onPress={()=> setStep(verifyClient() ? 1 : 0)} value={"Proximo"} />
                                        </>
                                    : 
                                        <>
                                            <ButtonSubmit styles={[styles.btn,styles.btn_after]} onPress={()=> setStep(0)} value={"Voltar"} />
                                            <ButtonSubmit styles={[styles.btn,styles.btn_submit]} onPress={handleSubmit} value={"Salvar"} />
                                        </>
                                    }
                                    
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>

            </View>
        </Modal>
    );
}
