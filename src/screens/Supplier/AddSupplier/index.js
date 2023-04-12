import React, {useState} from 'react'
import {Modal, ScrollView, View, Text} from 'react-native';
import InputText from "../../../components/Form/InputText";
import InputMask from "../../../components/Form/InputMask";
import Select from "../../../components/Form/Select";
import styles from "./styles";
import ButtonSubmit from "../../../components/Form/ButtonSubmit";
import {verifyFildsClient, documentType, toNumber} from "../../../services/tools";
import api from "../../../services/api";
import VMasker from 'vanilla-masker';
import { useAuthContext } from '../../../contexts/authContext';
import Callback from "../../../components/Modal/Callback";
import Loading from "../../../components/Loading";
import selectOptions from "../../../data/selectOptions.json";

const props = {
    isOpen: Boolean,
    updateUsers: Function,
    close: Function ///fechar modal
}
export default function AddSupplier({isOpen, close, updateSupplier} = props) {

    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(null);

    const [inverterBrand, setInverterBrand] = useState("");
    const [moduleBrand, setModuleBrand] = useState("");
    const [modulePower, setModulePower] = useState("");
    const [structureBrand, setStructureBrand] = useState("");
    const [supplierName, setSupplierName] = useState("");
    const [supplier, setSupplier] = useState("");
    const [inverterPower, setInverterPower] = useState("");

    const [invalid, setInvalid] = useState(null);

    const handleSubmit = async(e)=>{//a proposta tem validade de 3 dias. apos isso aparecer botão de gerar novamente
        e.preventDefault();
        setInvalid(null)

        if(!inverterBrand || !moduleBrand || !modulePower || !structureBrand)
            return setInvalid({input:"",message:"Campo obrigatório!"});

        if(toNumber(modulePower) > 1){
            return setInvalid({input:modulePower,message:"Valor muinto auto"});
        }

        if(!toNumber(modulePower))
            return setInvalid({input:modulePower,message:"Adicione um valor!"});

        if(!toNumber(inverterPower))
            return setInvalid({input:inverterPower,message:"Adicione um valor!"});

        let params = {
            supplierName,
            supplier,
            inverterBrand,
            inverterPower:toNumber(inverterPower),
            moduleBrand,
            modulePower:toNumber(modulePower),
            structureBrand
        }

        try{
            setLoading(true);
            let res = await api.post("PVForm/pvSupplier",params).catch(e => e);
            

            if(res.error)
                throw new Error(res.error);

            setCallback({
                message:"Fornecedor cadastrado",
                action:()=>{
                    setCallback(null);
                    clearFilds(true);
                },
                actionName:"Ok!",
                type:1
            })

            
            updateSupplier();
        }catch(e){
            setCallback({
                message:e.message,
                action:()=>setCallback(null),
                actionName:"Ok!"
            })
        }
        setLoading(false);
    }

    const clearFilds = (closeModal = true)=>{
        setInverterBrand("");
        setModuleBrand("");
        setModulePower("");
        setStructureBrand("");
        setSupplier("");
        setInverterPower("");
        setSupplierName("");
        if(closeModal)
            close();
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
                            <View>
                                <InputText
                                    label="Nome do Fornecedor"
                                    required={true}
                                    value={supplierName}
                                    setValue={setSupplierName}
                                    invalid={invalid?.input === supplierName ? invalid?.message : null}
                                    open={true}
                                />

                                <Select 
                                    label={"Fornecedor"}
                                    value={selectOptions.supplier[supplier]}
                                    values={selectOptions.supplier}
                                    setValue={setSupplier}
                                    required={true}
                                    labelTop={true}
                                    invalid={invalid?.input === supplier ? invalid?.message : null}
                                />

                                <InputText
                                    label="Marca do Inversor"
                                    required={true}
                                    value={inverterBrand}
                                    setValue={setInverterBrand}
                                    invalid={invalid?.input === inverterBrand ? invalid?.message : null}
                                />

                                <InputText
                                    label="Marca do Módulo"
                                    required={true}
                                    value={moduleBrand}
                                    setValue={setModuleBrand}
                                    invalid={invalid?.input === moduleBrand ? invalid?.message : null}
                                />

                                <InputText
                                    label="Marca da Estrutura"
                                    required={true}
                                    value={structureBrand}
                                    setValue={setStructureBrand}
                                    invalid={invalid?.input === structureBrand ? invalid?.message : null}
                                />

                                <InputMask
                                    keyboardType="number-pad"
                                    mask="KWH"
                                    label="Potência do Inversor (kWh)"
                                    required={true}
                                    value={inverterPower}
                                    setValue={setInverterPower}
                                    invalid={invalid?.input === inverterPower ? invalid?.message : null}
                                />

                                <InputMask
                                    keyboardType="number-pad"
                                    mask="KWH"
                                    label="Potência dos Módulos (kWh)"
                                    required={true}
                                    value={modulePower}
                                    setValue={setModulePower}
                                    invalid={invalid?.input === modulePower ? invalid?.message : null}
                                />

                            </View>

                            <View style={styles.btn_wrap}>
                                <ButtonSubmit styles={[styles.btn,styles.btn_close]} onPress={close} value={"Cancelar"} />
                                <ButtonSubmit styles={[styles.btn,styles.btn_submit]} onPress={handleSubmit} value={"Salvar"} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                
            </View>
        </Modal>
    )
}
