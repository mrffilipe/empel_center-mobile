import React, {useState, useEffect} from 'react'
import {View, Text} from 'react-native';
import InputText from "../../Form/InputText";
import InputMask from "../../Form/InputMask";
import Select from "../../Form/Select";
import styles from "./styles";
import ButtonSubmit from "../../Form/ButtonSubmit";
import Cityes from "../../../services/cityes.json";
import countries from "../../../services/countries.json";
import Modal from "../";
import {useMainContext} from "../../../contexts/mainContext";
import API from "../../../services/api";
import {useAuthContext} from "../../../contexts/authContext";
import Loading from "../../Loading";
import Callback from "../Callback";
const props = {
    isOpen:Boolean,
    close: Function, ///fechar modal
    values:{
        "name": String,
        "state": String,
        "country": String,
        "constant": String,
    }
}

export default function AddCity({isOpen,close, values} = props) {
    const {getCities, cities, setCities} = useMainContext();
    const {user} = useAuthContext();

    const [name, setName] = useState("");
    const [state, setState] = useState("GO");
    const [country, setCountry] = useState("BR");
    const [constant, setConstant] = useState("")
    const [invalid, setInvalid] = useState(null);

    const [callback, setCallback] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const clear = ()=>{
        setName("");
        setConstant("");
        setInvalid(null);
        close(false);
    }

    const registerCity = async()=>{
        if(!name)
            return;

        let params = {
            "citie": name,
            "state": state,
            "country": country,
            "constant": constant,
        }

        setLoading(true);
        let res = await API.post({
            route:"/Address",
            body:params
        });
        setLoading(false);

        addNewCity(params);
        
        if(res.error)
            return setCallback({
                type: 0,
                message:res.error,
                action:closeCallback,
                actionName:"Ok!"
            })

            console.log(res);
        getCities();
        // clear()
    }

    const addNewCity = (params)=>{
        let res = true;
        cities.map((val)=>{
            if(val?.citie === params?.citie && val?.country === params?.country && val?.state === params?.state){
                res = false;
            }
        })

        if(res){
            params.id = name+"_"+state;
            setCities([...cities,params])
        }
    }

    const closeCallback = ()=>{
        setCallback(null);
    }

    useEffect(()=>{
        if(values){
            setName(values?.name);
            setCountry(values?.country);
            setState(values?.state);
            setConstant(values?.constant? values?.constant : "");
        }
    },[values])

    return (
        <>
        <Loading loading2={loading}/>
        <Callback params={callback} close={closeCallback} />
        <Modal isOpen={isOpen}>
            

            <Text style={styles.title}>Cadastrar Cidade</Text>

            <View style={styles.form}>
                

            {!values?
                <>
                    {country === "BR" ?
                        <Select
                            label="Nome"
                            value={name}
                            setValue={setName}
                            valid={invalid !== name}
                            values={Cityes[country]? Cityes[country].estados.filter(val => val.sigla === state)[0]?.cidades:[]}
                            labelTop={true}
                        />
                    :
                        <InputText
                            label="Nome"
                            value={name}
                            setValue={setName}
                            valid={invalid !== name}
                        />
                    }
                </>
                :
                <InputText
                    label="Nome"
                    value={name}
                    editable={false}
                />
            }

                <View style={styles.select_wrap}>
                    <View style={styles.select_single}>
                    {!values?
                        <>
                            {Cityes[country] ?
                                <Select
                                    label="Estado"
                                    value={state}
                                    setValue={setState}
                                    values={Cityes[country]? Cityes[country].estados.map(val => val.sigla).sort():[]}

                                    labelTop={true}
                                />
                                :
                                <InputText
                                    label="Estado"
                                    value={state}
                                    setValue={setState}
                                />
                            }
                        </>
                        :
                        <InputText
                            label="Estado"
                            value={state}
                            editable={false}
                        />
                    }
                    </View>
                    <View  style={[styles.select_single,styles.country_wrap]}>
                        {!values?
                            <Select
                                label="País"
                                value={country}
                                setValue={setCountry}
                                values={countries.map(val => val.sigla).sort()}
                                labelTop={true}
                            />
                        :
                            <InputText
                                label="País"
                                value={country}
                                labelTop={true}
                                editable={false}
                            />
                        }
                    </View>
                </View>

                {user?.permission <= 2 ?
                    <View style={styles.w100}>
                        <InputMask
                            label="Constante (R$)"
                            value={constant}
                            setValue={setConstant}
                            keyboardType="number-pad"
                            valid={invalid !== constant}
                            mask="BRL_CURRENCY"
                        />
                    </View>

                    :<></>
                }
                <View style={styles.btn_wrap}>
                    <ButtonSubmit value={"Cancelar"} onPress={clear}  styles={[styles.btn, styles.btn_close]}/>

                    {user.permission <= 2 
                        ? <ButtonSubmit value={!values || !values?.constant?"Cadastrar":"Salvar"} onPress={registerCity}  styles={[styles.btn]}/>
                        : <ButtonSubmit value={"Enviar Para Análise"} onPress={registerCity}  styles={[styles.btn]}/>
                    }
                </View>
            </View>
        </Modal>
        </>
    )
}
