import {StyleSheet} from "react-native";
import {colors,fontSize,container, button, modal, limitSize} from "../../styles/defount.json"

export default StyleSheet.create({
    modal:{
        ...modal,
    },
    modal_main:{
        ...limitSize,
        backgroundColor:colors.white,
        paddingHorizontal:15,
        paddingVertical:25,
        borderRadius:10,
    },
    
})