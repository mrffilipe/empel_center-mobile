import { StyleSheet } from "react-native";
import {colors,modal, closeModal, fontSize} from "../../../styles/defount.json"
export default StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal:10,
        width:"100%"
    },
    btn_pendent:{
        padding:3,
    },
    icon_on:{
        height:25,
        width:25,
        color:colors.green
        // backgroundColor:colors.green,
        // borderRadius:5,
    },
    of:{
        color:colors.red,
    },
    amount:{
        color:colors.white,
        left:25,
        fontSize:11,
        position:"absolute",
        top:-5,
    },
    title: {
        fontSize: 21,
        borderRadius:15,
        fontWeight:"bold",
    },
    modal:{
        ...modal,
        backgroundColor: "transparent",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        paddingTop:50,
        paddingHorizontal:0,
    },
    closeModal,
    modal_header:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },  
    modal_content_wrap:{
        backgroundColor:colors.black,
        width:"100%",
        borderRadius:5,
        padding:10,
        paddingBottom:20,
        maxWidth:270,
    },
    title_2:{
        fontSize:fontSize.p,
        fontWeight:"bold",
        marginBottom:10,
        color:colors.white,
    },
    btm_refresh:{
        marginBottom:5,
        marginLeft:20,
    },
    refresh:{
        width:25,
        height:25,
        color:colors.green,
    },
    tasks:{
        marginTop:8,
        display:"flex",
        justifyContent:"space-between",
        alignItems: "flex-end",
        flexDirection: "row",
        borderBottomWidth:1,
        borderStyle:"dotted",
        borderColor:colors.white,
    },
    task_title:{
        fontSize:13,
        color:colors.white,
    }
    

});