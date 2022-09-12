import {StyleSheet} from "react-native";
import {colors,fontSize,button} from "../../../styles/defount.json"

export default StyleSheet.create({
    container:{
        marginTop:20,
        paddingTop:5,
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
        justifyContent: "space-between",
        flex:1,
        marginTop:7,
        backgroundColor:"rgba(150,150,150,0.02)",
    },
    select_wrap:{
        flex:1,
        display: 'flex',
        alignItems: "flex-end",
        paddingTop:0,
    },
    select:{
        paddingTop:0,
        maxWidth:180,
        justifyContent:"flex-end",
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
    },
    h5_content:{
        opacity:0.7,
        minWidth:110,
        marginBottom:3,
        color:colors.accent,
    },
    right:{
        textAlign: "right",
    },
    marginTop:{
        marginTop:10,
        backgroundColor:"rgba(100,100,100,0.1)"
    },
    flex1:{
        flex:10,
    },
    btn:{
        ...button,
        backgroundColor:colors.red,
        paddingTop:0,
        paddingBottom:4,
    },
    btn_activete:{
        backgroundColor:colors.orange,
    },
    btn_text:{
        color:colors.white,
        fontSize:fontSize.p
    }
})
