import {StyleSheet} from "react-native";
import {colors,fontSize,container, button, modal, limitSize} from "../../../styles/defount.json"

export default StyleSheet.create({
    input_group:{
        display:"flex",
        flexDirection:"row",
        flex:1,
        flexWrap:"wrap",
        alignItems:"flex-end",
    },
    flex1:{
        flex:1,
        minWidth:120,
    },
    separator:{
        width:5,
    },
    btn_local:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:colors.blue_opacity,
        padding:8,
        borderRadius:8,
        // marginTop:20,
    },  
    btn_text:{
        color:colors.accent,
        fontWeight:"bold",
        fontSize:15,
    },
    icon:{
        marginTop:5,
        width:40,
        height:40,
        color:colors.accent,
    }
});