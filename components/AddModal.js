import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useContext } from 'react'
import { OperationContext } from '../store/operation-context'
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../constants/colors';

export default function AddModal() {
    const {setSelectedDate, isModalVisible, editingEventId, selectedDate, description, setDescription,
        handleAddEvent, handleCancel
    } = useContext(OperationContext)
  return (
    <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Etkinlik {editingEventId ? 'Düzenle' : 'Ekle'}</Text>
          <DateTimePicker
            value={selectedDate}
            mode="time"
            display="default"
            onChange={(event, date) => setSelectedDate(date || selectedDate)}
          />
          <TextInput
            style={styles.input}
            placeholder="Açıklama"
            value={description}
            onChangeText={setDescription}
          />
          <Button title={editingEventId ? "Güncelle" : "Ekle"} onPress={handleAddEvent} color={colors.blackColor} />
          <Button title="İptal" onPress={() => handleCancel()} color={colors.blackColor} />
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: colors.whiteColor,
        padding: 20,
        borderRadius: 10,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 5,
        color : colors.blackColor
      },
      input: {
        height: 50,
        borderColor: colors.blackColor,
        borderWidth: 0.4,
        marginVertical: 10,
        paddingLeft: 8,
        borderRadius: 10,
      },
})