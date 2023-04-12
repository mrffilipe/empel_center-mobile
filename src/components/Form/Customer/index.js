import React from 'react'
import InputText from "../InputText";
import InputMask from "../InputMask";
import Select from "../Select";
import {verifyFildsClient} from "../../../services/tools";
import selectOptions from "../../../data/selectOptions.json";
import {View} from 'react-native';

export default function AddUser({
    fullName, setFullName,
    email, setEmail,
    cpfCnpj, setCpfCnpj,
    invalid, setInvalid,
    origin, setOrigin,
    company, setCompany,
    phones, setPhones,
    originRequired = true,
}) {

    const checkIsValid = ()=>{
        setInvalid(null);
        verifyFildsClient({
            setInvalid, 
            fullName, 
            cpfCnpj,
            phoneNumber:phones[0].number,
            email,
        })
    }

    return (
        <View id="form-customer">
            <InputText
                label="Nome Completo"
                value={fullName}
                setValue={setFullName}
                required={true}
                invalid={invalid?.input === fullName ? invalid?.message : null}
                onBlur={checkIsValid}
            />

            <InputText
                type="email"
                label="E-mail"
                value={email}
                setValue={setEmail}
                required={true}
                invalid={invalid?.input === email ? invalid?.message : null}
                onBlur={checkIsValid}
            />
    
            <InputMask
                label="CPF/CNPJ"
                required={true}
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
                required={true}
                value={phones[0].number}
                setValue={(number)=>{
                    phones[0].number = number;
                    setPhones([...phones]);
                }} 
                mask="BRL_PHONE"
                keyboardType="number-pad"
                onBlur={checkIsValid}
                invalid={invalid?.input === phones[0].number ? invalid?.message : null}
            />

            <InputText
                label="Empresa"
                value={company}
                setValue={setCompany}
            />

            <Select
                label="Origem"
                value={selectOptions.leadOrigin[origin]}
                setValue={setOrigin}
                values={selectOptions.leadOrigin}
                required={originRequired}
                labelTop={true}
                invalid={invalid?.input === origin ? invalid?.message : null}
            />
        </View>

    )
}
