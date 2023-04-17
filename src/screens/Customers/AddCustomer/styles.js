import {StyleSheet} from "react-native";
import {colors,fontSize,container, button, modal, limitSize} from "../../../styles/defount.json"

export default StyleSheet.create({
    modal:{
        ...modal,
    },
    title:{
        fontSize:fontSize.subtitle,
        textAlign:"center",
        fontWeight:"bold",
        color:colors.black
    },
    modal_main:{
        ...limitSize,
        backgroundColor:colors.white,
        paddingHorizontal:15,
        borderRadius:10,
    },
    modal_wrap:{
        paddingVertical:25,
    },
    select_wrap:{
        maxWidth:250,
        marginTop:10,
    },
    btn_wrap:{
        display:"flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop:40
    },
    btn:{
        minWidth:130,
        backgroundColor:colors.orange,
    },
    btn_close:{
        backgroundColor:colors.red,
        marginRight:30,
    },
    btn_after:{
        marginRight:30,
    },
    btn_submit:{
        backgroundColor:colors.secondary,
    }
})