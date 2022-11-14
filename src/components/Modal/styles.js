import {StyleSheet} from "react-native";
import {colors,fontSize,container, button, modal, limitSize} from "../../styles/defount.json"

export default StyleSheet.create({
    modal:{
        ...modal,
    },
    modal_main:{
        ...limitSize,
        backgroundColor:colors.primary,
        paddingHorizontal:15,
        paddingVertical:25,
        borderRadius:10,
    },
    title:{
        color:colors.accent_dark,
        fontSize:fontSize.h3,
        fontWeight:"bold",
        textAlign:"center",
        marginBottom:20
    },
    modal_btn_close:{
        position:"absolute",
        right:5,
        top:5,
    },
    icon_close:{
        color:colors.red,
        width:45,
        height:45,
    }
})