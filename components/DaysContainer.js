import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import DayContainer from './DayContainer'

export default function DaysContainer({ days , operations, selectedDay}) {
  return (
    <View style={styles.daysContainer}>
        {days.map((day, index) => (
        <TouchableOpacity key={index} onPress={() => operations(day)}>
            <DayContainer day={day} selectedDay={selectedDay} />
        </TouchableOpacity>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
    daysContainer: {
        margin: 10,
        marginLeft: 40,
        flexWrap: 'wrap',
        flexDirection: 'row',
      }
})