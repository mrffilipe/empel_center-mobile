import {StyleSheet} from "react-native";
import {colors} from "../../../styles/defount.json"

export default StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        left:-70,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal:10,
    },
    title: {
        fontSize: 19,
        borderRadius:15,
        fontWeight:"bold",
        paddingLeft:60,
    },
    btn:{
        backgroundColor:colors.secondary,
        padding:2,
        marginRight:15,
        borderRadius:5,
    },
    icon:{
        fontSize:30,
        color:"#fff",
        fontWeight:"bold",
        height:30,
        width:30,
    }
})