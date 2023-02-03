import {StyleSheet} from "react-native";
import {colors,fontSize,container, button} from "../../styles/defount.json"

export default StyleSheet.create({
    container:{
        ...container,
        display: 'flex',
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems: "center",
        flexWrap:"wrap",
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
        flex:1,
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
        height:40,
        flex:1,
        marginLeft:10
    },
    order:{
        ...button,
        paddingVertical:0,
        flex:1,
        height:40,
        maxWidth:200,
        paddingLeft:15,
    },
    select:{
        paddingTop:0,
        padding:0,
        bottom:-1.5,
        text:{
            color:colors.white,
            top:-2,
        },
        select:{
            height:40,
            alignItems:"center",
            justifyContent:"space-between",
            borderBottomWidth:0,
            paddingHorizontal:8,
            minWidth:140,
            alignItems:"flex-end",
            paddingBottom:7,
            flex:1,
            borderRadius:5
        }
        
    },
    container_length:{
        ...container,
        paddingHorizontal:25,
        paddingVertical:0,
        alignItems:"flex-start",
    },
    h2:{
        color:colors.black,
        fontSize:fontSize.p,
        opacity:.5,
        padding:0,
        margin:0,
        fontWeight:"bold",
    }
})