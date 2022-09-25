import {StyleSheet} from "react-native";
import {modal} from "../../styles/defount.json"

export default StyleSheet.create({
    modal:{
        ...modal,
        "backgroundColor": "rgba(0, 0, 0, 0.7)",
    },
    animation:{
        maxWidth:180,
    },
    image: {
        flex: 1,
        position:"absolute",
        width:"100%",
        height:"100%",
    },
})