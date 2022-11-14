import {StyleSheet} from "react-native";
import {colors,fontSize,container,limitSize} from "../../../styles/defount.json"

export default StyleSheet.create({
    container:{
        marginTop:20,
        minHeight:0,
        paddingTop:0,
        paddingBottom:5,
        paddingHorizontal:0,
        backgroundColor:colors.primary
    },
    list:{
        paddingHorizontal:10,
    },
    info:{
        backgroundColor:colors.white,
    },
    table_wrap:{
        width:"100%",
       paddingHorizontal:7,

    },
    text_wrap:{
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        flex:1,
        marginTop:7,
        backgroundColor:"rgba(100,100,100,0.02)"
    },
    h5:{
        minWidth:90,
        color:colors.accent,
        textAlign: "left",
        textTransform: "uppercase",
        marginRight:5,
        flex:1,
    },
    right:{
        textAlign: "right",
    },
    title:{
        color:colors.black,
        fontSize:21,
        paddingTop:10,
        paddingBottom:10,
        paddingHorizontal:10,
        backgroundColor:colors.primary,
        marginBottom:10,
        fontWeight:"bold"
    },
    black:{
        color:colors.black,
    },
    marginTop:{
        marginTop:10,
        backgroundColor:"rgba(100,100,100,0.1)"
    },
    flex1:{
        flex:10,
    }
})
