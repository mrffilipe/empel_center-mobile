import React from 'react';
import styles from "./styles.js";
import Modal from "../";
import {View, Text, TouchableOpacity} from "react-native";
import { useAuthContext } from '../../../contexts/authContext.js';

const callbackProps = {
    action:Function,
    actionName:String,
    message:String,
    type:Boolean,
    close:Function,
} | null

export default function config({params = null} = callbackProps) {
    const {callback, setCallback} = useAuthContext();
    const config = callback? callback : params;
    return (
        <Modal isOpen={!!config} close={config?.close ? config.close : ()=>setCallback(null)} closeTop={config?.close ? true : false}>
            {config?
                <View style={config?.type? [styles.modal_main,styles.sucess] : [styles.modal_main]}>
                    <Text style={config?.type? [styles.h4,styles.h4_sucess] : [styles.h4]}>{config?.type? "Sucesso!" : "Oops..."}</Text>

                    <Text style={styles.p}>{config?.message}</Text>

                    {config?.action?
                        <TouchableOpacity style={config?.type? [styles.btn, styles.btn_sucess]:[styles.btn]} onPress={config?.action}>
                            <Text style={styles.btn_text}>{config?.actionName}</Text>
                        </TouchableOpacity>

                        :<></>
                    }
                </View>
                :<></>
            }
        </Modal>
    )
}
