import {StyleSheet} from "react-native";
import {colors,fontSize,container, button} from "../../styles/defount.json"

export default StyleSheet.create({
    container:{
        ...container,
        paddingLeft:0,
        paddingRight:0,
        paddingBottom:80
    },
    info_wrap:{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-end",
        marginLeft:15,
    },
    info_single:{
        minWidth:250,
        marginRight:15,
        flex:1,
    },
    main:{
        width:"100%",
    },
    margin:{
        marginLeft:15,
    },
    actions_wrap:{
        justifyContent: "space-between",
        marginRight:0,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap:"wrap",
    },
    actions_wrap_1:{
        marginRight:15,
        flex:1,
    },
    actions_wrap_2:{
        alignItems: "flex-end",
        flex:1,
    },

    category:{
        fontWeight: "bold",
        color: colors.accent,
        fontSize:fontSize.subtitle
    },
    status:{
        color:colors.orange,
        fontSize:fontSize.label,
        marginLeft:15,
        fontWeight:"bold",
    },
    green:{
        color:colors.green
    },
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
    btn_history:{
        width:40, 
        height:40,
        padding:10,
        backgroundColor:"#030a8c1e",
        alignItems: "center",
        justifyContent: "center",
        borderRadius:5,
        marginTop:10,
    },
    icon_history:{
        color:colors.accent_dark,
        width:30,
        height:30,

    },
    files_wrap:{
        paddingVertical:30,
        paddingHorizontal:15,
    },
    file_single:{
        flexDirection: "row",
        borderBottomWidth:1,
        marginTop:10,
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
        flexShrink: 1
    },
    center:{
        alignItems:"center",
        paddingBottom:50,
    },
    add_document:{
        marginTop:30,
    }

})
