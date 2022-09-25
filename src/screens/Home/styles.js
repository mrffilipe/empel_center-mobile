import {StyleSheet} from "react-native";
import {colors,fontSize,container} from "../../styles/defount.json"

export default StyleSheet.create({
    container,
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
        maxWidth:350,
    },
    ico:{
        width:60,
        height:60,
        color:colors.accent_dark,
    },
    btn_text:{
        backgroundColor:colors.accent_dark,
        color:colors.white,
        width:"100%",
        textAlign:"center",
        fontSize:fontSize.label,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        paddingVertical:5,
        fontWeight:"bold",
        marginTop:30
    },
})