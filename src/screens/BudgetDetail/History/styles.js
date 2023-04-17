import {StyleSheet} from "react-native";
import {colors,fontSize,container, button} from "../../../styles/defount.json"

export default StyleSheet.create({
    container:{
        flex:1,
    },
    h2:{
        fontSize:fontSize.subtitle,
        color:colors.black,
        fontWeight:"bold",
        paddingTop:20,
        borderTopWidth:2,
        borderColor:"#fff",
        marginTop:30,
        paddingHorizontal:15,
        marginBottom:5,
    },
    text:{
        fontSize:fontSize.min,
        color:colors.black,
        paddingTop:3,
    },
    text_name:{
        fontSize:fontSize.p,
        color:colors.accent_dark,
        fontWeight:"bold",
    },
    text_note:{
        fontSize:fontSize.p,
        color:colors.black,
        fontWeight:"bold",
    },
    historys:{
        paddingLeft:50,
        position:"relative",
    },
    text_wrap:{
        paddingVertical:15
    },
    text_wrap_header:{
        flexDirection:"row",
        alignItems:"center",
    },
    conected_line:{
        position: "absolute",
        top: "52%",
        left: -25,
        height: "100%",
        width: 20,
        borderWidth: 2,
        borderRight: 0,
        borderBottomWidth:1,
        borderRightWidth:0,
        borderTopStartRadius:5,
        borderBottomStartRadius:5,
        borderColor:colors.gray
    },
    history_last:{
        borderWidth:0,
        borderBottomWidth:0
    }
})
