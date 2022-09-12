import {StyleSheet} from "react-native";
import {button,fontSize} from "../../../styles/defount.json";
export default StyleSheet.create({
    button:{
        ...button,
    },
    text:{
        color:"#fff",
        fontSize:fontSize.label,
        fontWeight:"bold",
    }
})