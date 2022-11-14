import React, {useState} from 'react'
import {Modal, ScrollView, View, Text} from 'react-native';
import InputText from "../../../components/Form/InputText";
import InputMask from "../../../components/Form/InputMask";
import Select from "../../../components/Form/Select";
import styles from "./styles";
import ButtonSubmit from "../../../components/Form/ButtonSubmit";
import {verifyFildsClient} from "../../../services/tools";
const props = {
    close: Function ///fechar modal
}
export default function AddUser({isOpen,close} = props) {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [invalid, setInvalid] = useState(null);
    const [acess, setAcess] = useState("");

    const clear = ()=>{
        setFullName("");
        setEmail("");
        setCpfCnpj("");
        setInvalid(null);
        close(false);
    }

    const registerUser = (e)=>{
        e.preventDefault();
        if(!acess)
            return setInvalid({input:phoneNumber, message:"Selecione um cargo!"});

        if(invalid)
            return;

        
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
                
                <View style={styles.modal_main}>
                    <ScrollView >
                        <Text style={styles.title}>Cadastrar usuario</Text>

                        <View style={styles.form}>
                            <InputText
                                label="Nome e Sobrenome"
                                value={fullName}
                                setValue={setFullName}
                                onBlur={checkIsValid}
                                invalid={invalid?.input === fullName ? invalid?.message : null}
                            />

                            <InputText
                                type="email"
                                label="E-mail"
                                value={email}
                                setValue={setEmail}
                                invalid={invalid?.input === email ? invalid?.message : null}
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
                                onBlur={checkIsValid}
                                invalid={invalid?.input === cpfCnpj ? invalid?.message : null}
                            />

                            <View style={styles.select_wrap}>
                                <Select
                                    label="Cargo: "
                                    value={acess}
                                    setValue={setAcess}
                                    values={["Vendedor"]}
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
