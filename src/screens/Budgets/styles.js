import {StyleSheet} from "react-native";
import {container,colors,button, fontSize} from "../../styles/defount.json"

export default StyleSheet.create({
    container:{
        ...container,
        paddingLeft:0,
        paddingRight:0,
        paddingTop:0,
        display: "flex",
        flex:1
    },
    form:{
        paddingLeft:15,
        marginBottom:20
    },
    budgets:{
        width:"100%",
        display: "flex",
        flex:1
    },
    input_group:{
        display:"flex",
        flexDirection:"row",
        justifyContent: "space-between",
        flexWrap:"wrap",
        alignItems: "flex-end",
    },
    input_group_dates:{
        // maxWidth:700,
    },
    input_single:{
        flex: 1,
        marginRight:15,
        minWidth:180,
        maxWidth:400
    },
    submit:{
        display:"flex",
        flexDirection:"row",
        alignItems: "flex-end",
        marginTop:20,
    },
    btn:{
        ...button,
        minWidth:130,
        marginRight:15,
    },
    btn_text:{
        fontSize:fontSize.label,
        color:colors.white,
        fontWeight:"bold",
    },
    icon:{
        height:25,
        width:25,
        color:colors.white,
        marginRight:5,
        marginTop:2
    },
    btn_red:{
        backgroundColor:colors.orange
    }
})