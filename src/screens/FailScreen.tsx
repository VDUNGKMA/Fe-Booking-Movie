// FailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

const FailScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/image/img14.png')} 
        style={styles.icon}
      />
      <Text style={styles.title}>Fail</Text>
      <Text style={styles.message}>
        Sorry, your payment could not be processed. Please try again.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PaymentConfirmationScreen')}
      >
        <Text style={styles.buttonText}>Go Back</Text>
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

export default FailScreen;
