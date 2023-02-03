import {StyleSheet} from "react-native";
import {modal, colors, fontSize} from "../../styles/defount.json";

export default StyleSheet.create({
    modal:{
        ...modal,
        "backgroundColor": "rgba(0, 0, 0, 0.7)",
    },
    animation:{
        maxWidth:180,
    },
    image: {
        flex: 1,
        position:"absolute",
        width:"100%",
        height:"100%",
    },
    progress:{
        position:"absolute",
        top:"65%",
        width:250,
        alignContent:"center",
        justifyContent:"center",
    },
    progress_text:{
        color:colors.white,
        textAlign:"center",
        fontSize:fontSize.label,
    },
    progress_bar_wrap:{
        position:"relative",
        width:"100%",
    },
    progress_bar:{
        position:"absolute",
        height:6,
        backgroundColor:colors.green,
        borderRadius:3,
        left:0,
        top:30,
    },
    progress_bar_placeholder:{
        width:"100%",
        backgroundColor:"#FFF"
    },
    text:{
        fontSize:fontSize.p,
        textAlign:"center",
        color:colors.white
    }
})