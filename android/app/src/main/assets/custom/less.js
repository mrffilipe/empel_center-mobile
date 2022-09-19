import React from 'react'
import Svg,{Path} from "react-native-svg";

export default function Less({style = {}}) {
  return (
    <Svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <Path d="M5 11h14v2H5z"></Path>
    </Svg>
  )
}
