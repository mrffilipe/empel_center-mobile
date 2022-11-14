import {StyleSheet} from "react-native";
import {colors,fontSize,container, button, modal, limitSize} from "../../../styles/defount.json"

export default StyleSheet.create({
    modal_main:{
        alignItems: "center"
    },
    h4:{
        color: colors.red,
        fontSize:fontSize.subtitle,
    },
    
    p:{
        color: colors.black,
        marginTop:20,
        marginBottom:20
    },
    
    btn:{
        backgroundColor: colors.red,
        paddingHorizontal:15,
        paddingVertical:3,
        borderRadius: 5,
        minWidth:120,
        justifyContent:"center",
    },

    btn_text:{
        color: colors.white,
        textAlign: 'center',
        fontSize:fontSize.p
    },
    
    h4_sucess:{
        color: colors.green,
    },
    
    btn_sucess:{
        backgroundColor: colors.green,
    }
})
