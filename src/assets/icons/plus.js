import React from 'react'
import Svg,{Path} from "react-native-svg";

export default function Plus({style}) {
  return (
    <Svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <Path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></Path>
    </Svg>
  )
}
