import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'; // Kiểm tra định nghĩa các giá trị này

const PaymentConfirmationScreen = ({ navigation, route }: any) => {
  const {
    seatArray = [],
    time = '',
    date = '',
    ticketImage = '',
    amount = 0 // Đảm bảo số tiền được gán giá trị mặc định
  } = route.params || {};

  const seatList = Array.isArray(seatArray) ? seatArray.join(', ') : '';
  const dateString = typeof date === 'object' ? date.date : date;

  const handlePayment = () => {
    navigation.navigate('SuccessScreen', { amount }); // Truyền số tiền tới SuccessScreen
  };

  const handleCancel = () => {
    navigation.navigate('FailScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Payment Confirmation</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Seats:</Text>
        <Text style={styles.value}>{seatList}</Text>
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{time}</Text>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{dateString}</Text>
        <Text style={styles.label}>Total Amount:</Text>
        <Text style={styles.value}>${amount.toFixed(2)}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  header: {
    padding: SPACING.space_20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.Grey,
    alignItems: 'center',
  },
  headerText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24, 
    fontFamily: FONTFAMILY.poppins_bold, 
  },
  content: {
    padding: SPACING.space_20,
  },
  label: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_medium,
    marginBottom: SPACING.space_4,
  },
  value: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
    marginBottom: SPACING.space_20,
  },
  footer: {
    padding: SPACING.space_20,
    borderTopWidth: 1,
    borderTopColor: COLORS.Grey,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: COLORS.Orange,
    padding: SPACING.space_12,
    borderRadius: 25,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: SPACING.space_8,
  },
  buttonText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_18,
  },
});

export default PaymentConfirmationScreen;
