import {StyleSheet} from "react-native";
import {colors,fontSize,container, button} from "../../styles/defount.json"

export default StyleSheet.create({
    container:{
        ...container,
        display: 'flex',
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems: "center",
    },
    main:{
        display: 'flex',
        flexDirection: "row",
        flexWrap:"wrap",
    },
    btn_option:{
        flex:1,
        margin:15,
        display: 'flex',
        alignItems: 'center',
        paddingTop:30,
        backgroundColor:colors.white,
        borderRadius:10,
        minWidth:250,
        maxWidth:300,
    },
    ico:{
        width:20,
        height:20,
        color:colors.accent,
        color:colors.white,
    },
    ico2:{
        width:14,
        height:14,
        color:colors.accent,
        color:colors.white,
        left:-3
    },
    btn_text:{
        color:colors.white,
        fontSize:fontSize.p,
        marginLeft:3,
        fontWeight:"bold",
    },
    add_user:{
        ...button,
        backgroundColor:colors.green,
    },
    order:{
        ...button,
        minWidth:160
    }
})