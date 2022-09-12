import {StyleSheet} from "react-native";
import {colors, fontSize} from "../../../styles/defount.json";
export default StyleSheet.create({
    formSelect:{
        display: 'flex',
        flexDirection: 'row',
        paddingTop:20,
        flexWrap:"wrap",
        alignItems: "flex-start",
    },
    label:{
        color: colors.black,
        fontSize:fontSize.label,
        fontWeight:"bold",
        opacity:0.7,
        marginRight:10,
        marginBottom:5,
    },
    select:{
        flex:1,
        borderBottomWidth:1,
        paddingHorizontal:0,
        minWidth:150,
        borderColor:colors.accent,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    select_w100:{
        minWidth:"100%",
    },
    value:{
        fontSize:fontSize.label,
        color: colors.accent,
    },
    modal:{
        position:"relative"
    },
    overlay:{
        position:"absolute",
        height:"100%",
        width:"100%"
    },
    options:{
        backgroundColor:"rgba(34, 35, 46,0.99)",
        flex:1,
        display: "flex",
        position:"relative",
        zIndex:1,
        elevation:1
    },
    options_wrap:{
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal:30,
    },
    option:{
        borderBottomWidth:1,
        paddingHorizontal:10,
        borderColor:colors.black,
        width:"100%",
        maxWidth:300,
        paddingVertical:10,
        backgroundColor:colors.white,
    },
    optionText:{
        fontSize:fontSize.subtitle,
        color: colors.black,
    },
    optionSelected:{
        backgroundColor:"rgba(220, 220, 220, 1)",
    },
    icon:{
        height:20,
        width:20,
        color:colors.accent,
        marginRight:10,
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