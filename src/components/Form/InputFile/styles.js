import {StyleSheet} from "react-native";
import {colors,fontSize,container} from "../../../styles/defount.json"

export default StyleSheet.create({
    file_input_wrap:{
        display:"flex",
        alignItems: "flex-start",
    },
    file_input:{
        display:"flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop:15,
        paddingRight:10,
    },  
    icon:{
        width:55,
        height:55,
        color:colors.green
    },
    btn_text:{
        color:colors.black,
        fontSize:fontSize.label,
        fontWeight:"bold",
        opacity:0.7,
        marginLeft:10,
    },
    small:{
        fontWeight:"bold",
        color:colors.accent_dark,
        fontSize:14,
        marginLeft:10,
    },

    files_single:{
        borderBottomWidth:1,
        borderColor:colors.accent_dark,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop:10,
        width:"100%"
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
})