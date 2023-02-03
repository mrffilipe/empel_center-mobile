import { StyleSheet } from "react-native";
import {colors,modal, closeModal, fontSize} from "../../../styles/defount.json"
export default StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        left:-70,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal:10,
    },
    icon:{
        height:40,
        width:40,
        color: colors.white,
    },
    title: {
        fontSize: 19,
        borderRadius:15,
        fontWeight:"bold",
        paddingLeft:60,
    },
    modal,
    closeModal,
    modal_content_wrap:{
        backgroundColor:colors.primary,
        width:"90%",
        borderRadius:5,
        padding:20,
        maxWidth:500,
    },
    title2:{
        fontSize:fontSize.subtitle,
        fontWeight:"bold",
        marginBottom:10,
        color:colors.black,
    },
    headerTasks:{
        display:"flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: "row",
    },
    iconTask:{
        width:33,
        height:33,
        color:colors.orange,
        padding:5,
        backgroundColor:"rgba(255, 138, 4, 0.1)",
        borderRadius:5,
        marginLeft:25,
    },
    iconTask2:{
        color:colors.green,
        backgroundColor:"rgba(0, 128, 0, 0.1)",
    },
    iconCheck:{
        color:colors.green,
        height:50,
        width:50,
        flex:1,
    },
    task_single:{
        borderBottomWidth:1,
        borderColor:colors.accent,
        paddingBottom:5,
        marginBottom:10,
        borderStyle:"dotted",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop:10,
    },
    text_date:{
        fontSize:fontSize.label,
        color:colors.black,
        opacity:0.7,
        marginBottom:2,
        height:30,
    },
    text:{
        color:colors.black,
        fontSize:fontSize.p
    },
    text_wrap:{
        flex:1,
    },
    icon_option:{
        width:25,
        height:25,
        color:colors.red,
        backgroundColor:"rgba(255, 0, 0, 0.1)",
        borderRadius:4,
    },
    icon_check:{
        color:colors.green,
        backgroundColor:"rgba(0, 128, 0, 0.1)",
        marginLeft:25,
    }

});