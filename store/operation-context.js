import React, { createContext, useState } from "react";
import axios from "axios";
import FIREBASE_URL from '../firebase/firebaseConfig';
import { getDaysInMonth } from '../operations/dateOperations';
import { month } from "../operations/dateOperations";

export const OperationContext = createContext();

export function OperationContextProvider({ children }) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [days, setDays] = useState(getDaysInMonth(month));
  const [selectedDay, setSelectedDay] = useState(null);
  const [events, setEvents] = useState([]);
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingEventId, setEditingEventId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isYearPickerVisible, setYearPickerVisible] = useState(false);
  const [completed, setCompleted] = useState(null)
  const [array, setArray] = useState([])

  const handleCancel = ()=> {
    setModalVisible(false)
    setEditingEventId(null)
    setDescription('')
  }

  const showAll = () => {
    setCompleted(null)
  }

  const showCompleted = () => {
    setCompleted(true)
  }

  const showUncompleted = () => {
    setCompleted(false)
  }

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedDay(null);
    setEvents([]);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`${FIREBASE_URL}/events/${selectedYear}/${selectedMonth}/${selectedDay}/${eventId}.json`);
      handleDayPress(selectedDay);
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  };

  const handleMonthPress = (monthName) => {
    setSelectedMonth(monthName);
    setDays(getDaysInMonth(monthName));
    setSelectedDay(null);
    setEvents([]);
  };

  const handleEditEvent = (event) => {
    setDescription(event.description);
    setSelectedDate(new Date(event.time));
    setEditingEventId(event.id);
    setModalVisible(true);
  };

  const handleDayPress = async (day) => {
    setSelectedDay(day);
    try {
      const response = await axios.get(`${FIREBASE_URL}/events/${selectedYear}/${selectedMonth}/${day}.json`);
      if (response.data) {
        const eventsData = Object.keys(response.data).map(key => ({
          id: key,
          ...response.data[key],
          time: new Date(response.data[key].time)
        }));
        eventsData.sort((a, b) => a.time - b.time);
        setEvents(eventsData);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  const handleAddEvent = async () => {
    if (!selectedDay) return;

    const event = {
      description,
      time: selectedDate.toISOString(),
    };

    try {
      if (editingEventId) {
        await axios.put(`${FIREBASE_URL}/events/${selectedYear}/${selectedMonth}/${selectedDay}/${editingEventId}.json`, event);
      } else {
        await axios.post(`${FIREBASE_URL}/events/${selectedYear}/${selectedMonth}/${selectedDay}.json`, event);
      }
      setDescription('');
      setSelectedDate(new Date());
      setEditingEventId(null);
      setModalVisible(false);
      handleDayPress(selectedDay); // Refresh events for the selected day
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

  const value = {
    selectedYear,
    selectedMonth,
    days,
    selectedDay,
    events,
    description,
    selectedDate,
    editingEventId,
    isModalVisible,
    isYearPickerVisible,
    handleYearChange,
    handleDeleteEvent,
    handleMonthPress,
    handleEditEvent,
    handleDayPress,
    handleAddEvent,
    setDescription,
    setSelectedDate,
    setEditingEventId,
    setModalVisible,
    setYearPickerVisible,
    handleCancel,
    setCompleted,
    showAll,
    showCompleted,
    showUncompleted,
    array,
    setArray,
  };

  return (
    <OperationContext.Provider value={value}>
      {children}
    </OperationContext.Provider>
  );
}