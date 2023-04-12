import React from "react";
import { useNavigation } from '@react-navigation/native';
import Table from "../../../components/Tables/Table";
const props = {
    data:[{
        id:Number,
        name:String,
        email:String,
        phone:Number,
        typeAccess:String,
    }],
    getData:Function
}
export default function TableManager({data, getData} = props) {
    const navigation = useNavigation();

    const filds = [
        {
            label:"Nome",
            key:"fullName",
            onPress:(id)=>navigation.navigate("Cliente",{id}),
            onPressReturn: "id"
        },
        {
            label:"Data de Cadastro",
            key:"created",
        },
        {
            label:"Serviços Ativos",
            key:"amountOfActiveServices",
        }
    ]

    const actions = [
    ]

    return (
        <>
            <Table 
                data={data}
                filds={filds}
                actions={actions}
            />
        </>
    )
}
