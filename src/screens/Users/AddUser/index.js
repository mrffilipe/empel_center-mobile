import React, {useState} from 'react'
import {Modal, ScrollView, View, Text} from 'react-native';
import InputText from "../../../components/Form/InputText";
import InputMask from "../../../components/Form/InputMask";
import Select from "../../../components/Form/Select";
import styles from "./styles";
import ButtonSubmit from "../../../components/Form/ButtonSubmit";
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
        let [name, lastName] = fullName.split(" ");
        if(!name || !lastName)
            return setInvalid(fullName);

        if(!email)   
            return setInvalid(email);

        
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
                                valid={invalid !== fullName}
                            />

                            <InputText
                                type="email"
                                label="E-mail"
                                value={email}
                                setValue={setEmail}
                                valid={invalid !== email}
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
                                <ButtonSubmit value={"Cancelar"} onPress={close}  styles={[styles.btn, styles.btn_close]}/>
                                <ButtonSubmit value={"Cadastrar"} onPress={registerUser}  styles={[styles.btn]}/>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                
            </View>
        </Modal>
    )
}
