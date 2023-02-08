import { Calendar, LocaleConfig } from 'react-native-calendars';
import { View, Text, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import styles from "./styles";

export default function Calendars({ setModalVisible, setSave, select = {} }) {
    LocaleConfig.locales['fr'] = {
        monthNames: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro'
        ],
        monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abri', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
        dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
        dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        today: "Hoje"
    };
    LocaleConfig.defaultLocale = 'fr';

    const [selection, setSelection] = useState(select)

    const cancel = () => {
        setModalVisible(false)
    }

    const save = () => {
        setSave(selection)
        setModalVisible(false)
    }
    return (
        <View style={styles.modal}>
            <View style={styles.calendarWrap}>
                <Calendar
                    markingType={'custom'}
                    markedDates={selection}

                    onDayPress={day => {
                        setSelection({})
                        let d = {}
                        d[day.dateString] = { selected: true, selectedColor: '#061887' };
                        setSelection(d)
                    }}
                    style={{
                        borderRadius: 10,
                        paddingBottom:10,
                    }}
                    theme={{
                        backgroundColor: '#F3F3F3',
                        calendarBackground: '#F3F3F3',
                        textSectionTitleColor: '#061887',
                        textSectionTitleDisabledColor: '#BDBDBD',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#061887',
                        dayTextColor: '#333333',
                        textDisabledColor: '#BDBDBD',
                        arrowColor: '#061887',
                        disabledArrowColor: '#BDBDBD',
                        monthTextColor: '#333333',
                        indicatorColor: '#061887',
                        // textDayFontFamily: 'Roboto_400Regular',
                        // textMonthFontFamily: 'Roboto_700Bold',
                        // textDayHeaderFontFamily: 'Roboto_400Regular',
                        textDayFontSize: 17,
                        textMonthFontSize: 22,
                        textDayHeaderFontSize: 18
                    }}
                />

                <ScrollView>
                    <View style={styles.btnWrap}>
                        <Pressable onPress={() => cancel()} android_ripple={{ color: "rgba(255, 255, 219,0.4)", foreground: true }}>
                            <Text style={[styles.submit, styles.cancel]}>Cancelar</Text>
                        </Pressable>
                        <Pressable onPress={() => save()} android_ripple={{ color: "rgba(50, 74, 219,0.4)", foreground: true }}>
                            <Text style={[styles.submit]}>Selecionar</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}