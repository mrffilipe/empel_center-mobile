import {StyleSheet} from "react-native";
import {colors,fontSize,button} from "../../../styles/defount.json"

export default StyleSheet.create({
    container:{
        marginTop:10,
        paddingBottom:20,
        paddingHorizontal:15,
        flex:1,
    },
    list:{
        paddingHorizontal:10,
    },
    info:{
        backgroundColor:colors.white,
        marginBottom:15,
        borderRadius:5
    },
    info_desabled:{
        opacity:0.8,
    },
    table_wrap:{
        width:"100%",
        paddingHorizontal:7,

    },
    text_wrap:{
        display: 'flex',
        flexDirection: "row",
        flex:1,
        marginTop:7,
        backgroundColor:"rgba(150,150,150,0.02)",
    },
    h5:{
        minWidth:90,
        textAlign: "left",
        textTransform: "uppercase",
        marginRight:5,
        flex:.7,
        fontWeight:"bold",
        fontSize:fontSize.p,
        color:colors.black,
        width:"auto"
    },
    h5_content:{
        minWidth:110,
        marginBottom:3,
        color:colors.accent,
    },
    right:{
        textAlign: "right",
        flex:1
    },
    marginTop:{
        marginTop:10,
        backgroundColor:"rgba(100,100,100,0.1)"
    },
    btn:{
        ...button,
        backgroundColor:colors.green,
        paddingTop:0,
        paddingBottom:4,
        minWidth:100,
    },
    btn_activete:{
        backgroundColor:colors.orange,
    },
    btn_text:{
        color:colors.white,
        fontSize:fontSize.p
    }
})
