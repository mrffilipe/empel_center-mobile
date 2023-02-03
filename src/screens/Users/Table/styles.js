import {StyleSheet} from "react-native";
import {colors,fontSize,button} from "../../../styles/defount.json"

export default StyleSheet.create({
    container:{
        marginTop:10,
        paddingBottom:20,
        // paddingHorizontal:15,
        marginLeft:15,
        flex:1,
    },
    list:{
        flexDirection:'row',
        flexWrap:"wrap"
    },
    info:{
        backgroundColor:colors.white,
        marginBottom:15,
        borderRadius:5,
        marginRight:15,
        elevation:2,
        zIndex:2,
        flex:1,
        minWidth:280,
    },
    info_desabled:{
        opacity:0.8,
    },
    table_wrap:{
        width:"100%",
        paddingHorizontal:10,
        paddingVertical:10,
    },
    text_wrap:{
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop:7,
        backgroundColor:"rgba(150,150,150,0.02)",
    },
    select_wrap:{
        flex:1,
        display: 'flex',
        alignItems: "flex-end",
        paddingTop:0,
    },
    select:{
        paddingTop:0,
        maxWidth:180,
        justifyContent:"flex-end",
    },
    h5:{
        textAlign: "left",
        marginRight:5,
        fontWeight:"bold",
        fontSize:fontSize.p,
        color:colors.black,
        opacity:.8
    },
    content_wrap:{
        flex:1,
    },
    h5_content:{
        opacity:1,
        flex:1,
        marginBottom:3,
        color:colors.accent,
    },
    right:{
        textAlign: "right",
    },
    marginTop:{
        marginTop:10,
        backgroundColor:"rgba(100,100,100,0.1)"
    },
    btn:{
        ...button,
        backgroundColor:colors.red,
        paddingTop:1,
        paddingBottom:4,
    },
    btn_activete:{
        backgroundColor:colors.orange,
    },
    btn_text:{
        color:colors.white,
        fontSize:fontSize.small,
        fontWeight:"bold"
    },
    not_link:{
        color:colors.black
    }
})
