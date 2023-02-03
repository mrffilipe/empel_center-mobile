import {StyleSheet} from "react-native";
import {colors,fontSize,container, button} from "../../../styles/defount.json"

export default StyleSheet.create({
    btn:{
        backgroundColor:colors.secondary,
        padding:2,
        marginRight:15,
        borderRadius:5,
    },
    icon:{
        fontSize:30,
        color:"#fff",
        fontWeight:"bold",
        height:30,
        width:30,
    }
})