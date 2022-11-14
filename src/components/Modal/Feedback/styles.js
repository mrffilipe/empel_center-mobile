import {StyleSheet} from "react-native";
import {colors,fontSize,container, button, modal, limitSize} from "../../../styles/defount.json"

export default StyleSheet.create({
    container:{
       position: 'absolute',
       bottom:15,
       right:15,
    },
    message_icon:{
        width:35,
        height:35,
        color:colors.white,
    },
    btn:{
        padding:5,
        backgroundColor:colors.accent,
        height:65,
        width:65,
        borderRadius:65 / 2,
        alignItems:"center",
        justifyContent:"center",
        elevation:10,
        zIndex:9
    },
    text:{
        fontSize:fontSize.p,
        textAlign:"center",
        marginBottom:20,
        color:colors.black
    },
    submit:{
        backgroundColor:colors.secondary
    }
})