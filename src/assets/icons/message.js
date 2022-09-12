import React from 'react'
import Svg,{Path, Circle} from "react-native-svg";

export default function Message({style}) {
  return (
    <Svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <Path d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.766L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-7.277L9 18.234V16H4V4h16v12z"></Path>
        <Circle cx="15" cy="10" r="2"></Circle>
        <Circle cx="9" cy="10" r="2"></Circle>
    </Svg>
  )
}
