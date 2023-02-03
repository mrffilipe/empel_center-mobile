import {StyleSheet} from "react-native";
import {colors,fontSize,container, button} from "../../styles/defount.json"

export default StyleSheet.create({
    container:{
        paddingHorizontal:15,
    },
    form_filter:{
        flexDirection:"row",
        alignItems:"flex-end",
        justifyContent:"space-between",
        flexWrap:'wrap'
    },
    form_group:{
        flex:1,

    },
    btn_group:{
        // alignItems:"flex-end",
        marginTop:15,
        flex:1,
        minWidth:200,
    },
    btn_add_service:{
        paddingVertical:20,
        alignContent:"center",
        justifyContent:"center",
        backgroundColor:colors.green,
    }
})