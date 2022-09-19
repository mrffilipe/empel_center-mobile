import {StyleSheet} from "react-native";
import {colors,fontSize,button} from "../../styles/defount.json"

export default StyleSheet.create({

    image_wrap:{
        position: "absolute",
        left:0,
        top:0,
        width:"100%",
        height:"100%",
        backgroundColor:"rgba(0,0,0,0.8)"
    },
    image:{
        width:"100%",
        height:"100%",
    },
    btn_wrap:{
        position: "absolute",
        bottom:0,
        paddingBottom:10,
        paddingTop:10,
        left:0,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        width:"100%",
        backgroundColor:colors.primary,
    },
    btn:{
        ...button,
        minWidth:130,
        backgroundColor:colors.green,
        opacity:0.8
    },
    btn_text:{
        fontSize:fontSize.label,
        fontWeight:"bold",
        color:colors.white
    },
    btn_red:{
        backgroundColor:colors.red,
        marginRight:50,

    }

})