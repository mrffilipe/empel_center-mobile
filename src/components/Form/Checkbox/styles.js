import {StyleSheet} from "react-native";
import {colors} from "../../../styles/defount.json";

export default StyleSheet.create({
    checkbox:{
        display: 'flex',
        flexDirection: 'row',
        marginTop:20,
    },
    input:{
        width:25,
        height:25,
        position: 'absolute',
        left:36.5,
        backgroundColor:colors.green,
        borderRadius:13,
    },
    btn:{
        borderWidth:1,
        borderColor:"rgb(167, 167, 167)",
        borderRadius:20,
        height:30,
        width:65,
        backgroundColor:"#fff",
        display: "flex",
        alignItems: "flex-start",
        padding:3,
        justifyContent: "center",
    },
    label:{
        fontSize:20,
        fontWeight:"bold",
        opacity:0.7,
        marginRight:20,
        color:colors.black,
    },
    text:{
        fontSize:13,
        color:colors.black,
        marginBottom:2,
        fontWeight:"bold",
        opacity:0.7,
    },
    disabled:{
        alignItems: "flex-end",
    },
    disabled_input:{
        left: 1.5,
        backgroundColor:"rgb(167, 167, 167)",
    },
    enabled:{
        
        alignItems: "flex-start",
    }
})