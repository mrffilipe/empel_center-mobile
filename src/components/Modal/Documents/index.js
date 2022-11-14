import Modal from "../";
import styles from './styles.js';
import ICheck from "../../../assets/icons/check";
import IFile from "../../../assets/icons/file";
import React, {useState, useEffect, useCallback} from "react";
import BtnPlus from "../../Form/BtnPlus";
import fileValues from "./values.json";
import {View,TouchableOpacity, Text} from "react-native";
import FilePicker from "../../Form/FilePicker";
import ImageView from "../ViewImage";
import ButtonSubmit from "../../Form/ButtonSubmit";
export default function Documents({
    setValue = Function, 
    value = [],
    text = "",
    required = false,
    valueSaved = null, ///valores ja cadastrados para não mostar opção de cadastro 
    submit
}) {
    const [isOpenPicker, setIsOpenPicker] = useState(null);
    const [isOpenFileSelected, setIsOpenFileSelected] = useState(null);
    const [imageToView, setImageToView] = useState(null);
    const [isOpenModalDocuments, setIsOpenModalDocuments] = useState(false);

    const handleSubmit = ()=>{
        submit();
        setIsOpenModalDocuments(false);
    }

    const openModal = ()=>{
        setIsOpenModalDocuments(true);
        
    }

    const closeModal = ()=>{
        setValue([]);
        setIsOpenModalDocuments(false);
    }

    const countDocuments = ()=>{
        let count = 0;
        for(let i in value){
            if(value[i]?.value){
                if(value[i]?.value?.name)
                    count = count + 1;

                if(value[i]?.label === "OUTROS"){
                    count = count + value[i].value.length;
                }
            }
        }

        return count;
    }

    const setValuePiker = (response)=>{  
        if(!isOpenPicker.multiple){//é um objeto
            let arr = [...value];
            arr[isOpenPicker.key].value = response;
            setValue(arr);
        }else{ //é um array
            let arr = [...value];
            arr[isOpenPicker.key].value = [...arr[isOpenPicker.key].value, ...response];
            setValue(arr);
        }

        setIsOpenPicker(null);
    }

    const closePicker = ()=>{
        setIsOpenPicker(null);
    }

    const getPossibleValues = ()=>{
        let values = [...fileValues];
        if(valueSaved){
            for(let i in valueSaved){
                values = values.map((val)=> {
                    if(valueSaved[i]?.label === val?.label) 
                        val.value = null;

                    return val;
                })
            }
        }

        return values;
    }

    useEffect(()=>{
        let values = getPossibleValues();
        setValue(values);
    },[isOpenModalDocuments])

    useEffect(() => {
        if(isOpenFileSelected) {
            setIsOpenFileSelected({val:value[isOpenFileSelected.key].value,key:isOpenFileSelected.key});
        }
    },[value])

    const filesView = ()=>{

        if(isOpenFileSelected === null)
            return <></>

        const {key , val} = isOpenFileSelected;

        const remove = (index)=>{
            let arr = [...value];
            
            if(index !== undefined){
                let val = arr[key].value.filter((v,i) => i !== index); 
                arr[key].value = val;
                setValue(arr);
                if(arr[key].value.length === 0){
                    close();
                }
                
            }else{
                arr[key].value = {};
                setValue(arr);
                close();
            }
        }

        const close = ()=>{
            setIsOpenFileSelected(null);
        }

        if(!val){
            return (
                <View style={styles.btn_wrap}>
                    <ButtonSubmit value={"Ok!"} onPress={close}  styles={[styles.btn]}/>
                </View>
            )
        }

        return(
            <>
                {
                    val.name?
                            <View key={key} style={styles.files_single}>
                                {val?.type && val?.type.split("/")[0] === "image"? 
                                    <TouchableOpacity onPress={()=>setImageToView(val.uri)}>
                                        <Text style={[styles.file_name, styles.a]}>{val?.name.length > 25? val?.name.substring(0,25)+"...":val?.name}</Text>
                                    </TouchableOpacity>
                                    : 
                                    <Text style={styles.file_name}>{val?.name.length > 25? val?.name.substring(0,25)+"...":val?.name}</Text>
                                }
                                
                                <TouchableOpacity onPress={()=>remove()}>
                                    <Text style={styles.remove_file}>Remover</Text>
                                </TouchableOpacity>
                            </View>
                    :
                    val.map((valArr,index)=>{
                        return(
                            <View key={index+"_"+key} style={styles.files_single}>
                            
                                {valArr?.type && valArr?.type.split("/")[0] === "image"? 
                                    <TouchableOpacity onPress={()=>setImageToView(valArr.uri)}>
                                        <Text style={[styles.file_name, styles.a]}>{valArr?.name.length > 25? valArr?.name.substring(0,25)+"...":valArr?.name}</Text>
                                    </TouchableOpacity>
                                    : 
                                    <Text style={styles.file_name}>{valArr?.name.length > 25? valArr?.name.substring(0,25)+"...":valArr?.name}</Text>
                                }
                                
                                <TouchableOpacity onPress={()=>remove(index)}>
                                    <Text style={styles.remove_file}>Remover</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }

                <View style={styles.btn_wrap}>
                    {!val.name
                        ? <ButtonSubmit value={"Adicionar"} onPress={()=> setIsOpenPicker({
                            val,
                            key,
                            accept:false,
                            multiple:true,
                        })}  styles={[styles.btn, styles.btn_close]} /> 
                        :<></>
                    }
                    <ButtonSubmit value={"Ok!"} onPress={close}  styles={[styles.btn]}/>
                </View>
            </>
        )
    }

    const InputFile = ({key,label = "", val, multiple = false}) => {
        

        const getFile = ()=>{
            if(val.name || val[0]){
                setIsOpenFileSelected({val:val,key});
            }else{
                setIsOpenPicker({
                    value:val,
                    key,
                    accept:label !== "OUTROS",
                    multiple
                })
            }
        }

        return(
            <View>

                <View style={styles.label_wrap}>
                    <TouchableOpacity onPress={() => getFile()}  style={styles.input_wrap}>
                        {!val?.name && !val.length 
                            ? <View style={styles.icon_wrap}><BtnPlus /></View>
                            : <View style={styles.icon_wrap}><ICheck style={styles.check} /></View>
                        }

                           <Text style={styles.label}>{label}</Text>  
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.files_container}>
            <View style={styles.open_btn_wrap}>
                <TouchableOpacity onPress={openModal} style={styles.btn_open_modal}>
                    <IFile style={styles.icon}/>

                    <View>
                        <Text style={styles.input_text}>{text} {!submit && "("+countDocuments()+")"}</Text>
                        {!required && <Text style={styles.small}>(Opcional)</Text>}
                    </View>
                </TouchableOpacity>
            </View>

            {isOpenPicker ?
                <FilePicker
                    value={isOpenPicker.value}
                    index={isOpenPicker.key}
                    accept={isOpenPicker.accept}
                    multiple={isOpenPicker.multiple}
                    setValue={setValuePiker}
                    closePicker={closePicker} />
                :<></>
            }

            <ImageView isOpen={!!imageToView} uri={imageToView} close={setImageToView} />

            <Modal isOpen={isOpenFileSelected !== null} title={"Arquivo selecionado"} >
                {filesView()}
            </Modal>

            <Modal isOpen={isOpenModalDocuments} close={closeModal} title={text} >
                <View>

                    {value.map((val, key) =>{
                        if(val?.value){
                            return (
                                <View key={key} style={styles.file_single}>
                                    {InputFile({
                                        key,
                                        label:val?.label,
                                        setVal:setValue,
                                        val:val?.value,
                                        multiple:val.multiple? true: false
                                    })}
                                </View>
                            )
                        }
                    })}

                    
                        

                            {submit 
                                ? 
                                <View style={[styles.submit_wrap, styles.submit_wrap_2]}>
                                    <ButtonSubmit styles={styles.btn_red} value={"Cancelar"} onPress={closeModal}/>
                                    <ButtonSubmit styles={styles.btn_submit} value={"Salvar"} onPress={handleSubmit}/>
                                </View>

                                : 
                                <View style={styles.submit_wrap}>
                                    <ButtonSubmit styles={styles.btn_submit} value={"Ok"} onPress={closeModal}/>
                                </View>
                            }
                        
                    
                </View>
            </Modal>
        </View>
    )
}
