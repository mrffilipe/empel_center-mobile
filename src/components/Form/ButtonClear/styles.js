import {StyleSheet} from "react-native";
import {colors,fontSize, button} from "../../../styles/defount.json"

export default StyleSheet.create({
    btn:{
        ...button,
        minWidth:110,
        marginRight:15,
        backgroundColor:colors.orange
    },
    btn_text:{
        fontSize:fontSize.label,
        color:colors.white,
        fontWeight:"bold",
    }

})
