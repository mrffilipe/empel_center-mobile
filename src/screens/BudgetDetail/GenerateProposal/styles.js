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
        paddingHorizontal:5,
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
    }
})
