import {StyleSheet} from "react-native";
import {colors,fontSize,container, button} from "../../../styles/defount.json"

export default StyleSheet.create({

    actions_wrap:{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 20,
    },

    checkbox_wrap:{
        marginTop:10,
    },

    btn_green:{
        backgroundColor: colors.green,
    },
    btn:{
        ...button,
        paddingHorizontal:10,
        marginTop:10,
        height:40,
    },
    btn_text:{
        fontSize:fontSize.label,
        color:colors.white,
        fontWeight:"bold",
    },

    btn_wrap:{
        textAlign: "center",
        marginTop:30,
        flexDirection: "row",
        justifyContent: "flex-end",
    },

    btn_submit:{
        marginLeft:30,
    },
    btn_red:{
        backgroundColor:colors.red,
        minWidth:130,
    },
    icon_trash:{
        backgroundColor: colors.primary,
        color:colors.red,
        width:23,
        height:23,
        marginLeft:50
    },
    extra_or_discount_button:{
        position:"absolute",
        right: 0,
        top: 20,
        color:colors.red,
        Zindex: 1,
        elevation:2,
        fontSize:16,
    },
    add_extra_or_discount:{
        paddingTop: 15
    },
    
    add_extra_or_discount_h3:{
        fontSize:fontSize.h3,
        textAlign: 'center',
        fontWeight:"bold",
        color: colors.black,
        opacity: .8,
    },
    
    add_extra_or_discount_div:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
    },
    
    add_extra_or_discount_button:{
        marginTop: 10,
        alignItems:"center",
        backgroundColor:colors.secondary,
        paddingBottom:5,
        paddingTop:2,
        borderRadius: 5,
        minWidth:120,
        justifyContent: "center",
        marginHorizontal:15,

    },
    add_extra_or_discount_button_text:{
        fontSize:fontSize.p,
        color: colors.white,
        fontWeight:"bold",
    },
    extra_wrap:{
        position:"relative",
    }
})
