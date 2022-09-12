import React from 'react';
import {Text} from "react-native";
import {colors,fontSize} from "../../styles/defount.json"
export default function AllClear({msg = String}) {
  return (
    <Text style={{
        textAlign: "center",
        color:colors.black,
        fontSize:fontSize.p
    }}>{msg}</Text>
  )
}
