import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme';

const CardScreen = ({ navigation }: any) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [bankName, setBankName] = useState('');

  const handleSave = () => {
    if (!accountNumber || !accountHolder || !bankName) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
  
    // Truyền thông tin thẻ ngân hàng qua navigation
    Alert.alert('Success', 'Bank account details saved successfully', [
      {
        text: 'OK',
        onPress: () => {
          // Điều hướng đến InfoCardScreen và truyền dữ liệu thẻ ngân hàng
          navigation.navigate('InfoCardScreen', {
            accountNumber,
            accountHolder,
            bankName,
          });
        },
      },
    ]);
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Bank Account</Text>
      <TextInput
        placeholder='Account Number'
        value={accountNumber}
        onChangeText={setAccountNumber}
        style={styles.input}
      />
      <TextInput
        placeholder='Account Holder Name'
        value={accountHolder}
        onChangeText={setAccountHolder}
        style={styles.input}
      />
      <TextInput
        placeholder='Bank Name'
        value={bankName}
        onChangeText={setBankName}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.space_20,
    backgroundColor: COLORS.White,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    marginBottom: SPACING.space_20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.Black,
    fontSize: FONTSIZE.size_16,
    marginBottom: SPACING.space_15,
    paddingVertical: SPACING.space_10,
  },
  button: {
    marginTop: SPACING.space_20,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    textAlign: 'center',
  },
});

export default CardScreen;
