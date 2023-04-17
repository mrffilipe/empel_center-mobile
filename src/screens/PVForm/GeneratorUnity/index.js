import React from 'react';
import {View, Text, Pressable} from 'react-native';
import InputText from "../../../components/Form/InputText";
import InputMask from "../../../components/Form/InputMask";
import styles from "../styles";
import Select from "../../../components/Form/Select";
import InputRadio from "../../../components/Form/InputRadio";
import selectOptions from "../../../data/selectOptions.json";
import BtnPlus from '../../../components/Form/BtnPlus';

export default function GeneretorUnity({
    // generatorId,
    // setGeneratorId,
    minRate,
    setMinRate,
    extra,
    setExtra,
    // address,
    // setAddress,
    // cities,
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
    // setIsOpenAddCity,
    UnitGroupA,
    UnitGroupB,
    confirmDeleteGroup,
    setOpenConfirm,
    installationType,
    setInstallationType
}){

    const groupModelA = {
        "groupA":true,
        "name":"",
        "tipoDeInstalacao":"",
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
        "name":"",
        "tipoDeInstalacao":"",
        "isGenerator":false,
        "mediaConsumo":"",
        "precoPorKWH":""
    }

    // const citieSelectedName = ()=>{
    //     let city = cities.filter(c => c.id === parseInt(address))[0];
    //     return city ? city?.citie + " (" + city.state+ ")" : "";
    // }

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

    if(groups.length === 0){
        generatorUnityTypeB();
    }

    return(
        <View>
            <Text style={styles.subtitle}>Unidade geradora</Text>

            <InputText
                keyboardType="number-pad"
                label="Taxa de luz (R$)"
                invalid={invalid?.input === minRate ? invalid?.message : null}
                value={minRate}
                setValue={setMinRate}
                required={true}
            />

            <View>
                <InputMask
                    label={`Produção extra (kWh)`}
                    // invalid={invalid?.input === extra ? invalid?.message : null}
                    value={extra}
                    setValue={setExtra}
                    keyboardType="number-pad"
                    required={true}
                />
                {/* <View style={styles.info}>
                    <Text style={styles.small}>Mín. recomendado 5%</Text>
                    <Text style={styles.small}>Adicione <Text style={styles.span}>" , "</Text> para kWh</Text>
                </View> */}
                
            </View>

            {/* <View>
                <Select
                    label="Endereço de instalação"
                    value={citieSelectedName()}
                    values={cities.map(val => {return {name:`${val?.citie}  (${val.state})`, id:val?.id}})}
                    setValue={setAddress}
                    invalid={invalid?.input === address ? invalid?.message : null}
                    labelTop={true}
                />

                <View style={styles.btn_add_city_wrap}>
                    <BtnPlus onPress={()=>setIsOpenAddCity(true)}/>
                </View>
            </View> */}

            <InputRadio
                invalid={invalid?.input === addressType ? invalid?.message : null}
                value={addressType}
                values={selectOptions?.addressType}
                setValue={setAddressType}
            />

            {selectOptions?.addressType[addressType] === selectOptions?.addressType[0]
                ?
                <InputMask
                    required={true}
                    label="Transformador existente(kVA)"
                    value={transformer}
                    setValue={setTransformer}
                    keyboardType="number-pad"
                    invalid={invalid?.input === transformer ? invalid?.message : null}
                />
                :<></>
            }

            <InputMask
                required={true}
                mask="Number"
                keyboardType="number-pad"
                label="Distancia (Km)"
                value={distance}
                setValue={setDistance}
                invalid={invalid?.input === distance ? invalid?.message : null}
            />

            <Select
                label={"Local de instalação"}
                invalid={invalid?.input === installLocation ? invalid?.message : null}
                value={selectOptions?.instalationLocation[installLocation]}
                values={selectOptions?.instalationLocation}
                setValue={setInstallLocation}
                required={true}
                labelTop={true}
            />

            {/* <Select
                label="Fornecimento de energia"
                value={selectOptions?.instalationType[installationType]}
                values={selectOptions?.instalationType}
                setValue={setInstallationType}
                required={true}
                invalid={invalid?.input === installationType ? invalid?.message : null}
            /> */}

            {groups.filter(val => val.isGenerator).length === 0?
                <View style={styles.addUcs}>
                    {/* <Pressable 
                    android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}
                    style={[styles.btn_group,styles.btn_unity]} 
                    onPress={generatorUnityTypeA}>
                        <IPlus style={styles.icon}/>
                        <Text style={styles.btn_text}>Grupo A</Text>
                    </Pressable> */}
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