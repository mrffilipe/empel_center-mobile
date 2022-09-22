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
        backgroundColor: "rgba(0,0,0,0.3)",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        paddingTop:55,
        paddingHorizontal:0,
    },
    closeModal,
    modal_header_2:{
        marginTop:10,
    },
    modal_header:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },  
    modal_content_wrap:{
        backgroundColor:colors.primary,
        width:"100%",
        borderRadius:5,
        paddingBottom:5,
        maxWidth:320,
        height:"102%",
    },
    title_2:{
        fontSize:fontSize.p,
        fontWeight:"bold",
        marginBottom:5,
        color:colors.black,
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
    tasks_wrap:{
        padding:10,
    },
    modal_itens_wrap:{
        marginBottom:50,
    },
    tasks:{
        display:"flex",
        justifyContent:"space-between",
        alignItems: "flex-end",
        flexDirection: "row",
        borderBottomWidth:1,
        borderStyle:"dotted",
        borderColor:"rgb(100,100,100)",
        marginBottom:10,
    },
    task_title:{
        fontSize:14,
        color:colors.black,
    }
    

});