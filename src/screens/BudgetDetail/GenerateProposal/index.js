import styles from "./styles";
import React, {useState} from "react";
import Modal from "../../../components/Modal";
import InputText from "../../../components/Form/InputText";
import InputMask from "../../../components/Form/InputMask";
import Checkbox from "../../../components/Form/Checkbox";
import API from "../../../services/api";
import LoadingPDF from "../../../assets/animation/loading_pdf.json";
import Loading from "../../../components/Loading";
import {toNumber} from "../../../services/tools";
import {View, Text, TouchableOpacity} from "react-native";
import ButtonSubmit from "../../../components/Form/ButtonSubmit";

export default function GenerateProposal({id}) {

    const [hasProposal, setHasProposal] = useState(false);
    const [isOpenGenerateProposal, setIsOpenGenerateProposal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [inverterBrand, setInverterBrand] = useState("");
    const [moduleBrand, setModuleBrand] = useState("");
    const [modulePower_kWp, setModulePower_kWp] = useState("");
    const [structureBrand, setStructureBrand] = useState("");
    const [materialCost, setMaterialCost] = useState("");
    const [includeMinimumProductionFee, setIncludeMinimumProductionFee] = useState(true);
    const [produceTip, setProduceTip] = useState(true);
    const [produceTime, setProduceTime] = useState(true);

    const [invalid, setInvalid] = useState(null);
    
    const generateProposal = async(e)=>{//a proposta tem validade de 3 dias. apos isso aparecer botão de gerar novamente
        e.preventDefault();
        setInvalid(null)
        if(!inverterBrand || !moduleBrand || !materialCost || !modulePower_kWp || !structureBrand || !materialCost)
            return setInvalid({input:"",message:"Campo obrigatório!"});

        if(toNumber(modulePower_kWp) > 1){
            return setInvalid({input:modulePower_kWp,message:"Valor muinto auto"});
        }



        let params = {
            "includeDataManually": true,
            "inverterBrand": inverterBrand,
            "moduleBrand": moduleBrand,
            "modulePower_kWp": toNumber(modulePower_kWp),
            "structureBrand": structureBrand,
            "materialCost": toNumber(materialCost),
            "includeMinimumProductionFee": includeMinimumProductionFee,
            "produceTip": produceTip,
            "produceTime": produceTime
        };

        setLoading(true);
        let res = await API.post("PVView/generate-budget/"+id,params);
        setLoading(false);
        
        if(res && !res.error && res.data?.id !== undefined){
            setHasProposal(true);
            close();
            console.log(res)
            let url = "/proposta/"+res.data?.id;

            var win = window.open(url, '_blank');
            win.focus();
            
        }

    }

    const download = async()=>{
        setLoading(true);
        let res = await API.downloadPDF({id,name:""});
        setLoading(false);
        if(res.error)
            return alert(res.error);

            // create file link in browser's memory
        const href = URL.createObjectURL(res.data);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', `${"name"}_proposta.pdf`); //or any other extension
        document.body.appendChild(link);
        link.click();
        
            // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }

    const close = ()=>{
        setIsOpenGenerateProposal(false);
    }

    return (
        <View>
            <Loading newLoading={loading} animation={LoadingPDF} />
            <View style={styles.actions_wrap}>
                {hasProposal
                    ? <TouchableOpacity style={[styles.btn, styles.btn_green]}>
                        <Text style={[styles.btn_text]}>Baixar Proposta</Text>
                    </TouchableOpacity>

                    : <TouchableOpacity onPress={()=>setIsOpenGenerateProposal(true)} style={styles.btn}>
                        <Text style={[styles.btn_text]}>Gerar Proposta</Text>
                    </TouchableOpacity>
                }
            </View>

            <Modal isOpen={isOpenGenerateProposal} close={close} title="Parametros da proposta" >
                <View style={styles.form}>
                    <View>
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
                            label="Potência dos Módulos (kWh)"
                            required={true}
                            value={modulePower_kWp}
                            setValue={setModulePower_kWp}
                            invalid={invalid?.input === modulePower_kWp ? invalid?.message : null}
                            precision={3}
                        />

                        <InputMask
                            keyboardType="number-pad"
                            mask="BRL_CURRENCY"
                            label="Custo do material"
                            required={true}
                            value={materialCost}
                            setValue={setMaterialCost}
                            invalid={invalid?.input === materialCost ? invalid?.message : null}
                        />
                    </View>

                    <View style={styles.checkbox_wrap}>
                        <Checkbox
                            label={"Incluir taxa minima de produção"}
                            value={includeMinimumProductionFee}
                            setValue={setIncludeMinimumProductionFee}
                        />

                        <Checkbox
                            label={"produceTip"}
                            value={produceTip}
                            setValue={setProduceTip}
                        />

                        <Checkbox
                            label={"produceTime"}
                            value={produceTime}
                            setValue={setProduceTime}
                        />
                    </View>

                    <View style={styles.btn_wrap}>

                        <ButtonSubmit styles={styles.btn_red} onPress={close} value={"Cancelar"} />
                        <ButtonSubmit styles={styles.btn_submit} onPress={generateProposal} value={"Gerar proposta"} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}
