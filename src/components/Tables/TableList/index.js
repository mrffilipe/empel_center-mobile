import React from 'react'
import { View, Text} from 'react-native';
import styles from './styles';
import CardSingle from './CardSingle';

const fildsProps = [
    {
        label:String,
        key:String,
        onPress:Function,
        onPressReturn: String,
        labelMinWidth:Number
    },
]

const actionsProps = [
    {
        icon:null,
        onPress:Function,
        onPressReturn:String,
        onPressReturn2:String,
        color:String,
    }
]

const props = {
    data: Array,
    filds:fildsProps,
    actions: actionsProps
}

export default function TableList({data = [], actions = [], filds = []} = props) {


    return (
        <View style={styles.container}>
            <View style={styles.container_length}>
                <Text style={styles.h2}>
                    Resultados ({data.length})
                </Text>
            </View>

            {data.map((val , key) => <CardSingle val={val} key={key} index={key} actions={actions} filds={filds} dataLength={data.length} />)}
        </View>
    )
}

