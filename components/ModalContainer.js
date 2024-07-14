import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ModalContainer() {
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
          <Button title={editingEventId ? "Güncelle" : "Ekle"} onPress={handleAddEvent} color='#7b8a86' />
          <Button title="İptal" onPress={toggleModal} color="#7b8a86" />
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({})