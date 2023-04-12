import React, {useState, useEffect} from 'react'
import styles from "./styles.js";
import IPhoneCall from "../../assets/icons/phoneCall.js";
import IWhatsapp from "../../assets/icons/whatsapp.js";
import IEmailSend from "../../assets/icons/emailSend.js";
import IBusinessBuild from "../../assets/icons/businessBuild.js";
import IForm from "../../assets/icons/form.js";

import InputText from "form/InputText";
import InputMask from "form/InputMask";
import VMasker from "vanilla-masker";
import { TouchableOpacity, View, Text, ScrollView, Linking } from 'react-native';
import TableServices from "../ServicesActived/TableManager";
import Loading from "../../components/Loading";
import Callback from "../../components/Modal/Callback";
import API from "../../services/api";
import { formatDate } from "../../services/tools";

export default function Customer({route,navigation}) {
    const {id} = route.params;

    const [data, setData] = useState({});
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(null);

    const link = ({url})=> {
        Linking.canOpenURL(url).then((supported) => {
            return Linking.openURL(url);
        });
    }

    const getDataServices = async(load = true) => {

        try{
            if(load)
                setLoading(true);

            let res = await API.get(`Customer/${id}`).catch(err => err);
            if(load)
                setLoading(false);

            if(res?.error)
                throw new Error(res.error);
                
            res = res.map((val) =>{
                val.customerName = val?.customer?.firstName ? val?.customer?.firstName + " " + val?.customer?.lastName : "";
                val.service = val?.serviceOffered.name;
                val.updatedAt = formatDate(val?.updatedAt, true, true);
                val.customerId = val?.customer?.id;
                val.serviceId = val?.serviceOffered?.id;
                return val;
            })

            setServices(res);

        }catch(e){
            setCallback({
                message:e.message,
                actionName:"Ok!",
                action:()=>setCallback(null),
            });
        }
    }

    useEffect(()=>{
        setData({
            fullName: "Bruno da Silva",
            email:"bruno@gmail.com",
            phone:99999999999,
            cpfCnpj:99999999999999
        });
        getDataServices();
    },[])

    return (
        <ScrollView style={styles.users}>
            {loading ? <Loading loading2={loading} /> : <></>}
            <Callback params={callback} />
            <View style={styles.container}>

                <View style={styles.info_wrap}>


                        <View style={styles.info_single_wrap}>
                            <InputText
                                label="Nome"
                                editable={true}
                                value={data?.fullName}
                            />
                        </View>

                        <View style={styles.info_single_wrap}>
                            <InputText
                                label="E-mail"
                                editable={true}
                                value={data?.email}
                            />
                        </View>

                        <View style={styles.info_single_wrap}>
                            <InputMask
                                label="Telefone"
                                required={true}
                                value={data?.phone ? VMasker.toPattern(data?.phone,"(99) 99999-9999") : ""}
                                mask="phone"
                                editable={true}
                            />
                        </View>

                        <View style={styles.info_single_wrap}>
                            <InputMask
                                label="CNPJ"
                                required={true}
                                value={data?.cpfCnpj ? VMasker.toPattern(data?.cpfCnpj,"99.999.999/9999-99") : ""}
                                mask="phone"
                                editable={true}
                            />
                        </View>


                        <View style={styles.info_single_wrap}>
                            <InputText
                                label="Origem"
                                editable={true}
                                value={"Radio"}
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

                        <TouchableOpacity onPress={()=>link({url:`https://servicos.receita.fazenda.gov.br/servicos/cnpjreva/Cnpjreva_Solicitacao.asp?cnpj=${data?.cpfCnpj}`})} style={styles.btn}>
                            <View>
                                <IBusinessBuild style={[styles.actions_icon]}/> 
                            </View>
                            <Text style={styles.text}>Consultar CNPJ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={()=>navigation.navigate("Formulário fotovoltaico",{
                            name:data.fullName,
                            email:data.email,
                            phone:data.phone,
                            cpfCnpj:data.cpfCnpj
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

                    <TableServices data={services} setData={setServices} getData={getDataServices} onCustome={true} setLoading={setLoading} setCallback={setCallback} />
                </View>
            </View>
        </ScrollView>
    )
}
