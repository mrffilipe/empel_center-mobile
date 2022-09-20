import {StyleSheet} from "react-native";
import {colors,fontSize,container} from "../../../styles/defount.json"

export default StyleSheet.create({
    file_input_wrap:{
        display:"flex",
        alignItems: "flex-start",
    },
    file_input:{
        display:"flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop:15,
        paddingRight:10,
    },  
    icon:{
        width:40,
        height:40,
        color:colors.green
    },
    btn_text:{
        color:colors.black,
        fontSize:fontSize.label,
        fontWeight:"bold",
        opacity:0.7,
        marginLeft:10,
    },
    small:{
        fontWeight:"bold",
        color:colors.accent,
        fontSize:14,
        marginLeft:10,
    },
})