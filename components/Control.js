import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { OperationContext } from '../store/operation-context'
import { colors } from '../constants/colors'

export default function Control({ title, events, selectedCategory, setSelectedCategory }) {
    const { setArray } = useContext(OperationContext)

    const handlePress = () => {
        setArray(events);
        setSelectedCategory(title);
    };

    return (
        <TouchableOpacity
            style={[styles.control, selectedCategory === title && styles.selectedControl]}
            onPress={handlePress}
        >
            <Text style={[styles.controlText, selectedCategory === title && styles.selectedText]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    control: {
        padding: 10,
        margin: 10,
        backgroundColor: colors.openColor,
    },
    selectedControl: {
        backgroundColor: colors.closedColor,
    },
    controlText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.blackColor
    },
    selectedText: {
      color : colors.whiteColor
    }
})