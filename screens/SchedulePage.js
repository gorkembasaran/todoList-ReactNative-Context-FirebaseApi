import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import { OperationContext } from '../store/operation-context';
import CustomYearPicker from '../components/CustomYearPicker';
import MonthItem from '../components/MonthItem';
import DaysContainer from '../components/DaysContainer';
import EventsContainer from '../components/EventsContainer';
import { aylar, month , getDaysInMonth} from '../operations/dateOperations';
import AddModal from '../components/AddModal';
import { colors } from '../constants/colors';

export default function SchedulePage() {
  const {
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
    handleCancel
  } = useContext(OperationContext);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity onPress={() => setYearPickerVisible(true)}>
          <Text style={styles.yearPickerText}>{selectedYear}</Text>
        </TouchableOpacity>
        <FlatList
          data={aylar}
          renderItem={({ item }) => (
            <MonthItem item={item} operations={handleMonthPress} month={selectedMonth} />
          )}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {selectedMonth && (
        <DaysContainer days={days} operations={handleDayPress} selectedDay={selectedDay} />
      )}
      <EventsContainer events={events} edit={handleEditEvent} deleteOp={handleDeleteEvent} />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <AddModal  />
      <CustomYearPicker
        visible={isYearPickerVisible}
        onClose={() => setYearPickerVisible(false)}
        onSelect={handleYearChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : colors.whiteColor
  },
  yearPickerText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: colors.blackColor,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.closedColor,
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: colors.whiteColor,
    fontSize: 30,
  },
  
});