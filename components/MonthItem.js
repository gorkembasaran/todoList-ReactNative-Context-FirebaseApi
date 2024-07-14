import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

export default function MonthItem({month ,operations, item}) {
  return (
    <TouchableOpacity onPress={() => operations(item)}>
        <Text style={[styles.itemText, item === month && styles.bold]}>
            {item}
        </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    itemText: {
        fontSize: 12,
        marginHorizontal: 10,
        paddingVertical: 4,
        fontWeight: 'bold',
        color : colors.blackColor
    },
    bold: {
        fontWeight: 'bold',
        color: colors.whiteColor,
        backgroundColor: colors.closedColor,
        padding: 10,
    },
})