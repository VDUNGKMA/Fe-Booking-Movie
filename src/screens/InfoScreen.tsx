import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme';

const InfoScreen = ({ route, navigation }: any) => {
    const { user } = route.params; // Lấy thông tin người dùng từ route.params

    const handleChangePasswordPress = () => {
        navigation.navigate('ChangePwdScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Information</Text>
            <Text style={styles.infoLabel}>Username: {user.username}</Text>
            <Text style={styles.infoLabel}>Email: {user.email}</Text>
            <Text style={styles.infoLabel}>Contact Number: {user.contactNumber}</Text>
            <TouchableOpacity style={styles.button} onPress={handleChangePasswordPress}>
                <Text style={styles.buttonText}>Change Password</Text>
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
  infoLabel: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    marginBottom: SPACING.space_10,
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

export default InfoScreen;