import React, {useState, useEffect} from 'react'
import {View, Text} from 'react-native';
import InputText from "../../Form/InputText";
import InputMask from "../../Form/InputMask";
import Select from "../../Form/Select";
import styles from "./styles";
import ButtonSubmit from "../../Form/ButtonSubmit";
import Cityes from "../../../data/cityes.json";
import countries from "../../../data/countries.json";
import Modal from "../";
import {useMainContext} from "../../../contexts/mainContext";
import API from "../../../services/api";
import {useAuthContext} from "../../../contexts/authContext";
import Loading from "../../Loading";
import Callback from "../Callback";
import {toNumber} from "../../../services/tools";
const props = {
    isOpen:Boolean,
    close: Function, ///fechar modal
    values:{
        "id": Number,
        "citie": String,
        "state": String,
        "country": String,
        "constant": Number,
        "active": Boolean,
        "createdAt": Date,
        "updatedAt": Date,
    }
}

export default function AddCity({isOpen,close, values = null} = props) {
    const {getCities, cities, setCities} = useMainContext();
    const {hasPermission} = useAuthContext();

    const [name, setName] = useState("");
    const [state, setState] = useState("GO");
    const [country, setCountry] = useState("BR");
    const [constant, setConstant] = useState("")
    const [invalid, setInvalid] = useState(null);

    const [callback, setCallback] = useState(null);
    const [loading, setLoading] = useState();
    
    const clear = ()=>{
        setName("");
        setConstant("");
        setInvalid(null);
        close(false);
    }

    const citieExists = async (params) => {//verify if citie exists
        let res = null;
        cities.map((city) => {
            if(city.citie === params.citie && city.state === params.state && city.country === params.country) 
                res = city.id;
        })
        return res;
    }


    const registerCity = async()=>{
        if(!name || !state || !country)
            return;

        let params = {
            "citie": name,
            "state": state,
            "country": country,
            "constant": hasPermission() ? toNumber(constant) : 0,
            "active" : hasPermission() && toNumber(constant) > 0,
        }

        let existsId = await citieExists(params);

        if(typeof existsId === 'number' && !hasPermission() || typeof existsId === 'number' && hasPermission() && !values){
            return setCallback({
                type: 0,
                message:"Cidade já foi cadastrada!",
                action:()=>setCallback(null),
                actionName:"Ok!",
                close:()=>setCallback(null),
            })
        }

        var res;
        setLoading(true);
        if(values?.id || typeof existsId === 'number'){//update city
            params.id = values?.id ? values.id : existsId;
            res = await putCity(params);
        }else{  //register new city
            res = await postCity(params);
        }
        setLoading(false);
    
        if(res?.error){
            addNewCity(params);

            return setCallback({
                type: 0,
                message:res.error,
                action:()=>setCallback(null),
                actionName:"Ok!"
            })
        }

        if(!params.id)
            setCallback({
                type: 1,
                message:"Cidade cadastrada com sucesso!",
                action:()=>setCallback(null),
                actionName:"Ok!"
            })

        getCities();
        clear(!!params.id);
    }

    const postCity = async(params)=>{
        let res = await API.post("Address",params).catch( e => e );;

        return res;
    }

    const putCity = async(params)=>{
        let res = await API.put("Address",params).catch( e => e );

        return res;
    }

    const addNewCity = (params)=>{
        let res = true;
        cities.map((val)=>{
            if(val?.citie === params?.citie && val?.country === params?.country && val?.state === params?.state){
                res = false;
            }
        })

        if(res){
            params.id = 0;
            setCities([...cities,params])
        }
    }


    useEffect(()=>{
        if(values){
            setName(values?.citie);
            setCountry(values?.country);
            setState(values?.state);
            setConstant(values?.constant);
        }
    },[values])

    return (
        <>
        <Loading loading2={loading}/>
        <Callback params={callback} />
        <Modal isOpen={isOpen}>
            

            <Text style={styles.title}>Cadastrar Cidade</Text>

            <View style={styles.form}>
                

            {!values?
                <>
                    {country === "BR" ?
                        <Select
                            label="Nome"
                            value={name}
                            getValue={true}
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
                                    getValue={true}
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
                                getValue={true}
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

                {hasPermission()?
                    <View style={styles.w100}>
                        <InputMask
                            label="Constante (R$)"
                            value={constant}
                            setValue={setConstant}
                            keyboardType="number-pad"
                            valid={invalid !== constant}
                            mask="Number"
                        />
                    </View>

                    :<></>
                }
                <View style={styles.btn_wrap}>
                    <ButtonSubmit value={"Cancelar"} onPress={clear}  styles={[styles.btn, styles.btn_close]}/>

                    {hasPermission()
                        ? <ButtonSubmit value={!values || !values?.constant?"Cadastrar":"Salvar"} onPress={registerCity}  styles={[styles.btn]}/>
                        : <ButtonSubmit value={"Enviar Para Análise"} onPress={registerCity}  styles={[styles.btn]}/>
                    }
                </View>
            </View>
        </Modal>
        </>
    )
}
