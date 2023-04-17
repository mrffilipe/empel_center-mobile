import {StyleSheet} from "react-native";
import {colors,fontSize,container, button} from "styles/defount.json"

export default StyleSheet.create({
    container: {
        // marginVertical: 50,
        textAlign: "center",
        paddingBottom:80,
    },

    info_single_wrap:{
        width:"100%",
        maxWidth:375,
        paddingRight:15,
    },
    info_wrap_text:{
        paddingLeft:15,
    },
    info_wrap :{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection:"row",
        flexWrap:'wrap',
        paddingLeft:15,
    },

    info_wrap_div: {
        maxWidth: 450,
        flex:1,
        display: "flex",
        flexWrap: "wrap",
    },

    actions_wrap: {
        paddingTop: 25,
        marginTop:50,
        borderTopWidth:2,
        borderColor:colors.white,
        paddingLeft:15,
    },
    h2:{
        fontSize:fontSize.subtitle,
        color:colors.black,
        fontWeight:"bold",
        marginBottom:25,
        marginTop:35,
    },
    actions: {
        display: "flex",
        alignItems:"stretch",
        justifyContent:"center",
        flexWrap: "wrap",
        flexDirection: "row",
    },
    btn:{
        backgroundColor:colors.secondary,
        paddingVertical:10,
        paddingHorizontal:10,
        width:100,
        // height:100,
        // maxWidth:120,
        alignItems: "center",
        borderRadius:10,
        marginRight:15,
        marginBottom:25,
        elevation:2,
        zIndex:2,
    },  
    actions_icon:{
        width:50,
        height:50,
        color:colors.white,
        marginBottom:5,
    },
    whatsapp: {
        color: "#2bcc46",
    },

    form: {
        color: colors.accent,
    },

    text:{
        color: colors.white,
        fontSize:fontSize.small,
        textAlign: "center",
    }

});
