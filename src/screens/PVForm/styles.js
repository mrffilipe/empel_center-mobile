import {StyleSheet} from "react-native";
import {colors, fontSize, container, limitSize, button} from "../../styles/defount.json"

export default StyleSheet.create({
    container:{
        ...container
    },
    limitSize,
    subtitle:{
        fontSize:fontSize.subtitle,
        fontWeight:"bold",
        paddingBottom:0,
        color:colors.black,
        paddingTop:40
    },
    group_title:{
        display:"flex",
        flexDirection:"row",
        alignItems:"flex-end",
    },
    subtitle_first:{
        paddingTop:0
    },
    subtitle_2:{
        fontSize:22,
        fontWeight:"bold",
        paddingBottom:0,
        color:colors.accent,
        paddingTop:20
    },
    small:{
        fontWeight:"bold",
        color:colors.black,
        opacity:0.8,
        fontSize:14,
    },
    btn_unity:{
        opacity:0.8
    },
    addUcs:{
        display:"flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop:30,
    },
    btn_group:{
        ...button,
        width:120
    },
    btn_text:{
        fontSize:fontSize.label,
        color:colors.white,
        fontWeight: "bold",
    },
    btn_clear:{
        backgroundColor:colors.red
    },
    btn_clear_icon:{
        color:colors.red,
    },
    btn_submit:{
        paddingTop:10,
        paddingBottom:14,
    },
    info:{
        display:"flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    ucs:{
        display:"flex",
        alignItems: "flex-start"
    },
    add_cost:{
        marginVertical:30,
    },
    costs_wrap:{
        width:"100%"
    },
    icon:{
        fontSize:33,
        color:colors.secondary,
        width:20,
        height:20,
        marginRight:5,
        padding:2,
        marginTop:2,
        backgroundColor:colors.white,
        borderRadius:11,
    },
    desabled:{
        opacity:.6,
    },
    del_text:{
        color:colors.red,
    },
    icon_trash:{
        color:colors.red,
        width:23,
        height:23,
        marginLeft:50
    },
    flex:{
        display:"flex",
        flexDirection: "row",
    },
    file_wrap:{
        paddingTop:20,
        paddingBottom:50
    },
    btn_add_city_wrap:{
        position:"absolute",
        left:250,
        top:26
    }
})