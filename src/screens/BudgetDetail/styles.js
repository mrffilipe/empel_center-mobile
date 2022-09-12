import {StyleSheet} from "react-native";
import {colors,fontSize,container, button} from "../../styles/defount.json"

export default StyleSheet.create({
    container:{
        ...container,
        paddingLeft:0,
        paddingRight:0,
    },
    info_wrap:{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-end",
        marginLeft:15,
    },
    info_single:{
        minWidth:180,
        marginRight:15,
        flex:1,
    },
    main:{
        width:"100%",
    },
    margin:{
        marginLeft:15,
    },
    actions_wrap_1:{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        flexWrap:"wrap",
        marginRight:15,
    },
    actions_wrap:{
        justifyContent: "flex-end",
        marginRight:0,
    },
    category:{
        fontWeight: "bold",
        color: colors.accent,
        fontSize:fontSize.subtitle
    },
    btn_send:{
        backgroundColor: colors.green,
        flexWrap:"nowrap",
    },
    btn:{
        ...button,
        paddingHorizontal:5,
        marginTop:25
    },
    btn_send:{
        backgroundColor:colors.green,
        marginLeft:15,
    },
    btn_text:{
        fontSize:fontSize.label,
        color:colors.white,
        fontWeight:"bold",
    },
    status:{
        color:colors.orange,
        fontSize:fontSize.label,
        marginLeft:15,
        fontWeight:"bold",
        paddingTop:5,
    },
    green:{
        color:colors.green
    }

})
