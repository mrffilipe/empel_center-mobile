import {StyleSheet} from "react-native";
import {colors,fontSize,container, button} from "../../../styles/defount.json"

export default StyleSheet.create({
    h2:{
        fontSize:fontSize.subtitle,
        color:colors.black,
        fontWeight:"bold",
        paddingTop:20,
        borderTopWidth:2,
        borderColor:"#fff",
        marginTop:30,
        paddingHorizontal:15,
    },
    files_wrap:{
        paddingVertical:20,
        paddingHorizontal:15,
    },
    file_single:{
        flexDirection: "row",
        borderBottomWidth:1,
        marginTop:10,
        alignItems: "center",
        justifyContent: "space-between",
    },
    file_info:{
        flexDirection: "row",
        flex:1,
        alignItems: "center",
    },
    icon_download:{
        color:colors.green,
        width:35,
        height:35,
        marginRight:15,
    },
    p:{
        fontSize:fontSize.small,
        color:colors.black,
        flexShrink: 1,
        textTransform: 'uppercase',
    },
    center:{
        alignItems:"center",
        paddingBottom:50,
    },
    add_document:{
        marginTop:30,
    },
    icon_delete:{
        width:25,
        height:25,
        color:colors.red,
        marginRight:0,
        marginLeft:15
    }

})
