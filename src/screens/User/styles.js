import {StyleSheet} from "react-native";
import {colors,fontSize,container, button} from "../../styles/defount.json"

export default StyleSheet.create({
    container:{
        paddingHorizontal:15,
    },
    profile_image_wrap:{
        alignItems: "center",
        justifyContent: "center",
        flex:1,
        paddingVertical:30,
    },
    profile_image:{
        borderWidth:2,
        borderColor:colors.gray,
        padding:7,
        width:100,
        height:100,
        borderRadius:50,
    },
    img:{
        color:colors.gray,
    },
    btn_edit_icon:{
        width:25,
        height:25,
        color:colors.yellow,
        position:"absolute",
        right:0,
        bottom:3,
    },
    name:{
        color:colors.accent,
        fontWeight:"bold",
        fontSize:fontSize.h3,
        marginTop:5,
    },
    form:{
        flex:1,
    },
    info_single_wrap:{
        flex:1,
        // backgroundColor:colors.accent,
    },
    btn_save:{
        marginTop:30,
    }
})