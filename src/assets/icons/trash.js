import React from 'react'
import Svg,{Path} from "react-native-svg";

export default function Trash({style}) {
  return (
    <Svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <Path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></Path>
        <Path d="M9 10h2v8H9zm4 0h2v8h-2z"></Path>
    </Svg>
  )
}
