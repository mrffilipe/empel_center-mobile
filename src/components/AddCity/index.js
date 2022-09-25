import React, {useState} from 'react'
import {View, Text} from 'react-native';
import InputText from "../Form/InputText";
import InputMask from "../Form/InputMask";
import Select from "../Form/Select";
import styles from "./styles";
import ButtonSubmit from "../Form/ButtonSubmit";
import Cityes from "../../services/cityes.json";
import countries from "../../services/countries.json";
import Modal from "../Modal";
const props = {
    close: Function ///fechar modal
}
export default function AddCity({isOpen,close} = props) {


    const [name, setName] = useState("");
    const [state, setState] = useState("Goiás");
    const [country, setCountry] = useState("BR");
    const [constant, setConstant] = useState("")
    const [invalid, setInvalid] = useState(null);
    
    const clear = ()=>{
        setName("");
        setConstant("");
        setInvalid(null);
        close(false);
    }

    const registerUser = (e)=>{
        e.preventDefault();
        if(!name)
            return setInvalid(name);


        
    }

    return (
        <Modal isOpen={isOpen}>
            <Text style={styles.title}>Cadastrar Cidade</Text>

            <View style={styles.form}>
                


                <InputText
                    label="Nome"
                    value={name}
                    setValue={setName}
                    valid={invalid !== name}
                />

                <View style={styles.select_wrap}>
                    <View style={styles.select_single}>
                        {Cityes[country]
                            ?
                            <Select
                                label="Estado"
                                value={state}
                                setValue={setState}
                                values={Cityes[country]? Cityes[country].estados.map(val => val.nome).sort():[]}

                                labelTop={true}
                            />
                            :
                            <InputText
                                label="Estado"
                                value={state}
                                setValue={setState}

                            />
                        }
                    </View>
                    <View  style={[styles.select_single,styles.country_wrap]}>
                        <Select
                            label="País"
                            value={country}
                            setValue={setCountry}
                            values={countries.map(val => val.sigla).sort()}

                            labelTop={true}
                        />
                    </View>
                </View>

                <View style={styles.w100}>
                    <InputMask
                        label="Constante (R$)"
                        mask={"double"}
                        value={constant}
                        setValue={setConstant}

                        valid={invalid !== name}
                    />
                </View>

                <View style={styles.btn_wrap}>
                    <ButtonSubmit value={"Cancelar"} onPress={clear}  styles={[styles.btn, styles.btn_close]}/>
                    <ButtonSubmit value={"Cadastrar"} onPress={registerUser}  styles={[styles.btn]}/>
                </View>
            </View>
        </Modal>
    )
}
