import InputText from "../../../components/Form/InputText";
import InputMask from "../../../components/Form/InputMask";
import Select from "../../../components/Form/Select";
import styles from "./styles.module.css";
import {BiMapPin} from "react-icons/bi";
import api from "../../../services/api";
import Cityes from "../../../data/cities.json";
import countries from "../../../data/countries.json";


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
    invalid,
    coordinatesRequired = false, 
}) {

    const getCoordenates = (e)=>{
        e.preventDefault();
        
        navigator.geolocation.getCurrentPosition(getCoordenates, errorCoor, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});

        function getCoordenates(position){
            console.log(position);
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            
            setCoordinates({
                longitude: long,
                latitude: lat,
            })
            
        }

        function errorCoor(){
            alert("Não foi possível obter localização!");
        }
    }

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

        <div className={styles.form_Address}>

            <div className={styles.input_group}>
                <div className={styles.flex1}>
                    <InputText
                        label="Rua"
                        value={street}
                        setValue={setStreet}
                        required={true}
                        invalid={invalid?.input === street ? invalid?.message : null}
                    />
                </div>
                <div className={styles.select_wrap}>
                    <InputMask
                        label="Numero"
                        value={number}
                        setValue={setNumber}
                        required={true}
                        mask={"number"}
                        invalid={invalid?.input === number ? invalid?.message : null}
                    />
                    <InputMask
                        label="CEP"
                        value={postalCode}
                        setValue={setAndSearchCep}
                        required={true}
                        mask={"cep"}
                        invalid={invalid?.input === postalCode ? invalid?.message : null}
                    />
                </div>
            </div>

            <div className={styles.input_group}>
                <div className={styles.flex1}>
                    <InputText
                        label="Cidade"
                        value={citie}
                        setValue={setCitie}
                        required={true}
                        values={Cityes[country]? Cityes[country].estados.filter(val => val.sigla === state)[0]?.cidades:[]}
                        invalid={invalid?.input === citie ? invalid?.message : null}
                    />
                </div>
                <div className={styles.select_wrap}>
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

                </div>
            </div>

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

            <h3>Cordenadas</h3>
            <div className={styles.input_group}>
                <div className={styles.flex1}>
                    <InputText
                        label="Latitude"
                        value={coordinates.latitude}
                        setValue={(latitude)=>setCoordinates({
                            latitude:latitude,
                            longitude:coordinates.longitude
                        })}
                        required={coordinatesRequired}
                    />
                </div>
                <div className={styles.flex1}>
                    <InputText
                        label="Longitude"
                        value={coordinates.longitude}
                        setValue={(longitude)=>setCoordinates({
                            latitude:coordinates.latitude,
                            longitude:longitude
                        })}
                        required={coordinatesRequired}
                    />
                </div>
                <button onClick={getCoordenates} className={styles.btn_local}>
                    Local Atual!
                    <BiMapPin/>
                </button>
            </div>
        </div>
    )
}
