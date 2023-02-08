import {StyleSheet} from "react-native";
import {colors, fontSize, container, limitSize, button} from "../../styles/defount.json"

export default StyleSheet.create({
    container:{
        ...container,
        paddingRight:0,
        alignItems:"stretch",
    },
    form:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:"flex-end",
    },
    input_single:{
        flex:1,
        minWidth:180,
        marginRight:15,

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
    form_filter:{
        flexDirection:"row",
        flexWrap:"wrap",
        marginTop:15,
        flex:1,
        justifyContent:"space-between",
        marginRight:15,
    },
    btn_red:{
        backgroundColor:colors.orange
    },
    table_wrap:{
        flex:1,
        width:"100%",
    }
})