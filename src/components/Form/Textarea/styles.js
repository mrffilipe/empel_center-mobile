import {StyleSheet} from "react-native";
import {colors, fontSize} from "../../../styles/defount.json";
const textColor = colors.black

export default StyleSheet.create({
    input_Wrap:{
        width:"100%",
        paddingTop:20,
    },
    input:{
        fontSize:fontSize.label,
        borderWidth:1,
        borderRadius:5,
        borderColor:colors.accent_dark,
        color:colors.accent,
        marginTop:3,
        minHeight:150,
        padding:7,
    },
    label_wrap:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between",
    },
    label:{
        fontSize:fontSize.label,
        fontWeight:"bold",
        opacity:0.7,
        color:textColor,
    },
    icon:{
        height:25,
        width:25,
        color:colors.black,
        marginRight:10,
        marginTop:3,
        opacity:0.7,
    },
    input_invalid:{
        borderColor:colors.red
    },
    invalid_alert:{
        position:"absolute",
        bottom:-20,
        color:colors.red
    }
})