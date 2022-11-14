import React from 'react';
import styles from '../styles';
import {View, Text}  from "react-native";
import InputText from "../../../components/Form/InputText";
import InputMask from "../../../components/Form/InputMask";

export default function CustomerGroup({
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
}){
    return(
        <View>
           <Text style={[styles.subtitle,styles.subtitle_first]}>Cliente</Text>

            <InputText
                label="Nome"
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
        </View>
    )
}