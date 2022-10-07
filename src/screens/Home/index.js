import React,{useState} from "react";
import { ScrollView, View, Pressable, Text } from "react-native";
import styles from "./styles.js";
import ISun from "../../assets/icons/sun";
import IUser from "../../assets/icons/user";
import IMarkMap from "../../assets/icons/mapMark";
import IMagnetic from "../../assets/icons/magnect";
import AddLeads from "../../components/Modal/AddLeads";
import AddCity from "../../components/Modal/AddCity";
export default function Home({navigation}) {
    const [isOpenAddCity, setIsOpenAddCity] = useState(false);
    const [isOpenAddLeads, setIsOpenAddLeads] = useState(false);
    return (
        <ScrollView style={styles.home}>
            <AddCity isOpen={isOpenAddCity} close={setIsOpenAddCity} />
            <AddLeads isOpen={isOpenAddLeads} close={setIsOpenAddLeads} />

            <View style={styles.container}>
                <View style={styles.main}>
                    <Pressable onPress={()=>navigation.navigate("Formulário fotovoltaico")} style={styles.btn_option} android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}>
                        <ISun style={styles.ico}/>
                        <Text style={styles.btn_text}>Formulário fotovoltaica</Text>
                    </Pressable>

                    <Pressable onPress={()=>navigation.navigate("Gerenciar usuários")} style={styles.btn_option} android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}>
                        <IUser style={styles.ico}/>
                        <Text style={styles.btn_text}>Gerenciar usuários</Text>
                    </Pressable>

                    <Pressable onPress={()=>setIsOpenAddCity(true)} style={styles.btn_option} android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}>
                        <IMarkMap style={styles.ico}/>
                        <Text style={styles.btn_text}>Cadastrar cidade</Text>
                    </Pressable>

                    <Pressable onPress={()=>setIsOpenAddLeads(true)} style={styles.btn_option} android_ripple={{ color: "rgba(240, 240, 240, 0.25)"}}>
                        <IMagnetic style={[styles.ico]}/>
                        <Text style={styles.btn_text}>Cadastrar leads</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}  
