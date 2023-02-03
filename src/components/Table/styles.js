import {StyleSheet} from "react-native";
import {colors,fontSize,button} from "../../styles/defount.json"

export default StyleSheet.create({
    container:{
        marginTop:10,
        paddingBottom:20,
        // paddingLeft:15,
        
    },
    list:{
        flexDirection:'row',
        flexWrap:"wrap"
    },
    info:{
        backgroundColor:colors.white,
        marginBottom:15,
        borderRadius:5,
        flex:1,
        marginRight:15,
        minWidth:280,
        elevation:2,
        zIndex:2,
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
        elevation:2,
        zIndex:2,
        alignItems: "center",
        justifyContent: "center",
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
    },
    red:{
        backgroundColor:colors.red,
    },
    orange:{
        backgroundColor:colors.orange,
    },
    green:{
        backgroundColor:colors.green,
    },
    blue:{
        backgroundColor:colors.secondary,
    },

    container_length:{
        paddingBottom:15,
        alignItems:"flex-start",
    },
    h2:{
        color:colors.black,
        fontSize:fontSize.p,
        opacity:.5,
        padding:0,
        margin:0,
        fontWeight:"bold",
    },
    icon:{
        width:18,
        height:18,
        color:"#fff",
        marginRight:5
    }
})
