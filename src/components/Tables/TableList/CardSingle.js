import React, {useRef, useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import styles from './styles';
import * as Animatable from 'react-native-animatable';
import IDotts from "icons/dotts";
import ITrash from "icons/trash";
import IArrowDown from "icons/arrowDown";
import ICheck from "icons/check";
import IMinus from "icons/less";
import IDownload from "icons/download";

export default function CardSingle({val, index,actions, filds, dataLength = 0}){
    const [infoIsOpen, setInfoIsOpen] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const infoRef = useRef(null);
    const iconMenuRef = useRef(null);
    const iconInfoRef = useRef(null);

    useEffect(()=>{
        if(infoRef?.current){
            if(!infoIsOpen){
                infoRef.current.transitionTo({maxHeight:50})
                iconInfoRef.current.transitionTo({transform:[{rotate:"0deg"}]})
            }else{
                infoRef.current.transitionTo({maxHeight:500})
                iconInfoRef.current.transitionTo({transform:[{rotate:"180deg"}]})
            }
        }
    },[infoIsOpen])

    useEffect(()=>{
        if( iconMenuRef?.current){
            if(!menuIsOpen){
                iconMenuRef.current.transitionTo({transform:[{rotate:"90deg"}]})
            }else{
                iconMenuRef.current.transitionTo({transform:[{rotate:"0deg"}]})
            }
        }
    },[menuIsOpen])

    useEffect(()=>{
        if(dataLength === 1){
            setInfoIsOpen(true);
        }else if(infoIsOpen){
            setInfoIsOpen(false);
        }
    },[dataLength])

    return(
        <Animatable.View ref={infoRef} style={styles.table_main} key={index}>
            <View style={styles.view_main}>
                    {
                        val?.state === true? 
                        <View style={[styles.status_wrap,styles.green]}><ICheck style={[styles.icon,styles.white_color]}/></View>
                        : val?.state === false?
                        <View style={[styles.status_wrap,styles.red]}><IMinus style={[styles.icon,styles.white_color]}/></View>
                        : val?.toDownload ?
                        <View style={[styles.status_wrap,styles[val?.stateColor],val.stateMinWidth? {minWidth: val?.stateMinWidth} : {}]}>
                            <TouchableOpacity style={styles.download_btn} onPress={()=>val.toDownload(val.id)}>
                                <IDownload style={[styles.icon,styles.white_color]} />
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={[styles.status_wrap,styles[val?.stateColor],val.stateMinWidth? {minWidth: val?.stateMinWidth} : {}]}><Text style={styles.status_text}>{val?.state}</Text></View>
                    }
                    
                

                <Pressable onPress={()=>setInfoIsOpen(!infoIsOpen)} style={styles.content_main}>
                    <Text style={styles.content_main_text}>{val?.main_text}</Text>
                </Pressable>

                <View style={styles.menu_wrap}>
                    {menuIsOpen ?
                        <View style={styles.menu_hidded}>
                            {actions.map((Value,index)=>{
                                if(Value.condiction && !Value.condiction(val))
                                    return <View key={index}/>

                                return(
                                    <TouchableOpacity style={[styles.btn,styles[Value?.color+"_btn"]]} onPress={()=>{Value?.onPress(val[Value?.onPressReturn],val[Value?.onPressReturn2]); setMenuIsOpen(false);}} key={index}>
                                        {!Value?.icon
                                            ? <ITrash style={[styles.icon,styles.red_btn.text]} />
                                            : <Value.icon style={[styles.icon,styles[Value?.color+"_btn"]?.text]}/>
                                        }
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    :<></>}

                    <TouchableOpacity onPress={()=>setInfoIsOpen(!infoIsOpen)} style={[styles.btn, styles.menu_btn,infoIsOpen ? styles.btn_activete : {}]}>
                        <Animatable.View  style={styles.to_rotate} ref={iconInfoRef}>
                            <IArrowDown style={[styles.icon]} />
                        </Animatable.View>
                    </TouchableOpacity>
                    
                    {actions.length ?
                        <TouchableOpacity  onPress={()=>setMenuIsOpen(!menuIsOpen)} style={[styles.btn,styles.open_menu_btn, styles.btn_last, menuIsOpen ? styles.btn_activete : {}]}>
                            <Animatable.View style={styles.to_rotate} ref={iconMenuRef}>
                                <IDotts style={styles.icon}/>
                            </Animatable.View>
                        </TouchableOpacity>
                        :<></>
                    }
                </View>

            </View>

            <View style={styles.content_hidded}>



                {filds.map((value, index) =>{
                                        
                    return(
                        <View style={styles.text_wrap} key={index}>
                            <Text style={[styles.text,styles.text_label]}>{value?.label ? value?.label+":": ""}</Text>
                            <Text style={[styles.text]}>{val[value?.key] === true ? "Sim" :val[value?.key] === false ? "Não" : val[value?.key]}</Text>
                        </View>
                    )

                })}
            </View>
        </Animatable.View>
    )
}
