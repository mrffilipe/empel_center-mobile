import React, {useState, useEffect} from 'react'
import {Modal, ScrollView, View, Text} from 'react-native';
import InputText from "../../../components/Form/InputText";
import InputMask from "../../../components/Form/InputMask";
import Select from "../../../components/Form/Select";
import styles from "./styles";
import ButtonSubmit from "../../../components/Form/ButtonSubmit";
import {verifyFildsClient, documentType, toNumber} from "../../../services/tools";
import API from "../../../services/api";
import VMasker from 'vanilla-masker';
import { useAuthContext } from '../../../contexts/authContext';
import { useMainContext } from '../../../contexts/mainContext';
import Callback from "../../../components/Modal/Callback";
import Loading from "../../../components/Loading";
import selectOptions from "../../../data/selectOptions.json";

const props = {
    isOpen: Boolean,
    updateUsers: Function,
    close: Function //fechar modal
}

export default function AddSupplier({isOpen, close} = props) {

    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(null);
    const {customers, getCustomers, services, getServicesActives} = useMainContext();

    const [idCustomer, setIdCustomer] = useState("");
    const [idService, setIdService] = useState("");

    const handleSubmit = async()=>{

        try{
            setLoading(true);
            
            let params = {
                idCustomer: parseInt(idCustomer),
                idServiceOffered:parseInt(idService),
            }

            let res = await API.post("ActiveService",params).catch(err => err);

            if(res.error){
                throw new Error(res.error);
            }

            getServicesActives(true);
            clearFilds(true);
        }catch(e){
            setCallback({
                message:e.message,
                actionName:"Ok!",
                action:()=>setCallback(null),
            });
        }finally{
            setLoading(false);
        }
    }

    const clearFilds = (closeTo = true)=>{
        setIdCustomer("");
        setIdService("");

        if(closeTo)
            close();
    }

    const customersFormatedToSelect = customers.map(val => {
        return {name:val?.fullName, id:val?.id};
    });

    const servicesFormatedToSelect = services.map(val => {
        return {name:val?.name, id:val?.id};
    });

    const getValueSelectById = (arr,id)=>{
        if(!id)
            return "";
        return arr.filter((val) => val.id === id)[0].name;
    }

    useEffect(()=>{
        if(!customers.length)
            getCustomers(false);
    });

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
                        <Text style={styles.title}>Adicionar Serviço</Text>

                        <View style={styles.form}>
                            <View>

                                <Select 
                                    label={"Cliente"}
                                    value={getValueSelectById(customersFormatedToSelect,idCustomer)}
                                    setValue={setIdCustomer}
                                    labelTop={true}
                                    values={customersFormatedToSelect}
                                    required={true}
                                />

                                <Select 
                                    label={"Serviço"}
                                    value={getValueSelectById(servicesFormatedToSelect,idService)}
                                    setValue={setIdService}
                                    labelTop={true}
                                    values={servicesFormatedToSelect}
                                    required={true}
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
