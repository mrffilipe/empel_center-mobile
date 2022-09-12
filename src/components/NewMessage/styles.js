import {StyleSheet} from "react-native";
import {colors, fontSize, modal} from "../../styles/defount.json"

export default StyleSheet.create({
    
    //modal new message
    title:{
        color:colors.black,
        fontSize:fontSize.subtitle,
        fontWeight:"bold",
        opacity:0.7
    },
    modal:{
        ...modal,
    },
    modal_visible:{
        backgroundColor:colors.primary,
        width:"100%",
        paddingHorizontal:10,
        paddingBottom:25,
        paddingTop:5,
        borderRadius:5,
    },
    new_msg:{
        color:colors.black,
        fontSize:fontSize.label,
        borderWidth:1,
        borderColor:"#ccc",
        borderRadius:5,
        minHeight:150,
        padding:5,
        marginTop:10,
        textAlignVertical:"top",
        backgroundColor:colors.white,
    },
    actions_new_msg:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
    },
    submit:{
        backgroundColor:colors.green,
        paddingTop:3,
        paddingBottom:7,
        borderRadius:5,
        width:120,
        marginTop:20,
    },
    cancel:{
        backgroundColor:colors.red,
        marginRight:20,
    },
    btn_text:{
        textAlign:"center",
        fontSize:fontSize.label,
        color:colors.white,
        fontWeight:"bold",
    }

})