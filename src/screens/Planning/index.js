import styles from "./styles";
import Dragables from "../../components/Dragables";
import React, {useState, useEffect} from "react";
import {View, ScrollView} from "react-native";
export default function Planning({navigation}) {

    const [data, setData] = useState([]);
    const d = [
        {
            id:1,
            customer:"Felipe",
            seller:"Bruno",
            category:"Back-End",
            date:"26/07/2022",
            status:1,
            reminder:[
                {   
                    id:1,
                    name: "Jonatã",
                    msg:"Enviar proposta"
                }
            ]
        },
        {
            id:2,
            customer:"Felipe",
            seller:"Bruno",
            category:"Front-End",
            date:"26/07/2022",
            status:2,
            reminder:[]
        },
        {
            id:3,
            customer:"Bruno",
            seller:"Felipe",
            category:"Front-End",
            date:"26/07/2022",
            status:3,
            reminder:[
                {   
                    id:1,
                    name: "Bruno",
                    msg:"Enviar proposta"
                },
                {
                    id:2,
                    name: "Bruno",
                    msg:"Enviar proposta teste"
                },
            ]
        },
        {
            id:4,
            customer:"Felipe",
            seller:"Bruno",
            category:"Back-End",
            date:"26/07/2022",
            status:4,
            reminder:[
                {   
                    id:1,
                    name: "Felipe",
                    msg:"Enviar proposta"
                },
            ]
        }
    ]

    const status = [
        {
            key:1,
            name:"ORÇAMENTO",
            color:"red",
            amount:data.filter(obj => obj.status === 1).length,
        },
        {
            key:2,
            name:"PROPOSTA ENVIADA",
            color:"dark_blue",
            amount:data.filter(obj => obj.status === 2).length,
        },
        {
            key:3,
            name:"NEGOCIÇÃO",
            color:"dark_blue",
            amount:data.filter(obj => obj.status === 3).length,
        },
        {
            key:4,
            name:"Planejamento",
            color:"orange",
            amount:data.filter(obj => obj.status === 4).length,
        },
        {
            key:5,
            name:"Desenvolvendo",
            color:"orange",
            amount:data.filter(obj => obj.status === 5).length,
        },
        {
            key:6,
            name:"FINALIZADO",
            color:"green",
            amount:data.filter(obj => obj.status === 6).length,
        },
        {
            key:7,
            name:"Em produção",
            color:"green",
            amount:data.filter(obj => obj.status === 7).length,
        }
    ]

    useEffect(()=>{
        setData(d);
    },[])

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.plannings}>
                    <Dragables data={data} setData={setData} status={status} navigate={navigation.navigate} />
                </View>
            </View>
        </ScrollView>
    )
}