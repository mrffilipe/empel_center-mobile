import {StyleSheet} from "react-native";
import {colors, fontSize} from "../../../styles/defount.json";
const textColor = colors.black

export default StyleSheet.create({
    input_wrap:{
        width:"100%",
        paddingTop:0,
    },
    input_text:{
        fontSize:fontSize.label,
        color:colors.accent,
    },
    label:{
        fontSize:fontSize.label,
        fontWeight:"bold",
        color:textColor,
    },
    btn:{
        width:35,
        height:35,
        borderRadius:4,
        alignItems:"center",
        justifyContent:"center",
        display:"flex",
        marginRight: 20,
        borderWidth:1,
        borderColor:colors.accent_dark
    },
    options_wrap:{
        flexDirection:"row",
        flexWrap:"wrap",
        alignItems:"center",
        justifyContent:"space-around",
    },
    option_single:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        alignItems:"center",
        justifyContent:"center",
    },
    animated:{
        width:80,
        height:80,
    },
    animated_desabled:{
        display: "none",
    },
    icon:{
        height:"100%",
        width:"100%",
        color:colors.green,
        top:-10,
        left:5,
    },
    input_invalid:{
        borderColor:colors.red
    },
    invalid_alert:{
        position:"absolute",
        bottom:-20,
        color:colors.red
    }
})