import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {View, Alert} from "react-native";
import styles from './styles/global';
const Drawer = createDrawerNavigator();

import HeaderTask from "./components/Headers/HeaderTask";
import HeaderHome from "./components/Headers/HeaderHome";
import HeaderAddService from "./screens/ServicesOffered/HeaderAddService";
import MenuIcons from './components/MenuIcons';
import HeaderArchive from "./screens/ArchivesManage/HeaderArchive";
import HeaderActivities from "./screens/ActivitiesManage/HeaderActivities";
import HeaderUsers from "./screens/Users/HeaderAddUser";
import HeaderSupllier from "./screens/Supplier/HeaderAddSupplier";
import HeaderAddServiceActived from "./screens/ServicesActived/HeaderAddServiceActived";
import HeaderAddCustomer from "./screens/Customers/HeaderAddCustomers";

import HomeScreen from "./screens/Home";
import Supplier from "./screens/Supplier";
import LoginScreen from "./screens/Login";
import PVFormScreen from './screens/PVForm';
import BudgetsScreen from "./screens/Budgets";
import BudgetDetailScreen from "./screens/BudgetDetail";
import UsersScreen from "./screens/Users";
// import CitiesScreen from "./screens/Cities";
import ProposalsScreen from "./screens/Proposals";
import UserScreen from "./screens/User";
import CustomerScreen from "./screens/Customer";
import CustomersScreen from "./screens/Customers";
import ProfileScreen from "./screens/User";
import ServicesActivedScreen from "./screens/ServicesActived";
import ServicesOfferedScreen from "./screens/ServicesOffered";
import ArchivesManageScreen from "./screens/ArchivesManage";
import ActivitiesManage from './screens/ActivitiesManage';
import Activities from './screens/Activities';
import NotificationsScreen from './screens/Notifications';
// import PlanningScreen from "./screens/Planning";
import {colors} from "./styles/defount.json";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useAuthContext} from "./contexts/authContext";

const Stack = createNativeStackNavigator();
import { CommonActions } from '@react-navigation/native';

const Routes = () => {
    const {signed,logout} = useAuthContext();

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
                    component={UsersScreen}
                    options={{ headerTitle: (props) => <HeaderUsers {...props} title="Gerenciar usuários" /> }} />

                <Stack.Screen 
                    name="Gerenciar Atividades" 
                    component={ActivitiesManage} 
                    options={{ headerTitle: (props) => <HeaderActivities {...props} title="Gerenciar Atividades" /> }} />

                <Stack.Screen 
                    name="Atividades" 
                    component={Activities}
                    options={{ headerTitle: (props) => <HeaderActivities {...props} title="Atividades" myActivities={true}/> }}  />

                <Stack.Screen 
                    name="Cofre de Arquivos" 
                    component={ArchivesManageScreen}
                    options={{ headerTitle: (props) => <HeaderArchive {...props} title="Cofre de Arquivos" /> }} />

                <Stack.Screen 
                    name="Serviços Oferecidos" 
                    component={ServicesOfferedScreen} 
                    options={{ headerTitle: (props) => <HeaderAddService {...props} title="Serviços Oferecidos" /> }} />

                <Stack.Screen 
                    name="Serviços Ativos" 
                    component={ServicesActivedScreen} 
                    options={{ headerTitle: (props) => <HeaderAddServiceActived {...props} title="Serviços Ativos" /> }} />

                <Stack.Screen 
                    name="Clientes" 
                    component={CustomersScreen}
                    options={{ headerTitle: (props) => <HeaderAddCustomer {...props} title="Clientes" /> }} />


                <Stack.Screen 
                    name="Cliente" 
                    component={CustomerScreen} />

                <Stack.Screen 
                    name="Fornecedor Fotovoltaico" 
                    component={Supplier}
                    options={{ headerTitle: (props) => <HeaderSupllier {...props} title="Fornecedor Fotovoltaico" /> }} />

                <Drawer.Screen
                    name="Perfil"
                    component={UserScreen} />

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

                <Stack.Screen 
                    name="Cliente" 
                    component={CustomerScreen} />

                {/* <Stack.Screen 
                    name="Lead" 
                    component={CustomerScreen} /> */}

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
                            component={BudgetStack} 
                            options={{ headerTitle: (props) => <HeaderHome {...props} title={"Orçamentos"} /> }} />


                        <Drawer.Screen 
                            name="Perfil" 
                            component={ProfileScreen} 
                            options={{ headerTitle: (props) => <HeaderHome {...props} title={"Perfil"} /> }} />

                        {/* 
                        <Drawer.Screen 
                            name="Planejamento" 
                            component={PlanningScreen} /> */}

                        {/* <Drawer.Screen 
                            name="Configurar" 
                            component={HomeScreen} /> */}
                        <Drawer.Screen
                            name="Notificações"
                            component={NotificationsScreen}
                            options={{
                                drawerItemStyle: { height: 0 },
                                drawerItemStyle: { display: 'none' },
                                headerTitle: (props) => <HeaderHome {...props} title={"Notificações"} /> 
                            }}/>

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
                                    
                                    Alert.alert(
                                        "Sair",
                                        "Deseja sair da conta?",
                                        [
                                            {
                                                text:"Não",
                                                onPress:()=> {},
                                                type:"default"
                                            },
                                            {
                                                text:"Sim",
                                                onPress:()=> logout()
                                            }
                                        ],
                                        {
                                            cancelable: true,
                                            onDismiss:()=> {}
                                        }
                                    )
                                    
                                }
                            }
                        )}/>

                    </>
                }
            </Drawer.Navigator>

    );
};

export default Routes;