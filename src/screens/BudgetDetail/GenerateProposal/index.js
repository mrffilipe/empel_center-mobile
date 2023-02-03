import styles from "./styles";
import React, {createRef, useState} from "react";
import Modal from "../../../components/Modal";
import InputText from "../../../components/Form/InputText";
import InputMask from "../../../components/Form/InputMask";
import Checkbox from "../../../components/Form/Checkbox";
import API from "../../../services/api";
import LoadingPDF from "../../../assets/animation/loading_pdf.json";
import {toNumber} from "../../../services/tools";
import {View, Text, TouchableOpacity} from "react-native";
import ButtonSubmit from "../../../components/Form/ButtonSubmit";
import ITrash from "../../../assets/icons/trash";
import Loading from "../../../components/Loading";
import Callback from "../../../components/Modal/Callback";
import Share from "react-native-share";
import FileViewer from 'react-native-file-viewer';

import FileSystem from "react-native-fs";

export default function GenerateProposal({id,customerName}) {

    const [hasProposalId, setHasProposalId] = useState(null);
    const [isOpenGenerateProposal, setIsOpenGenerateProposal] = useState(false);

    const [inverterBrand, setInverterBrand] = useState("");
    const [moduleBrand, setModuleBrand] = useState("");
    const [modulePower_kWp, setModulePower_kWp] = useState("0");
    const [structureBrand, setStructureBrand] = useState("");
    const [materialCost, setMaterialCost] = useState("");
    const [includeMinimumProductionFee, setIncludeMinimumProductionFee] = useState(true);
    const [produceTip, setProduceTip] = useState(true);
    const [produceTime, setProduceTime] = useState(true);
    const [supplierName, setSupplierName] = useState("");
    const [extraValueOrDiscount, setExtraValueOrDiscount] = useState("");
    const [isExtraOrDiscount, setIsExtraOrDiscount] = useState(0)

    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(null);
    const [progress, setProgress] = useState(0);

    const [invalid, setInvalid] = useState(null);
    
    const generateProposal = async()=>{//a proposta tem validade de 3 dias. apos isso aparecer botão de gerar novamente
        setInvalid(null)
        if(!inverterBrand || !moduleBrand || !materialCost || !modulePower_kWp || !structureBrand || !materialCost)
            return setInvalid({input:"",message:"Campo obrigatório!"});

        if(toNumber(modulePower_kWp) > 1){
            return setInvalid({input:modulePower_kWp,message:"Valor muinto auto"});
        }

        let extraOrDiscount = toNumber(extraValueOrDiscount);
        
        if(isExtraOrDiscount === 2)//mudar valor para negativo
            extraOrDiscount = extraOrDiscount - extraOrDiscount - extraOrDiscount;

        let params = {
            "includeLightRateValue": includeMinimumProductionFee,
            "produceTip": produceTip,
            "produceTime": produceTime,
            "extraValueOrDiscount": extraOrDiscount,
            "pvSupplier": {
                "supplierName": supplierName,
                "inverterBrand": inverterBrand,
                "moduleBrand": moduleBrand,
                "modulePower": toNumber(modulePower_kWp),
                "structureBrand": structureBrand,
                "materialCost": toNumber(materialCost)
            },
            "idPVForm": parseInt(id)
        }

        setLoading(true);
        let res = await API.post("PVForm/get-quote",params).catch(e => e);
        
        setIsOpenGenerateProposal(false);
        if(res && !res.error && res.data?.id !== undefined){
            setHasProposalId(res.data?.id);
            download(res.data?.id);
            return;
        }

        setLoading(false);
        return setCallback({
            type: 0,
            message:res?.error ? res.error : `Algo deu errado!`,
            action:()=>generateProposal(),
            actionName:"Tentar Novamente",
            close:()=>setCallback(null)
        })
    }

    const calcProgress = (bites)=>{
        let percentage = (bites.bytesWritten / bites.contentLength) * 100;
        if(progress < parseInt(percentage))
            setProgress(parseInt(percentage));
    }


    const download = async(proposalId)=>{
        try{ 
            setLoading(true);
            let fileUri = `${FileSystem.DocumentDirectoryPath}/proposta_${id}_${customerName.replace(/ /,"-")}.pdf`;
            let res = await API.downloadPDF({id:proposalId,fileUri, progress:calcProgress}).catch(e => e);
            setProgress(100);
            setTimeout(() => {
                setLoading(false);
                setProgress(0);
            }, 500);
            

            if(res?.error || !res){
                return setCallback({
                    type: 0,
                    message:res?.error ? res.error : `Algo deu errado!`,
                    action:()=>download(proposalId),
                    actionName:"Tentar Novamente",
                    close:()=>setCallback(null)
                })
            }

            FileViewer.open("file://"+fileUri, { showOpenWithDialog: true })//abrir arquivo
            .catch(error => {
                share({ //compartilhar arquivo
                    title: "Empel proposta fotovoltaco",
                    message: "",
                    url: "file://"+fileUri,
                    type: 'application/pdf',
                }).catch(e =>{})
            });

        }catch(e){
            setLoading(false);
        }
    }

    const changenExtraOrDiscount = (type)=>{
        setIsExtraOrDiscount(type);
    }

    const close = ()=>{
        setIsOpenGenerateProposal(false);
    }

    const share = async (customOptions = options) => {
        try {
            await Share.open(customOptions);
        } catch (err) {

        }
    };

    return (
        <View>
            <Loading loading2={loading} animation={LoadingPDF} progress={progress} />
            <Callback params={callback}/>
            <View style={styles.actions_wrap}>

                {hasProposalId
                    ? <TouchableOpacity onPress={()=>download(hasProposalId)} style={[styles.btn, styles.btn_green]}>
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
                            label="Nome do fornecedor"
                            required={true}
                            value={supplierName}
                            setValue={setSupplierName}
                            invalid={invalid?.input === supplierName ? invalid?.message : null}
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

                        {!isExtraOrDiscount?
                            <View style={styles.add_extra_or_discount}>
                                <Text style={styles.add_extra_or_discount_h3}>Adicionar</Text>
                                <View style={styles.add_extra_or_discount_div}>
                                    <TouchableOpacity onPress={()=>changenExtraOrDiscount(1)} style={styles.add_extra_or_discount_button}>
                                        {/* <BiPlus /> */}
                                        <Text style={styles.add_extra_or_discount_button_text}>Valor extra</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>changenExtraOrDiscount(2)} style={styles.add_extra_or_discount_button}>
                                        {/* <BiPlus /> */}
                                        <Text style={styles.add_extra_or_discount_button_text}>Desconto</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        :
                            <View style={styles.extra_or_discount}>
                                <InputMask
                                    keyboardType="number-pad"
                                    mask="BRL_CURRENCY"
                                    label={isExtraOrDiscount === 1? "Valor extra" : "Valor desconto"}
                                    required={true}
                                    value={extraValueOrDiscount}
                                    setValue={setExtraValueOrDiscount}
                                    invalid={invalid?.input === extraValueOrDiscount ? invalid?.message : null}
                                />

                                <TouchableOpacity onPress={()=>changenExtraOrDiscount(0)} style={styles.extra_or_discount_button}>
                                    <ITrash style={[styles.icon_trash]}/>
                                </TouchableOpacity>
                            </View>
                        }
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
