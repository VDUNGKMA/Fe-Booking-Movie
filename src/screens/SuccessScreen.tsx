import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'; 

interface RouteParams {
  amount?: number; // Hoặc `string` nếu số tiền là chuỗi
}

const SuccessScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();

  // Lấy số tiền từ params nếu có
  const { amount } = route.params as RouteParams;

  // Kiểm tra số tiền và điều hướng nếu không có số tiền
  if (amount === undefined) {
    console.error('No amount provided');
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/image/img15.png')} style={styles.icon} />
      <Text style={styles.title}>Your Tickets</Text>
      <Text style={styles.message}>Congratulations! Your payment of ${amount} was successful.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Navigating to TicketScreen'); // Thêm thông báo debug
          navigation.navigate('Ticket');
        }}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.Black,
    padding: SPACING.space_24,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: SPACING.space_24,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.Red,
    marginBottom: SPACING.space_10,
  },
  message: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
    textAlign: 'center',
    marginBottom: SPACING.space_20,
  },
  button: {
    backgroundColor: COLORS.Orange,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_12,
    borderRadius: 25,
  },
  buttonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
});

export default SuccessScreen;
