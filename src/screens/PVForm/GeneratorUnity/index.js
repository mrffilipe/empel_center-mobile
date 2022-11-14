import React from 'react';
import {View, Text, Pressable} from 'react-native';
import InputText from "../../../components/Form/InputText";
import InputMask from "../../../components/Form/InputMask";
import styles from "../styles";
import Select from "../../../components/Form/Select";
import InputRadio from "../../../components/Form/InputRadio";
import selectOptions from "../../../enum/selectOptions.json";
import BtnPlus from '../../../components/Form/BtnPlus';

export default function GeneretorUnity({
    generatorId,
    setGeneratorId,
    minRate,
    setMinRate,
    extra,
    setExtra,
    address,
    setAddress,
    cities,
    addressType,
    setAddressType,
    groups,
    setGroups,
    transformer,
    setTransformer,
    distance,
    setDistance,
    installLocation,
    setInstallLocation,
    invalid,
    setIsOpenAddCity,
    UnitGroupA,
    UnitGroupB,
    confirmDeleteGroup,
    setOpenConfirm
}){

    const groupModelA = {
        "groupA":true,
        "isGenerator":false,
        "pontaKWH":"",
        "pontaRS":"",
        "foraPontaKWH":"",
        "foraPontaRS":"",
        "horaKWH":"",
        "horaRS":"",
        "demandaKWH":"",
        "demandaRS":"",
        "desconto":false
    }
    
    const groupModelB = {
        "groupB":true,
        "isGenerator":false,
        "mediaConsumo":"",
        "fornecimento":"",
        "precoPorKWH":""
    }

    const generatorUnityTypeA = ()=>{
        let arr = [...groups];
        arr = arr.filter((val)=> !val.isGenerator);
        let group = groupModelA;
        group.isGenerator = true;
        arr.push(group);
        setGroups(arr);
    }

    const generatorUnityTypeB = ()=>{
        let arr = [...groups];
        arr = arr.filter((val)=> !val.isGenerator);
        let group = groupModelB;
        group.isGenerator = true;
        arr.push(group);
        setGroups(arr);
    }

    return(
        <View>
            <Text style={styles.subtitle}>Unidade geradora</Text>

            <InputText
                label="ID da unidade geradora/Referencia"
                value={generatorId}
                setValue={setGeneratorId}
                invalid={invalid?.input === generatorId ? invalid?.message : null}
            />

            <InputText
                keyboardType="number-pad"
                label="Taxa de luz mínima (kWh)"
                invalid={invalid?.input === minRate ? invalid?.message : null}
                value={minRate}
                setValue={setMinRate}
            />

            <View>
                <InputMask
                    label={`Produção extra ${extra
                        ? typeof extra === "number" ? "(%)" : "(kWh)"
                        : "(%) / (kWh)"
                    }`
                    }
                    invalid={invalid?.input === extra ? invalid?.message : null}
                    value={extra}
                    setValue={setExtra}
                    keyboardType="number-pad"
                    mask="percent"
                />
                <View style={styles.info}>
                    <Text style={styles.small}>Mín. recomendado 5%</Text>
                    <Text style={styles.small}>Adicione <Text style={styles.span}>" , "</Text> para kWh</Text>
                </View>
                
            </View>

            <View>
                <Select
                    label="Endereço de instalação"
                    value={address}
                    values={["Pires do Rio","São José"]}
                    setValue={setAddress}
                    invalid={invalid?.input === address ? invalid?.message : null}
                    labelTop={true}
                />

                <View style={styles.btn_add_city_wrap}>
                    <BtnPlus onPress={()=>setIsOpenAddCity(true)}/>
                </View>
            </View>

            <InputRadio
                invalid={invalid?.input === addressType ? invalid?.message : null}
                value={addressType}
                values={selectOptions?.addressType}
                setValue={setAddressType}
            />

            <Select
                label={"Local de instalação"}
                invalid={invalid?.input === installLocation ? invalid?.message : null}
                value={installLocation}
                values={selectOptions?.instalationLocation}
                setValue={setInstallLocation}
            />

            <InputMask
                mask="Number"
                keyboardType="number-pad"
                label="Distancia (Km)"
                value={distance}
                setValue={setDistance}
                invalid={invalid?.input === distance ? invalid?.message : null}
            />

            {selectOptions?.addressType[addressType] === selectOptions?.addressType[0]
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

            {groups.filter(val => val.isGenerator).length === 0?
                <View style={styles.addUcs}>
                    <Pressable 
                    android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}
                    style={[styles.btn_group,styles.btn_unity]} 
                    onPress={generatorUnityTypeA}>
                        {/* <IPlus style={styles.icon}/> */}
                        <Text style={styles.btn_text}>Grupo A</Text>
                    </Pressable>
                    <Pressable 
                    android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}
                    style={[styles.btn_group,styles.btn_unity]} 
                    onPress={generatorUnityTypeB}>
                        {/* <IPlus style={styles.icon}/> */}
                        <Text style={styles.btn_text}>Grupo B</Text>
                    </Pressable>

                    <View style={{width:120}}/>
                </View>
                :<></>
            }

            {groups.map((group, key) => {
                if(group.isGenerator){
                    return(
                        group.groupA
                            ? <View style={styles.costs_wrap} key={key}>{UnitGroupA({key,groups,setGroups, invalid, confirmDeleteGroup})}</View>
                            : <View style={styles.costs_wrap} key={key}>{UnitGroupB({key,groups,setGroups, setOpenConfirm, invalid, confirmDeleteGroup})}</View>
                    )
                }
            })}
        </View>
    )
}