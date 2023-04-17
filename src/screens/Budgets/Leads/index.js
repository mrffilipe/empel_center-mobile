import styles from "../../../components/Dragables/styles";
import React, {useState, useEffect, useRef} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import AddLeads  from "../../../components/Modal/AddLeads";
import BtnPlus from "../../../components/Form/BtnPlus";
// import IUser from "../../../assets/icons/user";
import {limitText} from "../../../services/tools";
import { useNavigation } from '@react-navigation/native';
import {useMainContext} from "../../../contexts/mainContext";

export default function Drgables() {
    const navigation = useNavigation();
    const [isOpenAddLeads, setIsOpenAddLeads] = useState(false);

    const {customers} = useMainContext();
    const [data, setData] = useState([]);

    const filterCustomer = ()=>{
        let arr = [...customers];

        arr = arr.filter((val)=> val.amountOfActiveServices == 0);
        arr = arr.map((val)=>{
            return {
                id:val?.id,
                name:val?.fullName,
                email:val?.email,
                origin:val?.leadOrigin,
                date:val?.created,
            }
        })
        setData(arr);
    }

    useEffect(()=>{
        filterCustomer();
    },[customers]);

    return (

        <>
            <View 
            style={[styles.draggable_container]}>
                <AddLeads isOpen={isOpenAddLeads} close={setIsOpenAddLeads} />

                <View style={styles.draggable_title}>
                    <View style={styles?.card_header}>
                        <Text style={[styles.title_status,styles.gray]}>Leads</Text>
                        <BtnPlus onPress={()=>setIsOpenAddLeads(true)}/>
                    </View>
                    
                    <Text style={[styles.small,styles.small_count]}>Resultados ({data.length})</Text> 
                </View>  
            
                <View style={styles.drag_wrap}>
                    {data.map((value,index)=>{
                        return(
                            <TouchableOpacity onPress={()=>navigation.navigate("Cliente",{id:value.id})} key={index}>
                                <View style={[styles.list_wrap, styles.list_wrap_draggable]}>
                    
                                    <View style={[styles.info,styles.info_draggable]} >
                                
                                        <View>
                                            <View style={styles.text_wrap}>
                                                <Text style={[styles.h5,styles.h5_seller]}> 
                                                    {limitText(value?.name,30)} 
                                                </Text>
                                            </View>
                    
                                            <View style={[styles.text_wrap,styles.text_wrap_padding]}>
                                                <Text style={[styles.h5,styles.h4]}>
                                                    {limitText(value?.email,30)} 
                                                </Text>
                                            </View>
                                        </View>
                    
                                    </View>
                                
                    
                                    <View style={styles.actions} >
                                        <View>
                                            <Text style={[styles.small,styles.category]}>{value?.origin}</Text>
                                        </View>
                    
                                        <View>
                                            <Text style={[styles.small, styles.category]}>{value.date}</Text>
                                        </View>
                                    </View>
                                
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </>
    )
}
