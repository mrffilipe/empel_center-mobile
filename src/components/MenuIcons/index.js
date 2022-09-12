
import React from 'react';
import { View, Text} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import styles from './styles';

export default function MenuContent({name,color,focused,menuOpen, setMenuOpen}){
    const iconColor = color;
    const iconHeight = 28;
    const iconWidth = 28;
    const Icons = {
        "Inicio":
        <View>
            <Svg fill={iconColor} strokeWidth="0" viewBox="0 0 24 24" height={iconHeight} width={iconWidth} xmlns="http://www.w3.org/2000/Svg">
                <Path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 6h-4V5h4v4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6H5v-4h4v4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z">
                </Path>
            </Svg>
        </View>,
        "Orçamentos":
        <View>
            <Svg fill={iconColor} strokeWidth="0" viewBox="0 0 24 24" height={iconHeight} width={iconWidth} xmlns="http://www.w3.org/2000/Svg">
                <Path d="M4 21h15.893c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zm0-2v-5h4v5H4zM14 7v5h-4V7h4zM8 7v5H4V7h4zm2 12v-5h4v5h-4zm6 0v-5h3.894v5H16zm3.893-7H16V7h3.893v5z">
                </Path>
            </Svg>
        </View>,
        "Planejamento":
        <View>
            <Svg fill={iconColor} strokeWidth="0" viewBox="0 0 24 24" height={iconHeight} width={iconWidth} xmlns="http://www.w3.org/2000/Svg">
                <Path d="M2 3h2v18H2zm18 0h2v18h-2zM5 13h2v1h2v-1h2v1h2v-1h4v1h2v-4h-2v1h-4v-1h-2v1H9v-1H7v1H5zm0-9v4h2V7h8v1h2V7h2V5h-2V4h-2v1H7V4zm0 13v3h2v-1h2v1h2v-1h8v-2h-8v-1H9v1H7v-1H5z">
                </Path>
            </Svg>
        </View>,
        "Configurações":
            <View>
                <Svg fill={iconColor} strokeWidth="0" viewBox="0 0 24 24" height={iconHeight} width={iconWidth} xmlns="http://www.w3.org/2000/Svg">
                    <Path d="M5.122 21c.378.378.88.586 1.414.586S7.572 21.378 7.95 21l4.336-4.336a7.495 7.495 0 0 0 2.217.333 7.446 7.446 0 0 0 5.302-2.195 7.484 7.484 0 0 0 1.632-8.158l-.57-1.388-4.244 4.243-2.121-2.122 4.243-4.243-1.389-.571A7.478 7.478 0 0 0 14.499 2c-2.003 0-3.886.78-5.301 2.196a7.479 7.479 0 0 0-1.862 7.518L3 16.05a2.001 2.001 0 0 0 0 2.828L5.122 21zm4.548-8.791-.254-.616a5.486 5.486 0 0 1 1.196-5.983 5.46 5.46 0 0 1 4.413-1.585l-3.353 3.353 4.949 4.95 3.355-3.355a5.49 5.49 0 0 1-1.587 4.416c-1.55 1.55-3.964 2.027-5.984 1.196l-.615-.255-5.254 5.256h.001l-.001 1v-1l-2.122-2.122 5.256-5.255z">
                    </Path>
                </Svg>
            </View>,
        "Sair":
            <View>
                <Svg style={styles.sair} fill={iconColor} strokeWidth="0" viewBox="0 0 24 24" height={iconHeight} width={iconWidth} xmlns="http://www.w3.org/2000/svg">
                    <Path d="M11 16h2V7h3l-4-5-4 5h3z"></Path>
                    <Path d="M5 22h14c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-4v2h4v9H5v-9h4V9H5c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2z"></Path>
                </Svg>
            </View>

        
    }


    return(
        Icons[name]?
            <View style={styles.container}>

                    <View>
                        <View style={[styles.icons,focused && styles.focusedIcon]}>
                            {Icons[name]}
                        </View>

                        {focused && <View style={[styles.sideBorder,{borderColor:color,}]} />}
                    </View>
                
            </View>
        :
            <View><Text style={{color:color}}></Text></View>
    )
}

