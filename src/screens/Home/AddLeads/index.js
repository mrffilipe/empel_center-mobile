import React, {useState} from 'react'
import {View, Text} from 'react-native';
import InputText from "../../../components/Form/InputText";
import InputMask from "../../../components/Form/InputMask";
import styles from "./styles";
import ButtonSubmit from "../../../components/Form/ButtonSubmit";

import Modal from "../../../components/Modal";
const props = {
    close: Function ///fechar modal
}
export default function AddCity({isOpen,close} = props) {


    const [name, setName] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [invalid, setInvalid] = useState(null);

    const clear = ()=>{
        setName("");
        setCpfCnpj("");
        setEmail("");
        setPhoneNumber("");
        setInvalid(null);
        close(false);
    }

    const registerUser = (e)=>{
        e.preventDefault();
        if(!name)
            return setInvalid(name);
        
    }

    return (
        <Modal isOpen={isOpen}>
            <Text style={styles.title}>Cadastrar Leads</Text>

            <View style={styles.form}>

                <InputText
                    label="Nome"
                    value={name}
                    setValue={setName}
                    invalid={invalid?.input === name ? invalid?.message : null}
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
                />

                <InputMask
                    label="Telefone"
                    value={phoneNumber}
                    setValue={setPhoneNumber}
                    mask="BRL_PHONE"
                    keyboardType="number-pad"
                    invalid={invalid?.input === phoneNumber ? invalid?.message : null}
                />

                <InputText
                    label="E-mail"
                    value={email}
                    setValue={setEmail}
                    type="email"
                    invalid={invalid?.input === email ? invalid?.message : null}
                />

                <View style={styles.btn_wrap}>
                    <ButtonSubmit value={"Cancelar"} onPress={clear}  styles={[styles.btn, styles.btn_close]}/>
                    <ButtonSubmit value={"Cadastrar"} onPress={registerUser}  styles={[styles.btn]}/>
                </View>
            </View>
        </Modal>
    )
}
