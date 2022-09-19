import { StyleSheet } from "react-native";
import {colors} from "./defount.json";
export default StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerItemStyle:{
        borderRadius:15,
        left:-30,
        marginTop:0,
        width:"107%",
    },
    drawerLabelStyle: {
        fontSize: 19,
        borderRadius:15,
        display:"flex",
        position:"relative",
        left:-40,
        fontWeight:"bold",
    },
    drawerStyle:{
        backgroundColor: colors.primary,//'#2E2B2C'
        paddingTop: 5,
        overflow: "visible",
    },
    headerStyle:{
        backgroundColor:colors.accent,
    },
    headerTitleStyle:{
        color:colors.white,
        fontWeight:"bold",
        fontSize: 21,
    },
});