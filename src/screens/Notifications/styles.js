import {StyleSheet} from "react-native";
import {colors, fontSize} from "../../styles/defount.json";

export default StyleSheet.create({
    container:{
        paddingHorizontal:15,
        paddingBottom:100,
        paddingTop:20,
    },
    filter_wrap:{
        flexDirection: 'row',

    },
    filter_btn:{
        backgroundColor:colors.gray,
        borderRadius:5,
        paddingVertical:5,
        paddingHorizontal:20,

        marginRight:15
    },
    filter_btn_selected:{
        backgroundColor:colors.secondary,
    },
    filter_btn_text:{
        fontWeight:"bold",
        fontSize:fontSize.p,
        color:colors.white
    },
    column:{
        marginTop:20,
    },
    notification_single:{
        marginBottom:10,
        paddingHorizontal:20,
        backgroundColor:colors.blue_opacity,
        borderRadius:10,
        paddingVertical:10,
    },
    h2:{
        color:colors.secondary,
        fontSize:fontSize.label,
        fontWeight:"bold",
        flex:1,
        paddingRight:10,
    },
    p:{
        color:colors.black,
        fontSize:fontSize.small,

    },
    dott:{
        width:14,
        height:14,
        borderRadius:7,
        backgroundColor:colors.green,
        position:"absolute",
        right:10,
        top:"55%",
        opacity:.6
    }
})