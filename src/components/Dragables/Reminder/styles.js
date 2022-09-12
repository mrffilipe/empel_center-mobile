import {StyleSheet} from "react-native";
import {colors,modal, closeModal, fontSize} from "../../../styles/defount.json"

export default StyleSheet.create({
    message_title:{
        color:colors.black,
        fontSize:fontSize.subtitle,
        fontWeight:"bold",
        // opacity:0.7,
        marginBottom:15,
    },
    closeModal,
    modal,
    modal_content_wrap:{
        backgroundColor:colors.primary,
        width:"87%",
        borderRadius:5,
        padding:20,
        maxWidth:500,
    },
    messages_single:{
        borderBottomWidth:1,
        borderColor:colors.accent,
        paddingBottom:10,
        marginBottom:15,
        borderStyle:"dotted"
    },
    message_username:{
        fontSize:fontSize.label,
        fontWeight:"bold",
        marginBottom:2,
        color:colors.black,
        opacity:0.9
    },
    msg:{
        color:colors.black,
        fontSize:fontSize.p
    },
    message_title_wrap:{
        display:"flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    icon:{
        width:24,
        height:24,
        color:colors.black,
    },
    trash:{
        color:colors.red
    }

})