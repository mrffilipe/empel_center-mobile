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
        paddingVertical:25,
        borderRadius:10,
    },
    select_wrap:{
        width:"100%",
        marginTop:10,
        display:"flex",
        flexDirection: "row",
        flexWrap:"wrap",
    },
    select_single:{
        flex:1,
    },
    country_wrap:{
        flex:1,
        marginLeft:20,
    },
    btn_wrap:{
        display:"flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop:30
    },
    btn:{
        minWidth:110
    },
    btn_close:{
        backgroundColor:colors.red,
        marginRight:30,
    },
})