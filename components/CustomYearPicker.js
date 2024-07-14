import React, { useState } from 'react';
import { Modal, FlatList, Text, TouchableOpacity, View, StyleSheet, Button } from 'react-native';
import { colors } from '../constants/colors';

const CustomYearPicker = ({ visible, onClose, onSelect }) => {
  const currentYear = new Date().getFullYear();
  const getYears = () => {
    let years = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i.toString());
    }
    return years;
  };

  return (
    <Modal style={styles.modalStyle} visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FlatList
            data={getYears()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {
                onSelect(item);
                onClose();
              }}>
                <Text style={styles.yearText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
          <Button style={styles.modalButton} color={colors.blackColor} title="Kapat" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : 'rgba(0,0,0,0.6)'
  },
  modalContent: {
    width: 350,
    height : 400,
    padding: 14,
    backgroundColor: colors.whiteColor,
    borderRadius: 10,
    alignItems: 'center',
  },
  yearText: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 12,
    backgroundColor : 'rgba(0,0,0,0.1)',
    marginVertical : 10,
    color : colors.blackColor
  }
});

export default CustomYearPicker;