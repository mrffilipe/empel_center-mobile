import {StyleSheet} from "react-native";
import {colors,fontSize,container, button, modal, limitSize} from "../../../styles/defount.json"

export default StyleSheet.create({
    container:{
        marginLeft:15,
    },
    bell:{
        color:colors.white,
        width:25,
        height:25,
    },
    amount:{
        color:colors.white,
        left:25,
        fontSize:11,
        position:"absolute",
        top:-5,
        color:colors.red
    },
})