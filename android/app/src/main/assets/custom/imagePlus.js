import React from 'react'
import Svg,{Path} from "react-native-svg";

export default function ImagePlus({style = {}}) {
  return (
    <Svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
       <Path d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4V5z"></Path><Path d="m8 11-3 4h11l-4-6-3 4z"></Path><Path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></Path>
    </Svg>
  )
}