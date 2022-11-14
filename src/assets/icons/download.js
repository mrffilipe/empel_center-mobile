import React from 'react'
import Svg,{Path} from "react-native-svg";

export default function ArrowDown({style = {}}) {
  return (
    <Svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
       <Path d="m12 16 4-5h-3V4h-2v7H8z"></Path><Path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></Path>
    </Svg>
  )
}