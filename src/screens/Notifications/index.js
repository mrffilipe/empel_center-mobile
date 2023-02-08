import React, { useState, useEffect } from 'react'
import styles from "./styles.js";
import { ScrollView, View, TouchableOpacity, Text} from 'react-native';
export default function Notifications({navigation, route}) {
    const {notifications} = route.params;
    const [data, setData] = useState([]);
    const [filterSelected, setFilterSelected] = useState(0);

    var filterOptions = [{name:"Tudo",selected:true},{name:"Não lidas",selected:false}];

    const filter = (boo)=>{
        if(boo){
            let arr = notifications.filter(val => !val.view);
            setFilterSelected(1);
            return setData(arr);
        }
        setFilterSelected(0);
        setData(notifications);
    }

    useEffect(()=>{
        if(notifications)
            filter();
    },[])


    return (
        <ScrollView>

            <View style={styles.container}>
                <View style={styles.filter_wrap}>
                    <TouchableOpacity 
                    style={filterSelected === 0 ? [styles.filter_btn,styles.filter_btn_selected] : [styles.filter_btn]} 
                    onPress={()=>filter(false)}>
                        <Text style={styles.filter_btn_text}>{filterOptions[0].name}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={filterSelected === 1 ? [styles.filter_btn,styles.filter_btn_selected] : [styles.filter_btn]} 
                    onPress={()=>filter(true)}>
                        <Text style={styles.filter_btn_text}>{filterOptions[1].name}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.column}>
                    {data.map((val,key)=>{

                        return(
                            <TouchableOpacity style={styles.notification_single} key={key}>
                                <Text style={styles.h2}>{val?.name}</Text>
                                <Text style={styles.p}>{val?.date}</Text>

                                {!val.view ? <View style={styles.dott}/> : <></>}
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    )
}
