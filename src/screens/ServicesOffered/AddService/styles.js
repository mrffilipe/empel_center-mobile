import {StyleSheet} from "react-native";
import {colors,fontSize,container, button} from "../../../styles/defount.json"

export default StyleSheet.create({
    container:{
        paddingHorizontal:15,
    },
    btn_wrap:{
        marginTop:15,
        flexDirection:"row",
        justifyContent:"flex-end"
    },
    btn:{
        backgroundColor:colors.secondary,
        marginLeft:15,
        minWidth:130
    },
    btn_cancel:{
        backgroundColor:colors.red
    }
})