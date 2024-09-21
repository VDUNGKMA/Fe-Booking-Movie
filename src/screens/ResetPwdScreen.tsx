import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme';
import api from '../api/api';

const ResetPwdScreen = ({ route, navigation }: any) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { email } = route.params;

    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New password and confirmation do not match');
            return;
        }

        try {
            const response = await api.post('/api/auth/resetPassword', {
                email,
                newPassword: newPassword
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Password changed successfully', [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('SignInScreen') // Điều hướng sau khi đổi mật khẩu thành công
                    }
                ]);
            } else {
                Alert.alert('Error', 'Unable to change password');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while changing the password');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>

            {/* New Password Input */}
            <View style={styles.textBox}>
                <TextInput
                    placeholder='New Password'
                    placeholderTextColor={COLORS.Grey}
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                    style={styles.textinput}
                />
            </View>

            {/* Confirm Password Input */}
            <View style={styles.textBox}>
                <TextInput
                    placeholder='Confirm New Password'
                    placeholderTextColor={COLORS.Grey}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={styles.textinput}
                />
            </View>

            {/* Change Password Button */}
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Change Password</Text>
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
        padding: SPACING.space_12,
        borderRadius: 8,
        marginBottom: SPACING.space_15,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 12,
    },
    textinput: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
        color: COLORS.Black,
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
    }
});

export default ResetPwdScreen;
