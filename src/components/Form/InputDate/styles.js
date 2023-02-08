import { StyleSheet } from "react-native";
import {colors, fontSize, modal} from "../../../styles/defount.json";
export default StyleSheet.create({

    time_wrap:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom:25,
        alignItems:"flex-end",
    },
    select_wrap:{
        width:90,
        marginLeft:5,
    },
    dots:{
        color:colors.black,
        fontSize:fontSize.label,
        fontWeight:"bold",
        paddingLeft:5,
    }

})