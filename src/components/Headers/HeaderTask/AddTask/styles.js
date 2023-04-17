import { StyleSheet } from "react-native";
import {colors,modal, closeModal, fontSize} from "../../../../styles/defount.json"
export default StyleSheet.create({
    action:{
        paddingTop:30,
        flexDirection:"row",
        justifyContent:"flex-end",
    },
    btn:{
        minWidth:120,
    },
    btn_red:{
        minWidth:120,
        backgroundColor:colors.red,
        marginRight:20,
    }

});