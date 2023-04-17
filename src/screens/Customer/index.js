import React, {useState, useEffect} from 'react'
import styles from "./styles.js";
import IPhoneCall from "../../assets/icons/phoneCall.js";
import IWhatsapp from "../../assets/icons/whatsapp.js";
import IEmailSend from "../../assets/icons/emailSend.js";
import IBusinessBuild from "../../assets/icons/businessBuild.js";
import IForm from "../../assets/icons/form.js";
import IMap from "../../assets/icons/mapMark.js";

import InputText from "form/InputText";
import InputMask from "form/InputMask";
import VMasker from "vanilla-masker";
import { TouchableOpacity, View, Text, ScrollView, Linking } from 'react-native';
import TableServices from "../ServicesActived/TableManager";
import Loading from "../../components/Loading";
import Callback from "../../components/Modal/Callback";
import API from "../../services/api";
import { formatDate } from "../../services/tools";
import enumData from "../../data/enum.json";
import selectOptions from "../../data/selectOptions.json";

export default function Customer({route,navigation}) {
    const {id} = route.params;

    const [data, setData] = useState({});
    // const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(null);

    const link = ({url})=> {
        Linking.canOpenURL(url).then((supported) => {
            return Linking.openURL(url);
        });
    }

    const getData = async(load = true) => {
        try{
            if(load)
                setLoading(true);

            let res = await API.get(`Customer/${id}`).catch(err => err);
            if(load)
                setLoading(false);
            
            if(res?.error)
                throw new Error(res.error);

            res.fullName = res?.firstName+" "+res?.lastName;
            res.phone = res?.telephones[0]?.number;
            res.cityAndCountry = `${res?.address?.city} ${res?.address?.state}-${res?.address?.country}`;
            res.streetAndNumber = res?.address?.street+" "+res?.address?.number;
            setData(res);

        }catch(e){
            setCallback({
                message:"Não foi possivel obter dados!",
                actionName:"Ok!",
                action:()=>setCallback(null),
            });
        }
    }

    const getMapsUrl = ()=>{
        let coordenates = data?.address?.coordinates;
        if(!coordenates) return "";

        if(!coordenates?.latitude && !coordenates?.longitude){ 
            let address = `${data?.streetAndNumber} ${data?.cityAndCountry}`;
            address = address.replace(/ /g, '+');
            return `http://maps.google.com/?q=${address}`;
        }
        return `http://maps.google.com/maps?q=${coordenates?.latitude},${coordenates?.longitude}`;
    }

    const formatAtivity = (res) =>{

        res = res.map((val) =>{
            val.customerName = val?.customer?.firstName ? val?.customer?.firstName + " " + val?.customer?.lastName : "";
            val.service = val?.serviceOffered.name;
            val.updated = formatDate(val?.updatedAt, true, true);
            val.customerId = val?.customer?.id;
            val.serviceId = val?.serviceOffered?.id;
            val.status = selectOptions.activeServiceStatus[enumData.activeServiceStatus[val?.status]]?.name;
            return val;
        });

        return res;
    }

    useEffect(()=>{
        getData()
    },[]);

    return (
        <ScrollView style={styles.users}>
            {loading ? <Loading loading2={loading} /> : <></>}
            <Callback params={callback} />
            <View style={styles.container}>
                <View style={styles.info_wrap_text}>
                    <Text style={styles.h2}>Sobre</Text>
                </View>
                <View style={styles.info_wrap}>

                        <View style={styles.info_single_wrap}>
                            <InputText
                                label="Nome"
                                editable={false}
                                value={data?.fullName}
                            />
                        </View>

                        <View style={styles.info_single_wrap}>
                            <InputText
                                editable={false}
                                label="Empresa"
                                value={data.company}
                            />
                        </View>

                        <View style={styles.info_single_wrap}>
                            <InputText
                                label="E-mail"
                                editable={false}
                                value={data?.email}
                            />
                        </View>

                        <View style={styles.info_single_wrap}>
                            <InputMask
                                label="Telefone"
                                value={data?.phone ? VMasker.toPattern(data?.phone,"(99) 99999-9999") : ""}
                                mask="phone"
                                editable={false}
                            />
                        </View>

                        <View style={styles.info_single_wrap}>
                            <InputMask
                                label={data?.document?.documentType === 0 ? "CPF":"CNPJ"}
                                value={data?.document ? VMasker.toPattern(data?.document?.record ?? "",data?.document?.documentType === 0 ? "999.999.999-99" :"99.999.999/9999-99") : ""}
                                mask="phone"
                                editable={false}
                            />
                        </View>


                        <View style={styles.info_single_wrap}>
                            <InputText
                                label="Origem"
                                value={data?.leadOrigin ?? ""}
                                editable={false}
                            />
                        </View>

                
                </View>

                <View style={styles.info_wrap_text}>
                    <Text style={styles.h2}>Endereço</Text>
                </View>
                <View style={styles.info_wrap}>

                    <View style={styles.info_single_wrap}>
                        <InputText
                            label="Cidade"
                            editable={false}
                            value={data?.cityAndCountry ?? ""}
                        />
                    </View>

                    <View style={styles.info_single_wrap}>
                        <InputText
                            editable={false}
                            label="Rua"
                            value={data?.streetAndNumber ?? ""}
                        />
                    </View>

                    <View style={styles.info_single_wrap}>
                        <InputText
                            editable={false}
                            label="Bairro"
                            value={data?.address?.neighborhood ?? ""}
                        />
                    </View>

                    <View style={styles.info_single_wrap}>
                        <InputMask
                            label="Complemento"
                            value={data?.address?.complement ?? ""}
                            editable={false}
                        />
                    </View>
                
                </View>


                <View style={styles.actions_wrap}>
                    <Text style={styles.h2}>Ações</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity onPress={()=>link({url:`tel:55${data?.phone}`})} style={styles.btn}>
                            <View>
                                <IPhoneCall style={[styles.actions_icon]}/> 
                            </View>
                            <Text style={styles.text}>Ligar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>link({url:`https://api.whatsapp.com/send?phone=55${data?.phone}`})} style={styles.btn}>
                            <View>
                                <IWhatsapp style={[styles.actions_icon]}/> 
                            </View>
                            <Text style={styles.text}>WhatsApp</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>link({url:`mailto:${data?.email}`})} style={styles.btn}>
                            <View>
                                <IEmailSend style={[styles.actions_icon]}/> 
                            </View>
                            <Text style={styles.text}>E-mail</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>link({url:getMapsUrl()})} style={styles.btn}>
                            <View>
                                <IMap style={[styles.actions_icon]}/> 
                            </View>
                            <Text style={styles.text}>Localizar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>link({url:`https://servicos.receita.fazenda.gov.br/servicos/cnpjreva/Cnpjreva_Solicitacao.asp?cnpj=${data?.cpfCnpj}`})} style={styles.btn}>
                            <View>
                                <IBusinessBuild style={[styles.actions_icon]}/> 
                            </View>
                            <Text style={styles.text}>Consultar CNPJ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={()=>navigation.navigate("Formulário fotovoltaico",{
                            data,
                        })} 
                        style={styles.btn}>

                            <View>
                                <IForm style={[styles.actions_icon]}/> 
                            </View>
                            <Text style={styles.text}>Preencher formulário</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.actions_wrap}>
                    <Text style={styles.h2}>Serviços ativos</Text>

                    <TableServices data={formatAtivity(data?.activeService ?? [])} getData={getData} onCustome={true} setLoading={setLoading} setCallback={setCallback} />
                </View>
            </View>
        </ScrollView>
    )
}
