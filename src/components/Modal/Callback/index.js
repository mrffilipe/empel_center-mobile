import React from 'react';
import styles from "./styles.js";
import Modal from "../";
import {View, Text, TouchableOpacity} from "react-native";
const props = {
    close:Function,
    params :{
        action:Function,
        actionName:String,
        message:String,
        type:Boolean
    } | null
}
export default function Callback({params, close} = props) {
  return (
    <Modal isOpen={!!params} close={close} closeTop={true}>
        {params?
            <View style={params?.type? [styles.modal_main,styles.sucess] : [styles.modal_main]}>
                <Text style={params?.type? [styles.h4,styles.h4_sucess] : [styles.h4]}>{params?.type? "Sucesso!" : "Oops..."}</Text>

                <Text style={styles.p}>{params?.message}</Text>

                {params?.action?
                    <TouchableOpacity style={params?.type? [styles.btn, styles.btn_sucess]:[styles.btn]} onPress={params?.action}>
                        <Text style={styles.btn_text}>{params?.actionName}</Text>
                    </TouchableOpacity>

                    :<></>
                }
            </View>
            :<></>
        }
    </Modal>
  )
}
