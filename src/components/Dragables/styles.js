import {StyleSheet} from "react-native";
import {colors, fontSize} from "../../styles/defount.json"

export default StyleSheet.create({
    container:{
        paddingTop:5,
        paddingHorizontal:15,
        flex:1,
        backgroundColor:colors.white,
        minHeight:500
    },
    list_wrap:{
        marginBottom:7,
        borderBottomWidth:3,
        borderRightWidth:2,
        paddingHorizontal:5,
        paddingVertical:5,
        borderColor:"rgba(100, 100, 100,0.2)",
        backgroundColor:colors.primary,
        borderRadius:5,
        // elevation:2,
    },
    text_wrap:{
        display:"flex",
        flexDirection: "row",
    },
    info:{
        display:"flex",
        justifyContent:"space-between",
        alignItems: "flex-start",
        flexDirection: "row",
    },
    h5:{
        color:colors.black,
        fontWeight:"bold",
        fontSize:fontSize.p,
    },
    h5_content:{
        opacity:0.7,
        minWidth:110,
        marginBottom:3,
    },
    small:{
        color:colors.black,
        fontWeight:"bold",
        fontSize:fontSize.p,
        opacity:0.7,
    },
    status:{
        fontWeight:"bold",
        fontSize:fontSize.p
    },
    category:{
        color:colors.accent_dark,
        opacity:1,
        fontSize:fontSize.min
    }, 
    blue_dark:{
        color:colors.accent_dark,
    },
    gray:{
        color:colors.black,
        opacity:.7
    },
    green:{
        color:colors.green
    },
    red:{
        color:colors.red
    },
    orange:{
        color:colors.orange
    },
    yellow:{
        color:colors.yellow
    },
    blue:{
        color:colors.accent
    },
    // blue_opacity:{
    //     color:colors.accent_dark,
    // },
    // blue_dark_opacity:{
    //     backgroundColor:colors.blue_dark_opacity
    // },
    // green_opacity:{
    //     backgroundColor:colors.green_opacity
    // },
    // red_opacity:{
    //     backgroundColor:colors.red_opacity
    // },
    // orange_opacity:{
    //     backgroundColor:colors.orange_opacity
    // },
    // blue_opacity:{
    //     backgroundColor:colors.blue_opacity
    // },
    actions:{
        display:"flex",
        flexDirection: "row",
        justifyContent:"space-between",
        marginTop:5,
        alignItems:"flex-start",
    },
    icon:{
        height:25,
        width:25,
        color:colors.accent,
        marginRight:5,
        marginTop:2
    },///draggables styles

    draggables:{
        display:"flex",
        flexDirection:"row",
        backgroundColor:colors.primary,
    },
    draggable_container:{
        // position:"relative",
        width:300,
        backgroundColor:colors.white,
        marginRight:10,
        paddingHorizontal:10,
        borderRadius:5,
        minHeight:450,
        elevation:-10,
        height:"100%",
        zIndex:-10,
        paddingTop:5,
        // opacity:0.3
    },
    card_header:{
        flexDirection: "row",
        alignItems: "center",

    },
    drag_wrap:{
        paddingBottom:10
    },
    draggable_title:{
        marginBottom:20,
    },
    title_status:{
        fontSize:fontSize.label,
        fontWeight:"bold",
        textTransform: "uppercase",
        marginRight:20,
    },
    info_draggable:{
        justifyContent:"flex-start",
    },
    small_count:{
        fontSize:14
    },
    img_icon_wrap:{
        width:55,
        height:55,
        color:colors.black,
        opacity:0.3,
        marginRight:10,
        padding:2,
        borderRadius:30,
        borderWidth:2,
        alignItems: "center",
        justifyContent: "center",
    },
    img_icon:{
        width:40,
        height:40,
        color:colors.black,
    },
    list_wrap_draggable:{
        position:"relative",
        paddingLeft:10,
        paddingTop:10,
        zIndex:1,
    },
    h5_seller:{
        fontSize:fontSize.p,
    },
    h4:{
        opacity:0.7,
        fontSize:fontSize.small
    },
    ico_move:{
        color:colors.accent_dark,
        width:17,
        height:17,
        position:"absolute",
        right:5,
        top:5,
        opacity:0.3
    }

})