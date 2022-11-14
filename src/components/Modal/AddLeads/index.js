import React, {useState, useEffect, useRef} from 'react'
import {View, Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import InputText from "../../Form/InputText";
import InputMask from "../../Form/InputMask";
import Select from "../../Form/Select";
import styles from "./styles";
import ButtonSubmit from "../../Form/ButtonSubmit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "../";
import {verifyFildsClient} from "../../../services/tools";
import * as Animatable from 'react-native-animatable';
import InputFile from "../..//Form/InputFile";
import IHelpCircle from "../../../assets/icons/helpCircle";
import { limitText } from '../../../services/tools';
import {leadOrigin} from "../../../enum/selectOptions.json";
const props = {
    close: Function ///fechar modal
}
export default function AddCity({isOpen,close} = props) {
    const window = useWindowDimensions();
    const barRef = useRef(null);

    const [isFile, setIsFile] = useState(false);

    const [name, setName] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [origin, setOrigin] = useState("");
    const [file, setFile] = useState(null);
    const [isClosedHelp, setIsClosedHelp] = useState(false);

    const [invalid, setInvalid] = useState(null);

    const clear = ()=>{
        setIsFile(false);
        setOrigin("");
        setName("");
        setCpfCnpj("");
        setEmail("");
        setPhoneNumber("");
        setInvalid(null);
        setFile(null);
        close(false);
    }

    const registerLeads = (e)=>{
        e.preventDefault();
        if(!name)
            return setInvalid(name);
        
    }

    const openHelp = async(e)=>{
        e.preventDefault();
        setIsClosedHelp(false);
        try{
            await AsyncStorage.setItem('@leadsHelper',JSON.stringify(false));
        }catch(e){}
    }

    const closeHelp = async(e)=>{
        e.preventDefault();
        setIsClosedHelp(true);
        try{
            await AsyncStorage.setItem('@leadsHelper',JSON.stringify(true));
        }catch(e){}
    }

    const restorePreference = async()=>{
        try{
            let res = await AsyncStorage.getItem('@leadsHelper');
            if(res!== null)
                setIsClosedHelp(JSON.parse(res))
        }catch(e){}
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

    const changeMethod = (boo)=>{
        if(boo){
            setIsFile(boo);
            let ww = window.width;
            if(ww < 650){
                barRef.current.transitionTo({left:ww/2 - 25});
            }else{
                barRef.current.transitionTo({left:600/2 - 15});
            }
        }else{
            setIsFile(boo);
            barRef.current.transitionTo({left:0});
            
        }
      }

    const handleSubmit = ()=>{
        console.log(file);
    }

    useEffect(()=>{
        restorePreference();
    },[])

    return (
        <Modal isOpen={isOpen} title={"Cadastrar Leads"} >
            <View style={styles.container}>
                <View style={styles.center}>
                    <View style={styles.select_method_wrap}>
                        <TouchableOpacity onPress={()=>changeMethod(false)} style={!isFile? [styles.btn_method] : [styles.btn_method,styles.btn_method_disabled]}>
                            <Text style={styles.text_method}>Manual</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>changeMethod(true)} style={isFile? [styles.btn_method] : [styles.btn_method,styles.btn_method_disabled]}>
                            <Text style={styles.text_method}>Arquivo</Text>
                        </TouchableOpacity>    

                        <Animatable.View ref={barRef} style={styles.booton_bar}></Animatable.View>
                    </View>
                </View>

                <View style={styles.form}>
                    {!isFile?
                        <>
                            <InputText
                                label="Nome e Sobrenome"
                                value={name}
                                setValue={setName}
                                invalid={invalid?.input === name ? invalid?.message : null}
                                onBlur={checkIsValid}
                            />

                            <InputMask
                                label="CPF/CNPJ"
                                value={cpfCnpj}
                                setValue={setCpfCnpj}
                                mask={cpfCnpj.replace(/\D+/g, "").length <= 11
                                    ? "CPF"
                                    : "CNPJ"
                                }
                                keyboardType="number-pad"
                                invalid={invalid?.input === cpfCnpj ? invalid?.message : null}
                                onBlur={checkIsValid}
                            />

                            <InputMask
                                label="Telefone"
                                value={phoneNumber}
                                setValue={setPhoneNumber}
                                mask="BRL_PHONE"
                                keyboardType="number-pad"
                                invalid={invalid?.input === phoneNumber ? invalid?.message : null}
                                onBlur={checkIsValid}
                            />

                            <InputText
                                label="E-mail"
                                value={email}
                                setValue={setEmail}
                                type="email"
                                invalid={invalid?.input === email ? invalid?.message : null}
                                onBlur={checkIsValid}
                            />

                            <Select
                                label="Origem"
                                value={origin}
                                setValue={setOrigin}
                                values={leadOrigin}
                            />
                        </>
                    :
                        <>
                            <View style={styles.help_wrap}>
                                {!isClosedHelp && 
                                    <>
                                        <Text style={styles.h5}>O conteudo do aquivo deve ter o seguinte formato</Text>
                                        <Text style={styles.h6}>nome;cpf/cnpj;telefone;email;origem</Text>
                                        <Text style={styles.h5}>Ex:</Text>
                                        <Text style={styles.p}>{`João da silva;99999999902;(99)999999999;joaodasilva@gmail.com;Site
    João silva;9999999902;(99)999999999;joaosilva@gmail.com;Radio`}</Text>
                                        <Text style={styles.h5}>Cada lead deve estar em uma linha</Text>
                                        
                                        <View style={styles.btn_ok_wrap}>
                                            <TouchableOpacity style={styles.btn_ok} onPress={closeHelp}>
                                                <Text style={styles.ok}>Ok!</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                }
                            </View>
                                
                            <View style={styles.leads_file_wrap}>

                                {isClosedHelp &&
                                    <View>
                                        <TouchableOpacity onPress={openHelp} style={styles.help_btn}>
                                            <IHelpCircle style={styles.icon_help}/>
                                        </TouchableOpacity>
                                    </View>
                                }

                                <InputFile
                                    label="Adicionar arquivo"
                                    multiple={false}
                                    setValue={setFile}
                                    onlyFile={true}

                                />

                                {file ?
                                    <View style={styles.file}>
                                        <Text style={styles.file_text}>{limitText(file?.name,25)}</Text>

                                        <TouchableOpacity onPress={()=>setFile(null)} style={styles.remove_btn}>
                                            <Text style={styles.remove_file}>x</Text>
                                        </TouchableOpacity>
                                    </View>
                                :<></>}
                            </View>
                        </>
                    }

                    <View style={styles.btn_wrap}>
                        <ButtonSubmit value={"Cancelar"} onPress={clear}  styles={[styles.btn, styles.btn_close]}/>
                        {!isFile
                            ? <ButtonSubmit value={"Cadastrar"} onPress={handleSubmit}  styles={[styles.btn]}/>
                            : <ButtonSubmit value={"Enviar"} onPress={handleSubmit}  styles={[styles.btn]}/>
                        }
                    </View>
                </View>
            </View>
        </Modal>
    )
}
