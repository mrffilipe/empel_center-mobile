import {StyleSheet} from "react-native";
import {colors,fontSize,button} from "../../../styles/defount.json"

export default StyleSheet.create({
    header:{
        backgroundColor: colors.accent,
        height:60,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15
    },
    header_title:{
        fontSize:21,
        color: colors.white,
        fontWeight:"bold",
        marginLeft:20,
        marginBottom:2
    },
    arrow:{
        width:28,
        height:40,
        color:colors.white,
    },
    takePhoto_wrap:{
        position: "absolute",
        bottom:20,
        left:0,
        right:0,
    justifyContent:"center",
    alignItems: "center",
    },
    takePhoto:{
        width:65,
        height:65,
        borderRadius:32.5,
        backgroundColor:colors.primary,
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
    },
    icon:{
        width:40,
        height:40,
        color:colors.black,
        opacity:0.7
    },
    image_wrap:{
        position: "absolute",
        left:0,
        top:0,
        width:"100%",
        height:"100%",
    },
    image:{
        // minWidth:"90%",
        // minHeight:"90%",
    },
    btn_wrap:{
        position: "absolute",
        bottom:0,
        paddingBottom:10,
        paddingTop:10,
        left:0,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        width:"100%",
        backgroundColor:colors.primary,
    },
    btn:{
        ...button,
        minWidth:130,
        backgroundColor:colors.green,
        opacity:0.8
    },
    btn_text:{
        fontSize:fontSize.label,
        fontWeight:"bold",
        color:colors.white
    },
    btn_red:{
        backgroundColor:colors.red,
        marginRight:50,

    }

})