import React, {useState} from 'react';
import {View, ScrollView, Text, Pressable} from "react-native"; 
import styles from "./styles";
import InputText from "../../components/Form/InputText";
import InputMask from "../../components/Form/InputMask";
import InputRadio from "../../components/Form/InputRadio";
import ButtonSubmit from "../../components/Form/ButtonSubmit";
import Select from "../../components/Form/Select";
import Checkbox from "../../components/Form/Checkbox";
import IPlus from "../../assets/icons/plus";
import ILess from "../../assets/icons/less";
import ITrash from "../../assets/icons/trash";
import {validateEmail} from "../../services/tools";
import {PVFormRegister} from "../../services/api";
import {useMainContext} from "../../contexts/mainContext";
import InputFile from "../../components/Form/InputFile";
export default function PVForm() {
    const {setDB, DB} = useMainContext();
    
    var costsModel ={
        name:"",
        price:"",
    }

    const [groups, setGroups] = useState([]);
    const [costs, setCosts] = useState([costsModel]);
    const [name, setName] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [generatorId, setGeneratorId] = useState("");
    const [address, setAddress] = useState("");
    const [addressType, setAddressType] = useState("Urbano");
    const [installLocation,setInstallLocation] = useState("");
    const [distance, setDistance] = useState("");
    const [file, setFile] = useState(null);

    const [transformer, setTransformer] = useState("");

    const [invalid, setInvalid] = useState({});

    const handleSubmit = async()=>{
        setInvalid(null)
        let cpfCnpjUnmask = cpfCnpj.replace(/\./g,"").replace(/\//g,"").replace(/\-/g,""); 
        if(name === "" || cpfCnpj === "" || phoneNumber === "" || email === "" || distance === "" || generatorId === "" || address === "" || addressType === "" || installLocation === "")
            return setInvalid({input:"",message:"Campo obrigatório!"});
        if(name.split(" ").length < 2)
            return setInvalid({input:name, message:"Inserir nome e sobrenome!"});
        if(cpfCnpjUnmask.length !== 11 && cpfCnpjUnmask.length !== 14)
            return setInvalid({input:cpfCnpj, message:"CPF ou CNPJ invalido!"})
        if(phoneNumber.length < 7) 
            return setInvalid({input:phoneNumber, message:"Telefone invalido!"})
        if(!validateEmail(email))
            return setInvalid({input:email,message:"E-mail invalido!"});

        if(!groups.length)
            return alert("Adicione pelo menos uma unidade consumidora!");
        
        for(let {name, price} of costs ){
            if(!name || !price)
                return setInvalid({input:"",message:"Campo obrigatório!"});
        }

        for(const i in groups){
            for(const keys of Object.keys(groups[i])){
              if(groups[i][keys] === "")
                return setInvalid({input:"",message:"Campo obrigatório!"});
            }
        }



        let params = {
            name, 
            cpf_cnpj:cpfCnpj,
            phone:phoneNumber,
            email,
        }
        
        try{
            let register = await PVFormRegister(params).catch(err=> err);
            
            if(register.error){////salvar informaçoes para nova tentativa
                let arr = [...DB];
                arr.push({
                    title:"Formulario fotovoltaico",
                    function:"PVFormRegister",
                    params,
                    status:0,
                    date: new Date(),
                })
                return setDB(arr)
            }


            alert("register")
        }catch(e){console.log(e)}
    }

    var groupModelA = {
        groupA:true,
        pontaKWH:"",
        pontaRS:"",
        foraPontaKWH:"",
        foraPontaRS:"",
        horaKWH:"",
        horaRS:"",
        demandaKWH:"",
        demandaRS:"",
        desconto:false,
    }

    var groupModelB = {
        groupB:true,
        medidaConsumo:"",
        valorFinal:"",
        Fornecimento:"",
        extra:0,
    }

    const addGroupA = () => {
        setGroups([...groups, groupModelA]);
    }

    const addGroupB = () => {
        setGroups([...groups, groupModelB]);
    }

    const deleteOne = (index)=>{
        let arr = [...groups];
        arr = arr.filter((obj, key)=> key !== index);

        setGroups(arr);

    }

    const clearGroups = () => {
        setGroups([]);
    }

    const addCost = () => {
        setCosts([...costs, costsModel]);
    }

    const deleteOneCost = (index)=>{
        if(costs.length === 1)
            return;

        let arr = [...costs];
        arr = arr.filter((obj, key)=> key !== index);

        setCosts(arr);
    }
    

    
    const UnitGroupA = (key) => {

        const insertValue = (value,objName)=>{
            let arr = [...groups];
            arr[key][objName] = value;
            setGroups(arr);
        }

        return (
            <View style={styles.uc}>
                {/* ADICIONAR NÚMERO DA UNIDADE CRIADA, ex: Grupo A #2 */}
                <View style={styles.group_title}>
                    <Text style={styles.subtitle_2}>Grupo A</Text>
                    <Pressable onPress={()=>deleteOne(key)}>
                        <ITrash style={styles.icon_trash}/>
                    </Pressable>
                </View>

                <InputMask
                    keyboardType="number-pad"
                    label="Ponta (kWh/mês)"
                    invalid={invalid?.input === groups[key]["pontaKWH"] ? invalid?.message : null}
                    value={groups[key]["pontaKWH"]}
                    setValue={insertValue}
                    name="pontaKWH"
                />
                
                <InputMask
                    keyboardType="number-pad"
                    label="Ponta (R$/kWh)"
                    invalid={invalid?.input === groups[key]["pontaRS"] ? invalid?.message : null}
                    value={groups[key]["pontaRS"]}
                    setValue={insertValue}
                    name="pontaRS"
                />
    
                <InputMask
                    keyboardType="number-pad"
                    label="Fora ponta (kWh/mês)"
                    invalid={invalid?.input === groups[key]["foraPontaKWH"] ? invalid?.message : null}
                    value={groups[key]["foraPontaKWH"]}
                    setValue={insertValue}
                    name="foraPontaKWH"
                />

                <InputMask
                    keyboardType="number-pad"
                    label="Fora ponta (R$/kWh)"
                    invalid={invalid?.input === groups[key]["foraPontaRS"] ? invalid?.message : null}
                    value={groups[key]["foraPontaRS"]}
                    setValue={insertValue}
                    name="foraPontaRS"
                />
    
                <InputMask
                    keyboardType="number-pad"
                    label="Hora (kWh/mês)"
                    invalid={invalid?.input === groups[key]["horaKWH"] ? invalid?.message : null}
                    value={groups[key]["horaKWH"]}
                    setValue={insertValue}
                    name="horaKWH"
                />
    
                <InputMask
                    keyboardType="number-pad"
                    label="Hora (R$/kWh)"
                    invalid={invalid?.input === groups[key]["horaRS"] ? invalid?.message : null}
                    value={groups[key]["horaRS"]}
                    setValue={insertValue}
                    name="horaRS"
                />
    
                <InputMask
                    keyboardType="number-pad"
                    label="Demanda (kWh/mês)"
                    invalid={invalid?.input === groups[key]["demandaKWH"] ? invalid?.message : null}
                    value={groups[key]["demandaKWH"]}
                    setValue={insertValue}
                    name="demandaKWH"
                />
    
                <InputMask
                    keyboardType="number-pad"
                    label="Demanda (R$/kWh)"
                    invalid={invalid?.input === groups[key]["demandaRS"] ? invalid?.message : null}
                    value={groups[key]["demandaRS"]}
                    setValue={insertValue}
                    name="demandaRS"
                />

                <Checkbox
                    label="Desconto irrigante"
                    value={groups[key]["desconto"]}
                    setValue={insertValue}
                    name="desconto"
                />

            </View>
        );
    }
    
    const UnitGroupB = (key) => {

        const insertValue = (value,objName)=>{
            let arr = [...groups];
            arr[key][objName] = value;
            setGroups(arr);
        }

        return (
            <View style={styles.uc}>
                {/* ADICIONAR NÚMERO DA UNIDADE CRIADA */}
                <View style={styles.group_title}>
                    <Text style={styles.subtitle_2}>Grupo B</Text>
                    <Pressable onPress={()=>deleteOne(key)}>
                        <ITrash style={styles.icon_trash}/>
                    </Pressable>
                </View>
                
                <InputMask
                    keyboardType="number-pad"
                    label="Média de consumo"
                    invalid={invalid?.input === groups[key]["medidaConsumo"] ? invalid?.message : null}
                    value={groups[key]["medidaConsumo"]}
                    setValue={insertValue}
                    name="medidaConsumo"
                />
                <InputMask
                    keyboardType="number-pad"
                    label="Valor final (kWh)"
                    invalid={invalid?.input === groups[key]["valorFinal"] ? invalid?.message : null}
                    value={groups[key]["valorFinal"]}
                    setValue={insertValue}
                    name="valorFinal"
                />
    
                <Select
                    label="Fornecimento de energia"
                    invalid={invalid?.input === groups[key]["Fornecimento"] ? invalid?.message : null}
                    value={groups[key]["Fornecimento"]}
                    values={["Pires do Rio","São Jose"]}
                    setValue={insertValue}
                    name="Fornecimento"
                />

                <View>
                    <InputMask
                        label={`Produção extra ${groups[key]["extra"]
                            ? typeof groups[key]["extra"] === "number" ? "(%)" : "(kWh)"
                            : "(%) / (kWh)"
                        }`
                        }
                        invalid={invalid?.input === groups[key]["extra"] ? invalid?.message : null}
                        value={groups[key]["extra"]}
                        setValue={insertValue}
                        name="extra"
                        keyboardType="number-pad"
                        mask="percent"
                    />
                    <View style={styles.info}>
                        <Text style={styles.small}>Mín. recomendado 5%</Text>
                        <Text style={styles.small}>Adicione <Text style={styles.span}>" , "</Text> para kWh</Text>
                    </View>
                    
                </View>
            </View>
        );
    }

    const UnitCost = (key) => {

        const insertValue = (value,objName)=>{
            let arr = [...costs];
            arr[key][objName] = value;
            setCosts(arr);
        }

        return (
            <View style={styles.uc}>
                {/* ADICIONAR NÚMERO DA UNIDADE CRIADA */}
                <View style={styles.group_title}>
                    <Text style={styles.subtitle_2}>Custo {key + 1}</Text>
                    {costs.length > 1 && 
                    <Pressable onPress={()=>deleteOneCost(key)}>
                        <ITrash style={styles.icon_trash}/>
                    </Pressable>}
                </View>
                
                <InputText
                    label="Descrição"
                    invalid={invalid?.input === costs[key].name ? invalid?.message : null}
                    value={costs[key]["name"]}
                    setValue={insertValue}
                    name="name"
                />
                <InputMask
                    label="Valor (R$)"
                    invalid={invalid?.input === costs[key].price ? invalid?.message : null}
                    value={costs[key]["price"]}
                    setValue={insertValue}
                    name="price"
                    keyboardType="number-pad"
                    mask="BRL_CURRENCY"
                />
            </View>
        );
    }
  
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.limitSize}>
                    <View style={styles.form_group}>
                        <Text style={[styles.subtitle,styles.subtitle_first]}>Cliente</Text>

                        <InputText
                            label="Nome do cliente"
                            value={name}
                            setValue={setName}
                            invalid={invalid?.input === name ? invalid?.message : null}
                        />

                        <InputMask
                            label="CPF/CNPJ"
                            value={cpfCnpj}
                            setValue={setCpfCnpj}
                            mask={cpfCnpj.replace(/\D+/g, "").length <= 11
                                ? "CPF"
                                : "CNPJ"
                            }
                            keyboardType="number-pad"
                            invalid={invalid?.input === cpfCnpj ? invalid?.message : null}
                        />

                        <InputMask
                            label="Telefone"
                            value={phoneNumber}
                            setValue={setPhoneNumber}
                            mask="BRL_PHONE"
                            keyboardType="number-pad"
                            invalid={invalid?.input === phoneNumber ? invalid?.message : null}
                        />

                        <InputText
                            label="E-mail"
                            value={email}
                            setValue={setEmail}
                            type="email"
                            invalid={invalid?.input === email ? invalid?.message : null}
                        />
                        
                        <InputMask
                            label="Distancia (KM)"
                            value={distance}
                            setValue={setDistance}
                            keyboardType="number-pad"
                            invalid={invalid?.input === distance ? invalid?.message : null}
                        />

                        <InputFile
                            value={file}
                            setValue={setFile}
                            label={"Adicionar Documento "}
                        />

                        <Text style={styles.subtitle}>Unidade geradora</Text>

                        <InputText
                            label="ID da unidade geradora"
                            value={generatorId}
                            setValue={setGeneratorId}
                            invalid={invalid?.input === generatorId ? invalid?.message : null}
                        />

                        <Select
                            label="Endereço de instalação"
                            value={address}
                            values={["Pires do Rio","São José"]}
                            setValue={setAddress}
                            invalid={invalid?.input === address ? invalid?.message : null}
                        />

                        <InputRadio
                            invalid={invalid?.input === addressType ? invalid?.message : null}
                            value={addressType}
                            values={["Rural","Urbano"]}
                            setValue={setAddressType}
                        />

                        {addressType === "Rural"
                            ?
                            <InputMask
                                label="Transformador existente(kVA)"
                                value={transformer}
                                setValue={setTransformer}
                                keyboardType="number-pad"
                                invalid={invalid?.input === transformer ? invalid?.message : null}
                            />
                            :<></>
                        }

                        <Select
                            label="Local de instalação"
                            invalid={invalid?.input === installLocation ? invalid?.message : null}
                            value={installLocation}
                            values={["Terrio","Telhado"]}
                            setValue={setInstallLocation}
                        />

                        <View style={styles.ucs}>
                            <Text style={styles.subtitle}>Unidades consumidoras</Text>
                            {groups.length === 0 ? <Text style={styles.small}>Adicione pelo menos uma UC</Text> : <></>}
                            {groups.map((group, key) => (
                                group.groupA
                                    ? <View style={styles.costs_wrap} key={key}>{UnitGroupA(key)}</View>
                                    : <View style={styles.costs_wrap} key={key}>{UnitGroupB(key)}</View>
                            ))}
                        </View>

                        <View style={styles.addUcs}>
                            <Pressable 
                            android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}
                            style={styles.btn_group} 
                            onPress={addGroupA}>
                                <IPlus style={styles.icon}/>
                                <Text style={styles.btn_text}>Grupo A</Text>
                            </Pressable>
                            <Pressable 
                            android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}
                            style={styles.btn_group} 
                            onPress={addGroupB}>
                                <IPlus style={styles.icon}/>
                                <Text style={styles.btn_text}>Grupo B</Text>
                            </Pressable>

                            <Pressable 
                            android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}
                            style={groups.length
                                ? [styles.btn_group,styles.btn_clear]
                                : [styles.btn_group,styles.btn_clear,styles.desabled]} 
                            onPress={clearGroups}>
                                <ILess style={[styles.icon,styles.btn_clear_icon]}/>
                                <Text style={styles.btn_text}>Limpar</Text>
                            </Pressable>
                        </View>

                        <View style={styles.ucs}>
                            <Text style={styles.subtitle}>Custos</Text>
                            {costs.length === 0 ? <Text  style={styles.small}>Adicione pelo menos um custo</Text> : <></>}
                            
                            {costs.map((cost, key) => (
                                <View style={styles.costs_wrap} key={key}>{UnitCost(key)}</View>
                            ))}
                            
                            <Pressable 
                            style={[styles.add_cost, styles.btn_group]} 
                            android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}
                            onPress={addCost}>
                                <IPlus style={styles.icon} />
                                <Text style={[styles.add_cost_text, styles.btn_text]}>Adicionar custo</Text>
                            </Pressable>
                        </View>

                        <ButtonSubmit onPress={handleSubmit} value={"Enviar para análise"} styles={styles.btn_submit}/>
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}
