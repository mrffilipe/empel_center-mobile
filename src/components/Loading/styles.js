import {StyleSheet} from "react-native";
import {modal} from "../../styles/defount.json"

export default StyleSheet.create({
    modal:{
        ...modal,
        "backgroundColor": "rgba(0, 0, 0, 0.2)",
    },
    animation:{
        maxWidth:180,
    }
})