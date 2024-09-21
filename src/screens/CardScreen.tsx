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

      {/* Account Number Input */}
      <View style={styles.textBox}>
        <TextInput
          placeholder='Account Number'
          placeholderTextColor={COLORS.Grey}
          value={accountNumber}
          onChangeText={setAccountNumber}
          style={styles.textinput}
        />
      </View>

      {/* Account Holder Name Input */}
      <View style={styles.textBox}>
        <TextInput
          placeholder='Account Holder Name'
          placeholderTextColor={COLORS.Grey}
          value={accountHolder}
          onChangeText={setAccountHolder}
          style={styles.textinput}
        />
      </View>

      {/* Bank Name Input */}
      <View style={styles.textBox}>
        <TextInput
          placeholder='Bank Name'
          placeholderTextColor={COLORS.Grey}
          value={bankName}
          onChangeText={setBankName}
          style={styles.textinput}
        />
      </View>

      {/* Save Button */}
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
    backgroundColor: COLORS.Black,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    marginBottom: SPACING.space_20,
    color: COLORS.White,
  },
  textBox: {
    backgroundColor: COLORS.White,
    padding: SPACING.space_8,  // Giảm padding cho text box nhỏ lại
    borderRadius: 8,
    marginBottom: SPACING.space_10,  // Giảm margin giữa các text box
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 12,
  },
  textinput: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,  // Giảm font size cho chữ nhỏ hơn
    color: COLORS.Black,
    paddingVertical: SPACING.space_8,  // Giảm padding dọc để text box nhỏ hơn
  },
  button: {
    marginTop: SPACING.space_20,
    backgroundColor: COLORS.Orange,
    paddingVertical: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
  },
});

export default CardScreen;
