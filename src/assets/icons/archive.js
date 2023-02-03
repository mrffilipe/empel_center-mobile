
import React from 'react'
import Svg,{Path} from "react-native-svg";

export default function Archive({style = {}}) {
    return (
        <Svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24"   xmlns="http://www.w3.org/2000/svg" >
            <Path d="m21.706 5.291-2.999-2.998A.996.996 0 0 0 18 2H6a.996.996 0 0 0-.707.293L2.294 5.291A.994.994 0 0 0 2 5.999V19c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5.999a.994.994 0 0 0-.294-.708zM6.414 4h11.172l.999.999H5.415L6.414 4zM4 19V6.999h16L20.002 19H4z" >
            </Path >
            <Path d="M15 12H9v-2H7v4h10v-4h-2z" >
            </Path >
            </Svg >
    
    )
}

