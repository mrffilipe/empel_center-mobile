import InputText from "../../../components/Form/InputText";
import InputMask from "../../../components/Form/InputMask";
import Select from "../../../components/Form/Select";
import styles from "./styles.js";
import React, {useState} from "react";
// import {BiMapPin} from "react-icons/bi";
import api from "../../../services/api";
import Cityes from "../../../data/cities.json";
import countries from "../../../data/countries.json";
import {View, TouchableOpacity, Text , PermissionsAndroid} from "react-native";
import IMapMark from "../../../assets/icons/mapMark";
import Geolocation from 'react-native-geolocation-service';
import Loading from "../../../components/Loading";

export default function AddUser({
    postalCode, setPostalCode,
    citie, setCitie,
    state, setState,
    country, setCountry,
    neighborhood, setNeighborhood,
    street, setStreet,
    number, setNumber,
    conplement, setConplement,
    coordinates, setCoordinates,
    coordinatesRequired = false, 
    invalid = null,
}) {
    const [loading, setLoading] = useState(false);

    const getPosition = ()=>{
        setLoading(true);
        const result = requestLocationPermission();
        result.then(res => {
            if (res) {
                Geolocation.getCurrentPosition(
                position => {
                    getCoordenates(position);
                },
                error => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                    // setLocation(false);
                },
                {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
                );
            }
        }).catch((err)=>{
            setLoading(false);
        });

        function getCoordenates(position){
            
            let lat = position.coords.latitude.toString();
            let long = position.coords.longitude.toString();
            
            setCoordinates({
                longitude: long,
                latitude: lat,
            });
            setLoading(false);
        }
    }

    // Function to get permission for location
    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                title: 'Geolocation Permission',
                message: 'Can we access your location?',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
                },
            );

        if (granted === 'granted') {
            return true;
        } else {
            alert('Geolocalização não permitida pelo usuário!');
            return false;
        }
        } catch (err) {
            return false;
        }
    };

    const setAndSearchCep = async(cep)=>{
        setPostalCode(cep);
        if(cep.length > 8){
            try{
                let res = await api.getCityByCep(cep.replace("-",""));

                if(res.error) throw new Error(res.error);

                setCitie(res?.localidade);
                setState(res?.uf)
                if(!street)
                    setStreet(res?.logradouro);
                if(!neighborhood)
                    setNeighborhood(res?.bairro);
                if(!conplement)
                    setConplement(res?.complemento);
            }catch(e){}
        }
    }

    return (

        <View style={styles.form_Address}>
            <Loading loading2={loading}/>
            <View style={styles.input_group}>
                <View style={styles.flex1}>
                    <InputText
                        label="Rua"
                        value={street}
                        setValue={setStreet}
                        required={true}
                        invalid={invalid?.input === street ? invalid?.message : null}
                    />
                </View>
                <View style={styles.select_wrap}>
                    <InputMask
                        keyboardType="number-pad"
                        label="Numero"
                        value={number}
                        setValue={setNumber}
                        required={true}
                        mask={"number"}
                        invalid={invalid?.input === number ? invalid?.message : null}
                    />

                </View>
            </View>

            <View style={styles.input_group}>
                <InputMask
                    label="CEP"
                    keyboardType="number-pad"
                    value={postalCode}
                    setValue={setAndSearchCep}
                    required={true}
                    mask={"ZIP_CODE"}
                    invalid={invalid?.input === postalCode ? invalid?.message : null}
                />
            </View>

            <View style={styles.input_group}>
                <View style={styles.flex1}>
                    <InputText
                        label="Cidade"
                        value={citie}
                        setValue={setCitie}
                        required={true}
                        values={Cityes[country]? Cityes[country].estados.filter(val => val.sigla === state)[0]?.cidades:[]}
                        invalid={invalid?.input === citie ? invalid?.message : null}
                    />
                </View>
            </View>

            <View style={styles.input_group}>
                <View style={styles.flex1}>
                    {Cityes[country]
                        ?
                        <Select
                            label="Estado"
                            value={state}
                            setValue={setState}
                            values={Cityes[country]? Cityes[country].estados.map(val => val.sigla).sort():[]}
                            required={true}
                            labelTop={true}
                            getValue={true}
                            invalid={invalid?.input === state ? invalid?.message : null}
                        />
                        :
                        <InputText
                            label="Estado"
                            value={state}
                            setValue={setState}
                            required={true}
                            invalid={invalid?.input === state ? invalid?.message : null}
                        />
                    }
                </View>

                <View style={styles.separator}/>
                
                <View style={styles.flex1}>
                    <Select
                        label="País"
                        value={country}
                        setValue={setCountry}
                        values={countries.map(val => val.sigla).sort()}
                        required={true}
                        labelTop={true}
                        getValue={true}
                        invalid={invalid?.input === country ? invalid?.message : null}
                    />
                </View>
            </View>

            <InputText
                label="Bairro"
                value={neighborhood}
                setValue={setNeighborhood}
                required={true}
                invalid={invalid?.input === neighborhood ? invalid?.message : null}
            />

            <InputText
                label="Complemento"
                value={conplement}
                setValue={setConplement}
            />

            <Text>Cordenadas</Text>
            <View style={styles.input_group}>
                <View style={styles.flex1}>
                    <InputMask
                        label="Latitude"
                        keyboardType="number-pad"
                        value={coordinates?.latitude}
                        setValue={(latitude)=>setCoordinates({
                            latitude:latitude,
                            longitude:coordinates?.longitude
                        })}
                        required={coordinatesRequired}
                        invalid={invalid?.input === coordinates?.latitude ? invalid?.message : null}
                    />
                </View>
                <View style={styles.flex1}>
                    <InputMask
                        keyboardType="number-pad"
                        label="Longitude"
                        value={coordinates?.longitude}
                        setValue={(longitude)=>setCoordinates({
                            latitude:coordinates?.latitude,
                            longitude:longitude
                        })}
                        required={coordinatesRequired}
                        invalid={invalid?.input === coordinates?.longitude ? invalid?.message : null}
                    />
                </View>
                <TouchableOpacity onPress={getPosition} style={styles.btn_local}>
                    <Text style={styles.btn_text}>Local Atual!</Text>
                    <IMapMark style={styles.icon}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}
