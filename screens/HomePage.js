import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import EventItem from '../components/EventItem'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import FIREBASE_URL from '../firebase/firebaseConfig';
import { days, month, year } from '../operations/dateOperations'
import { Button } from 'react-native-paper'
import { OperationContext } from '../store/operation-context'
import Control from '../components/Control'
import { colors } from '../constants/colors'

export default function HomePage() {
    const [events, setEvents] = useState([])
    const navigation = useNavigation()
    const [completedEvent, setCompletedEvent] = useState([])
    const [uncompletedEvent, setUncompletedEvent] = useState([])
    const { setModalVisible, handleDayPress, array, setArray } = useContext(OperationContext)
    const [selectedCategory, setSelectedCategory] = useState('Tümü');

    const handleAddNav = () => {
        navigation.navigate('SchedulePage')
        handleDayPress(days)
        setModalVisible(true)
    }

    const handleToggleEventCompletion = async (eventId, isCompleted) => {
        setEvents(prevEvents => {
            const updatedEvents = prevEvents.map(event => {
                if (event.id === eventId) {
                    return { ...event, completed: isCompleted };
                }
                return event;
            });
            updateCategoryArray(updatedEvents); // Güncellenmiş eventlere göre array'i güncelle
            return updatedEvents;
        });

        try {
            await axios.patch(`${FIREBASE_URL}/events/${year}/${month}/${days}/${eventId}.json`, { completed: isCompleted });
        } catch (error) {
            console.error("Error updating event: ", error);
        }
    };

    const updateCategoryArray = (updatedEvents) => {
        const completedEvent = updatedEvents.filter(event => event.completed);
        const uncompletedEvent = updatedEvents.filter(event => !event.completed);

        if (array.every(event => event.completed)) {
            setArray(completedEvent);
        } else if (array.every(event => !event.completed)) {
            setArray(uncompletedEvent);
        } else {
            setArray(updatedEvents);
        }
    };

    const getEventToday = async () => {
        try {
            const res = await axios.get(`${FIREBASE_URL}/events/${year}/${month}/${days}.json`);
            if (res.data) {
                const eventsData = Object.keys(res.data).map(key => ({
                    id: key,
                    ...res.data[key],
                    time: new Date(res.data[key].time)
                }));
                setEvents(eventsData);
                setArray(eventsData); // Default olarak tüm event'leri göster
            } else {
                setEvents([])
                setArray([]);
            }
        } catch (error) {
            console.error('Error fetching: ', error)
        }
    };

    useEffect(() => {
        getEventToday();
    }, []);

    useEffect(() => {
        const completedEvent = events.filter(event => event.completed);
        const uncompletedEvent = events.filter(event => !event.completed);
        setCompletedEvent(completedEvent);
        setUncompletedEvent(uncompletedEvent);
    }, [events]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getEventToday(); // Sayfa her odaklandığında verileri yeniden getir
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.dateStyle}>{days} {month} {year}</Text>
            <View style={styles.controls}>
                <Control title='Tümü' events={events} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <Control title='Tamamlanan' events={completedEvent} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <Control title='Bekleyen' events={uncompletedEvent} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </View>
            <FlatList data={array}
                renderItem={({ item }) => (
                    <EventItem item={item} operations={handleToggleEventCompletion} />
                )}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.noEventsText}>Bugün hiçbir etkinliğiniz bulunmuyor.</Text>}
            />
            <Button style={styles.buttonItem} onPress={() => handleAddNav()} >
                <Text style={styles.buttonText}>Bir şeyler ekle</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor : colors.whiteColor
    },
    controls: {
        flexDirection: 'row',
        padding: 20
    },
    dateStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 20,
        marginTop: 20,
        color : colors.blackColor
    },
    noEventsText: {
        textAlign: 'center',
        marginTop: 100,
        fontSize: 16,
        color: '#888'
    },
    buttonItem: {
        backgroundColor: colors.closedColor,
        padding: 10
    },
    buttonText: {
        color: colors.whiteColor,
        fontWeight: 'bold'
    }
})