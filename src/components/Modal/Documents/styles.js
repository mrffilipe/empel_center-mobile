import {StyleSheet} from "react-native";
import {colors,fontSize,container, button, modal, limitSize} from "../../../styles/defount.json"

export default StyleSheet.create({
    modal:{
        ...modal,
    },
    icon:{
        width:55, 
        height:55,
        color:colors.green,
        marginRight:10,
    },
    btn_open_modal:{
        flexDirection: "row",
        alignItems: "center",
        marginTop:15,
    },
    input_text:{
        color:colors.black,
        opacity:.7,
        fontSize:fontSize.label,
        fontWeight:"bold",
    },
    small:{
        color:colors.black,
        opacity:.7,
    },
    icon_wrap:{
        width:30,
    },
    check:{
        width:25,
        height:25,
        color:colors.green,
        
    },
    input_wrap:{
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor:colors.accent_dark,
        paddingVertical:8,
        alignItems: "center",

    },
    label:{
        color:colors.accent_dark,
        fontSize:fontSize.p,
        textTransform: "uppercase",
        flexShrink: 1
    },
    btn_wrap:{
        display:"flex",
        marginTop:30,
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
    },
    btn:{
        minWidth:150
    },
    btn_close:{
        backgroundColor:colors.green,
        marginRight:30,
    },
    files_single:{
        borderBottomWidth:1,
        borderColor:colors.accent_dark,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop:10,
    },
    remove_file:{
        color:colors.red,
        fontWeight:"bold",
        padding:3,
        fontSize:fontSize.p
    },
    file_name:{
        color:colors.accent_dark,
        fontSize:fontSize.p,
    },
    submit_wrap:{
        marginTop:30,
    },
    submit_wrap_2:{
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    btn_red:{
        backgroundColor:colors.red,
        marginRight:25,
        minWidth:150,
    },
    btn_submit:{
        minWidth:150,
    }
})