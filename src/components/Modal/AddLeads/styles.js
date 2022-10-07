import {StyleSheet} from "react-native";
import {colors,fontSize,container, button, modal, limitSize} from "../../../styles/defount.json"

export default StyleSheet.create({
    title:{
        fontSize:fontSize.subtitle,
        textAlign:"center",
        fontWeight:"bold",
        color:colors.black
    },
    select_wrap:{
        width:"100%",
        marginTop:10,
        display:"flex",
        flexDirection: "row",
        flexWrap:"wrap",
    },
    select_single:{
        flex:4,
    },
    country_wrap:{
        flex:1,
        marginLeft:20,
    },
    btn_wrap:{
        display:"flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop:30
    },
    btn:{
        minWidth:150
    },
    btn_close:{
        backgroundColor:colors.red,
        marginRight:30,
    },
    form:{
        height:460,
        alignItems:"center",
        justifyContent:"space-between",
    },
    center:{
        flex:1,
        // alignItems:"center",
    },
    select_method_wrap:{
        flex:1,
        flexDirection: "row",
        borderBottomWidth: 4,
        borderColor:"#fff",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom:3,
        // maxWidth:350
    },
    booton_bar:{
        position: "absolute",
        bottom:-4,
        width:"50%",
        borderWidth: 2,
        borderRadius:2,
        borderColor:colors.secondary
    },
    btn_method:{
        flex:1,
    },
    text_method:{
        color:colors.accent_dark,
        fontSize:23,
        fontWeight:"bold",
        textAlign:"center",
    },
    btn_method_disabled:{
        opacity:0.5
    },
    h5:{
        marginTop:5,
        fontSize:fontSize.min,
        color:colors.accent_dark,
        textAlign:"center",
        fontWeight:"bold",
    },
    h6:{
        fontSize:fontSize.min,
        color:colors.accent,
        textAlign:"center",
        fontWeight:"bold",
    },
    p:{
        marginTop:5,
        fontSize:12,
        color:colors.accent,
        textAlign:"center",
    },
    btn_ok_wrap:{
        display:"flex",
        alignItems:"center",
        alignItems: "center",
    },
    btn_ok:{
        marginTop:15,
        borderBottomWidth:1,
        borderColor:colors.accent,
        paddingHorizontal:7,
    },
    ok:{
        fontSize:fontSize.p,
        color:colors.accent,
        textAlign:"center",
        fontWeight:"bold",
    },
    leads_file_wrap:{
        paddingHorizontal:20,
    },
    help_btn:{  
        position:"absolute",
        right:-30,
        top:-10,
    },
    icon_help:{
        width:30,
        height:30,
        color:colors.secondary,
        opacity:.8
    },
    file:{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor:"#ccc",
        borderRadius:5,
        paddingVertical:3,
        paddingHorizontal:5,
        marginTop:10,
        justifyContent: "space-between",
    },
    file_text:{
        color:colors.accent,
        fontSize:fontSize.p,
        fontWeight:"bold",
    },
    remove_btn:{
        display:"flex",
        backgroundColor:colors.red,
        alignItems: "center",
        justifyContent: "center",
        width:18,
        height:18,
        borderRadius:9,
        opacity:0.8
    },
    remove_file:{
        fontWeight:"bold",
        color:colors.white,
        top:-3.5
    }
})