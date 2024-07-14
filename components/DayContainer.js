import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

export default function DayContainer({day, selectedDay}) {
  return (
    <Text style={[styles.dayText, day === selectedDay && styles.dayTextSelected]}>
        {day}
    </Text>
  )
}

const styles = StyleSheet.create({
    dayText: {
      fontSize: 12,
      fontWeight: 'bold',
      width: 60,
      padding: 12,
      textAlign: 'center',
      margin: 3,
      backgroundColor: colors.openColor,
      borderWidth : 0.4,
      borderColor : colors.closedColor
    },
    dayTextSelected: {
      backgroundColor: colors.closedColor,
      color: colors.whiteColor,
    },
})