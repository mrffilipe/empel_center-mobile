import {StyleSheet} from "react-native";


export default StyleSheet.create({
    container:{
        display: 'flex',
        paddingTop:50,
        alignItems: 'center',
        flex:1
    },
    form:{
        width:"100%",
        paddingVertical:30,
        paddingHorizontal:30,
        maxWidth:500,
    },
    text:{
        color:"#22232E",
        textAlign:"center",
        fontSize:26,
        fontWeight:"bold",
    },
    tinyLogo:{
        width:200,
        height:200
    },
    btn_wrap:{
        marginTop:30,
    },
    btn_submit:{
        paddingTop:9,
        paddingBottom:12,
    }
})