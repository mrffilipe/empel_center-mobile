import 'react-native-reanimated'
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen'
import {SafeAreaView} from 'react-native';
import Routes from "./routes";
import styles from "./styles/global";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {MainProvider} from "./contexts/mainContext";
const App = () => {
  const backgroundColor = "#F6F4F4";
  const textColor = "#000";
  const borderColor =  "#22232E";
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: backgroundColor,
      text:textColor,
      border:borderColor,
    },
  };

  useEffect(() => {
    SplashScreen.hide()
  })

  return (
    <NavigationContainer theme={MyTheme}>
      <SafeAreaView style={styles.container}>
        <MainProvider>
          <Routes/>  
        </MainProvider>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;