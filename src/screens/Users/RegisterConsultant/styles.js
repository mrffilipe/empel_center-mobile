import {StyleSheet} from "react-native";
import {colors,fontSize,button} from "../../../styles/defount.json"

export default StyleSheet.create({
    name:{
        color:colors.black,
        textAlign: 'center',
    },
    btn_wrap:{
        display:"flex",
        alignItems: 'center',
        marginTop:25,
    },
    btn:{
        width:200,
        backgroundColor:colors.secondary
    }
})
