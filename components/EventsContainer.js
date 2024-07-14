import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

export default function EventsContainer({ deleteOp, events, edit }) {
  return (
    <View style={styles.eventsContainer}>
      <FlatList 
        data={events}
        renderItem={({ item }) => (
            <View style={styles.eventItem}>
            <View style={styles.eventDates}>
                <Text style={styles.eventDescription}>{item.description}</Text>
                <Text>{new Date(item.time).toLocaleTimeString()}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={() => edit(item)} color={colors.blackColor} title='Düzenle' />
                <Button onPress={() => deleteOp(item.id)} color={colors.blackColor} title='Sil' />
            </View>
            </View>
        )}
        keyExtractor={(item) => item.id}
        />
        {events.length === 0 && <Text style={styles.noEventsText}>Bu gün için etkinlik yok</Text>}
      </View>
  )
}

const styles = StyleSheet.create({
    eventsContainer: {
        flex: 1,
        marginTop: 20,
        padding: 10,
        borderRadius : 10,
        borderColor : colors.closedColor,
        margin : 10,
      },
      eventItem: {
        backgroundColor: colors.openColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 5,
        marginVertical: 2,
        borderWidth: 0.2,
        borderColor: colors.closedColor,
      },
      eventDescription: {
        fontSize: 16,
        fontWeight: 'bold',
        color : colors.blackColor
      },
      eventDates: {
        justifyContent: 'space-between',
        width: '70%',
        padding: 5,
      },
      buttonContainer: {
        width: '30%',
        justifyContent: 'space-between',
      },
      noEventsText: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom : 30,
        fontSize: 16,
        color: '#888',
      },
})