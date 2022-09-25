import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {View} from "react-native";
import styles from './styles/global';
const Drawer = createDrawerNavigator();

import HeaderTask from "./components/Headers/HeaderTask";
import HeaderHome from "./components/Headers/HeaderHome";
import MenuIcons from './components/MenuIcons';

import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";
import PVFormScreen from './screens/PVForm';
import BudgetsScreen from "./screens/Budgets";
import BudgetDetailScreen from "./screens/BudgetDetail";
import UsersScreen from "./screens/Users";
import ProposalsScreen from "./screens/Proposals";
// import PlanningScreen from "./screens/Planning";
import {colors} from "./styles/defount.json";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useMainContext} from "./contexts/mainContext";

const Stack = createNativeStackNavigator();
import { CommonActions } from '@react-navigation/native';

const Routes = () => {
    const {signed,loggout} = useMainContext();

    const options = ({ route }) => ({
        drawerIcon: ({ color, focused }) => {
            // You can return any component that you like here!
            return <MenuIcons name={route.name} color={color} focused={focused}/>
        },
        drawerActiveTintColor:colors.accent,
        drawerInactiveTintColor:colors.accent_dark,
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerItemStyle:styles.drawerItemStyle,
        headerShown: signed?true:false, //ocultar menu bar
        drawerStyle: {
            ...styles.drawerStyle,
            width:signed?300:0
        },
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerTintColor:colors.white,
        drawerType: signed?"front":'permanent',
        
        
    })

    function HomeStack() {
        return (
            <Stack.Navigator screenOptions={options}>

                <Stack.Screen 
                    name="inicio"
                    options={{headerShown:false}} 
                    component={HomeScreen} />

                <Stack.Screen 
                    name="Formulário fotovoltaico" 
                    component={PVFormScreen} />

                <Stack.Screen 
                    name="Gerenciar usuários" 
                    component={UsersScreen} />

            </Stack.Navigator>
        );
    }


    function BudgetStack() {
        return (
            <Stack.Navigator  initialRouteName="Inicio" screenOptions={options}>

                <Stack.Screen 
                    name="Inicio" 
                    options={{headerShown:false}} 
                    component={BudgetsScreen} />

                <Stack.Screen 
                    name="Detalhes do orçamento" 
                    component={BudgetDetailScreen} 
                    options={{ headerTitle: (props) => <HeaderTask {...props} title="Detalhes do orçamento" /> }} />

                <Stack.Screen 
                    name="Proposta" 
                    component={ProposalsScreen} />

            </Stack.Navigator>
        );
    }

    return (
        

            <Drawer.Navigator initialRouteName="Inicio" screenOptions={options}>
                {!signed?//TELA DE LOGIN
                    <>            
                        <Drawer.Screen name="Inicio" component={LoginScreen} />
                    </>
                :
                    <>
                        <Drawer.Screen 
                            name="Inicio" 
                            component={HomeStack} 
                            options={{ headerTitle: (props) => <HeaderHome {...props} title={"Inicio"} /> }} />

                        <Drawer.Screen 
                            name="Orçamentos" 
                            component={BudgetStack} />
{/* 
                        <Drawer.Screen 
                            name="Planejamento" 
                            component={PlanningScreen} /> */}

                        {/* <Drawer.Screen 
                            name="Configurações" 
                            component={HomeScreen} /> */}
                        

                        <Drawer.Screen 
                            name="Sair" 
                            component={View}
                            listeners={({ navigation}) => ({
                                drawerItemPress: (e) => { /// Sair
                                    e.preventDefault();
                                    navigation.dispatch(//limpar hitorico de navegção para botão de voltar
                                        CommonActions.reset({
                                            index: 0,
                                            routes: [
                                                { name: 'Inicio' },
                                            ],
                                        })
                                    );
                                    
                                    loggout();
                                }
                            })}/>

                    </>
                }
            </Drawer.Navigator>

    );
};

export default Routes;