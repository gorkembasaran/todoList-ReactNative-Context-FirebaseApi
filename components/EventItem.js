import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Checkbox } from 'react-native-paper';
import { colors } from '../constants/colors';

export default function EventItem({ operations, item }) {
    const handlePress = () => {
        operations(item.id, !item.completed);
    };

    return (
        <View style={styles.eventItem}>
            <View style={styles.eventText}>
                <Text style={styles.eventDescription}>{item.description}</Text>
                <Text style={styles.time}>{item.time.toLocaleTimeString()}</Text>
            </View>
            <Checkbox
                backgroundColor={colors.whiteColor}
                color={colors.closedColor}
                status={item.completed ? 'checked' : 'unchecked'}
                onPress={handlePress}
                borderWidth={0.2}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    eventItem: {
        backgroundColor: colors.openColor,
        padding: 10,
        borderRadius: 5,
        borderWidth: 0.2,
        marginVertical: 5,
        borderColor: colors.closedColor,
        height: 100,
        width: 400,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    eventDescription: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.blackColor
    },
    eventText: {
        justifyContent: 'space-between'
    },
    time: {
        fontSize: 12,
        color: '#888'
    }
})