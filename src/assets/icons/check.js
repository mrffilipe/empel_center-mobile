import React from 'react'
import Svg,{Path} from "react-native-svg";

export default function Check({style = {}}) {
  return (
    <Svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
       <Path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></Path>
    </Svg>
  )
}