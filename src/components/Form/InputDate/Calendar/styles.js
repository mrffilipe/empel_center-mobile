import { StyleSheet } from "react-native";
import {colors, fontSize, modal} from "../../../../styles/defount.json";
export default StyleSheet.create({

    modal: {
        ...modal,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    calendarWrap: {
        width: "100%",
        paddingBottom: 20,
        backgroundColor: "#F3F3F3",
        borderRadius: 10,
        paddingTop: 5,
    },
    btnWrap: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 40,
        paddingTop:50,
        paddingBottom:0,
    },
    submit: {
        width: 124,
        paddingTop:3,
        paddingBottom:7,
        backgroundColor: colors.accent,
        color: colors.white,
        textAlign: "center",
        borderRadius: 5,
        fontSize: fontSize.label,
    },
    cancel: {
        backgroundColor: colors.red,
        color: colors.white,
        marginRight:50,
    }

})