import styles from "./styles";
import React, {useState} from "react";
import Modal from "../../../components/Modal";
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
import Select from "../../../components/Form/Select";
import FileSystem from "react-native-fs";
import selectOptions from "../../../data/selectOptions.json";
import Textarea from "../../../components/Form/Textarea";
export default function GenerateProposal({id,customerName}) {

    const [hasProposalId, setHasProposalId] = useState(null);
    const [isOpenGenerateProposal, setIsOpenGenerateProposal] = useState(false);

    const [supplier, setSupplier] = useState(0);

    const [includeLightRateValue, setIncludeLightRateValue] = useState(true);
    const [produceTip, setProduceTip] = useState(true);
    const [produceTime, setProduceTime] = useState(true);
    const [extraValueOrDiscount, setExtraValueOrDiscount] = useState("");
    const [extraOrDiscountDescription, setExtraOrDiscountDescription] = useState("");
    const [isExtraOrDiscount, setIsExtraOrDiscount] = useState(0);
    const [solarIrradiation, setSolarIrradiation] = useState("4.50");

    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(null);
    const [progress, setProgress] = useState(0);

    const [invalid, setInvalid] = useState(null);
    
    const generateProposal = async()=>{//a proposta tem validade de 3 dias. apos isso aparecer botão de gerar novamente
        setInvalid(null)
        if(hasProposalId){
            return download(hasProposalId);
        }
        let solarInradiationNumber = toNumber(solarIrradiation);
        if(solarInradiationNumber <= 0){
            setInvalid({input:solarIrradiation,message:"Digite um valor valido"});
            return;
        }

        let extraOrDiscount = toNumber(extraValueOrDiscount);
        if(isExtraOrDiscount === 2)//mudar valor para negativo caso seja desconto
            extraOrDiscount = extraOrDiscount - extraOrDiscount - extraOrDiscount;
        
        let params = {
            "selectedSupplier": parseInt(supplier),
            "includeLightRateValue": includeLightRateValue,
            "produceTip": produceTip,
            "produceTime": produceTime,
            "solarIrradiation": toNumber(solarIrradiation),
            "extraValueOrDiscount": extraOrDiscount,
            "idPVForm": parseInt(id)
        };

        setLoading(true);
        let res = await API.post("PVForm/get-quote",params).catch(e => e);
        setLoading(false);
        
        setIsOpenGenerateProposal(false);
        let proposalId = res.data?.id;
        if(res && !res.error && proposalId !== undefined){
            setHasProposalId(proposalId);
            download(proposalId);
            return;
        }

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
                        <Select 
                            label={"Fornecedor"}
                            value={selectOptions.supplier[supplier]}
                            values={selectOptions.supplier}
                            setValue={setSupplier}
                            required={true}
                            labelTop={true}
                        />

                        <InputMask
                            keyboardType="number-pad"
                            label={"Irradiação Solar (4.44 Wh/m² a 5.48 Wh/m²)"}
                            value={solarIrradiation.replace(/,/g,".")}
                            setValue={setSolarIrradiation}
                            required={true}
                            precision={2}
                            invalid={invalid?.input === solarIrradiation ? invalid?.message : null}
                        />

                    </View>

                    <View style={styles.checkbox_wrap}>
                        <Checkbox
                            label={"incluir taxa mínima?"}
                            value={includeLightRateValue}
                            setValue={setIncludeLightRateValue}
                        />

                        {/* <Checkbox
                            label={"Produzir ponta?"}
                            value={produceTip}
                            setValue={setProduceTip}
                        /> */}

                        <Checkbox
                            label={"Desconto irrigante?"}
                            value={produceTime}
                            setValue={setProduceTime}
                        />
                    </View>

                    <View style={styles.extra_wrap}>
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

                                <Textarea
                                    label="Motivo do valor"
                                    value={extraOrDiscountDescription}
                                    setValue={setExtraOrDiscountDescription}
                                    required={true}
                                />
                            </View>
                        }
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
