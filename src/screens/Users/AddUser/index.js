import React, {useState} from 'react'
import {Modal, ScrollView, View, Text} from 'react-native';
import InputText from "../../../components/Form/InputText";
import InputMask from "../../../components/Form/InputMask";
import Select from "../../../components/Form/Select";
import styles from "./styles";
import ButtonSubmit from "../../../components/Form/ButtonSubmit";
import {verifyFildsClient, documentType} from "../../../services/tools";
import optionsSelect from "../../../data/selectOptions.json";
import api from "../../../services/api";
import VMasker from 'vanilla-masker';
import { useAuthContext } from '../../../contexts/authContext';
import Callback from "../../../components/Modal/Callback";
import Loading from "../../../components/Loading";
const props = {
    isOpen: Boolean,
    updateUsers: Function,
    close: Function ///fechar modal
}
export default function AddUser({isOpen, close, updateUsers} = props) {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [invalid, setInvalid] = useState(null);
    const [access, setAccess] = useState(1);
    const [callback, setCallback] = useState(null);
    const [loading, setLoading] = useState(false);

    const clear = ()=>{
        setFullName("");
        setEmail("");
        setCpfCnpj("");
        setAccess(0);
        setInvalid(null);
        close(false);
    }

    const registerUser = async()=>{
        
        if(!access)
            return setInvalid({input:access, message:"Selecione um cargo!"});

        if(!verifyClient())
            return;

        const firstName =  fullName.split(" ")[0];
        const lastName = fullName.split(firstName)[1];

        let params = {
            firstName,
            lastName,
            document: {
                record: VMasker.toNumber(cpfCnpj),
                documentType: documentType(cpfCnpj),
            },
            email,
            typeAccess:parseInt(access)
        }
        
        try{
            setLoading(true);
            let res = await api.post("User/register",params).catch(e => e);
            setLoading(false);
            console.log(res);
            if(res?.error || res.status !== 200){
                return setCallback({
                    message:res.status === 204? "E-mail ou documento já cadastrado" : "Verifique se o documento não está cadastrado",
                    close:()=>setCallback(null),
                    action:()=>setCallback(null),
                    actionName:"Ok!"
                });
            }

            setCallback({
                message:"Usuário cadastrado com sucesso!",
                close:()=>setCallback(null),
                action:()=>setCallback(null),
                type:1,
                actionName:"Ok!"
            });
            updateUsers();
            clear();
        }catch(err){
            setLoading(false);
        }
        
    }

    const verifyClient = ()=>{
        
        if(fullName === "" || cpfCnpj === "" || access === "" || email === ""){
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

    const checkIsValid = ()=>{
        setInvalid(null);
        verifyFildsClient({
            setInvalid, 
            name:fullName, 
            cpfCnpj,
            email,
        })
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
                        <Text style={styles.title}>Cadastrar usuario</Text>

                        <View style={styles.form}>
                            <InputText
                                label="Nome e Sobrenome"
                                value={fullName}
                                setValue={setFullName}
                                onBlur={checkIsValid}
                                required={true}
                                invalid={invalid?.input === fullName ? invalid?.message : null}
                            />

                            <InputText
                                type="email"
                                label="E-mail"
                                value={email}
                                required={true}
                                setValue={setEmail}
                                invalid={invalid?.input === email ? invalid?.message : null}
                                onBlur={checkIsValid}
                            />
                    
                            <InputMask
                                label="CPF/CNPJ"
                                value={cpfCnpj}
                                setValue={setCpfCnpj}
                                required={true}
                                mask={cpfCnpj.replace(/\D+/g, "").length <= 11
                                    ? "CPF"
                                    : "CNPJ"
                                }
                                keyboardType="number-pad"
                                onBlur={checkIsValid}
                                invalid={invalid?.input === cpfCnpj ? invalid?.message : null}
                            />

                            <View style={styles.select_wrap}>
                                <Select
                                    label="Cargo: "
                                    required={true}
                                    value={optionsSelect?.typeAccess[parseInt(access)]}
                                    setValue={setAccess}
                                    values={optionsSelect?.typeAccess}
                                />
                            </View>

                            <View style={styles.btn_wrap}>
                                <ButtonSubmit value={"Cancelar"} onPress={clear}  styles={[styles.btn, styles.btn_close]}/>
                                <ButtonSubmit value={"Cadastrar"} onPress={registerUser}  styles={[styles.btn]}/>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                
            </View>
        </Modal>
    )
}
