import React from 'react'
import Svg,{Path} from "react-native-svg";

export default function DetailsList({style = {}}) {
  return (
    <Svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
       <Path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z"></Path>
       <Path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z"></Path>
    </Svg>
  )
}