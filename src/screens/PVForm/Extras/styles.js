
import {StyleSheet} from "react-native";
import {colors, fontSize, container, limitSize, button} from "../../../styles/defount.json"

export default StyleSheet.create({
    delete:{
        position: 'absolute',
        right:0,
        bottom:3,
    },
    red:{
        color: colors.red,
        backgroundColor: colors.primary
    },
    observation_wrap:{
        marginTop:30,
    }
})