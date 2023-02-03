import {StyleSheet} from "react-native";
import {button,fontSize, colors} from "../../../styles/defount.json";
export default StyleSheet.create({
    button:{
        ...button,
        backgroundColor:colors.accent
    },
    text:{
        color:"#fff",
        fontSize:fontSize.label,
        fontWeight:"bold",
    },
    button_disabled:{
        opacity:.6
    }
})