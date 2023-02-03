import React,{useState} from "react";
import { ScrollView, View, Pressable, Text } from "react-native";
import styles from "./styles.js";
import ISun from "icons/sun";
import IUser from "icons/user";
import IMarkMap from "icons/mapMark";
import IMagnetic from "icons/magnect";
import INetworkChart from "icons/networkChart";
import IArchive from "icons/archive";
import IBriefcase from "icons/briefcase";
import IBriefcase2 from "icons/briefcase2";
import IGroup from "icons/group";
import ILink from "icons/link";

import AddLeads from "../../components/Modal/AddLeads";
import AddCity from "../../components/Modal/AddCity";
import {useAuthContext} from "../../contexts/authContext";
import Feedback from "../../components/Modal/Feedback/index.js";

export default function Home({navigation}) {
    const {hasPermission} = useAuthContext();
    const [isOpenAddCity, setIsOpenAddCity] = useState(false);
    const [isOpenAddLeads, setIsOpenAddLeads] = useState(false);

    const android_ripple = { color: "rgba(240, 240, 240, 0.25)"}
    return (
        <View style={{flex:1}}>
            <Feedback/>

            <ScrollView style={styles.home}>
                <AddCity isOpen={isOpenAddCity} close={setIsOpenAddCity} />
                <AddLeads isOpen={isOpenAddLeads} close={setIsOpenAddLeads} />

                <View style={styles.container}>
                    <View style={styles.main}>
                        <Pressable onPress={()=>navigation.navigate("Formulário fotovoltaico")} style={styles.btn_option} android_ripple={android_ripple}>
                            <ISun style={styles.ico}/>
                            <Text style={styles.btn_text}>Formulário fotovoltaica</Text>
                        </Pressable>

                        {hasPermission()?
                            <>
                                <Pressable onPress={()=>navigation.navigate("Gerenciar usuários")} style={styles.btn_option} android_ripple={android_ripple}>
                                    <IUser style={styles.ico}/>
                                    <Text style={styles.btn_text}>Gerenciar usuários</Text>
                                </Pressable>

                                <Pressable onPress={()=>navigation.navigate("Gerenciar Atividades")} style={styles.btn_option} android_ripple={android_ripple}>
                                    <INetworkChart style={styles.ico}/>
                                    <Text style={styles.btn_text}>Gerenciar Atividades</Text>
                                </Pressable>
                            </>
                            :<>
                                <Pressable onPress={()=>navigation.navigate("Atividades")} style={styles.btn_option} android_ripple={android_ripple}>
                                    <INetworkChart style={styles.ico}/>
                                    <Text style={styles.btn_text}>Gerenciar Atividades</Text>
                                </Pressable>
                            </>
                        }

                        <Pressable onPress={()=>navigation.navigate("Cofre de Arquivos")} style={styles.btn_option} android_ripple={android_ripple}>
                            <IArchive style={styles.ico}/>
                            <Text style={styles.btn_text}>Cofre de Arquivos</Text>
                        </Pressable>
                        
                        <Pressable onPress={()=>navigation.navigate("Serviços Oferecidos")} style={styles.btn_option} android_ripple={android_ripple}>
                            <IBriefcase style={styles.ico}/>
                            <Text style={styles.btn_text}>Serviços Oferecidos</Text>
                        </Pressable>
                        
                        <Pressable onPress={()=>navigation.navigate("Serviços Ativos")} style={styles.btn_option} android_ripple={android_ripple}>
                            <IBriefcase2 style={styles.ico}/>
                            <Text style={styles.btn_text}>Serviços Ativos</Text>
                        </Pressable>

                        <Pressable onPress={()=>navigation.navigate("Gerenciar Cidades")} style={styles.btn_option} android_ripple={android_ripple}>
                            <IMarkMap style={styles.ico}/>
                            <Text style={styles.btn_text}>{hasPermission() ? "Gerenciar Cidades" : "Cidades Cadastradas"}</Text>
                        </Pressable>

                        <Pressable onPress={()=>navigation.navigate("Clientes")} style={styles.btn_option} android_ripple={android_ripple}>
                            <IGroup style={styles.ico}/>
                            <Text style={styles.btn_text}>Clientes</Text>
                        </Pressable>

                        <Pressable onPress={()=>navigation.navigate("Fornecedor Fotovoltaico")} style={styles.btn_option} android_ripple={android_ripple}>
                            <ILink style={styles.ico}/>
                            <Text style={styles.btn_text}>Fornecedor Fotovoltaico</Text>
                        </Pressable>

                        <Pressable onPress={()=>setIsOpenAddLeads(true)} style={styles.btn_option} android_ripple={android_ripple}>
                            <IMagnetic style={[styles.ico]}/>
                            <Text style={styles.btn_text}>Cadastrar leads</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}  
