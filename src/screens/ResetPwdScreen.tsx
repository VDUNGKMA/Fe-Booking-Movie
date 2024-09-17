import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, SIZES } from '../theme/theme';
import axios from 'axios'; // Sử dụng axios để gọi API
import api from '../api/api';

const ResetPwdScreen = ({ navigation }: any) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New password and confirmation do not match');
            return;
        }

        try {
            // Giả sử token được truyền từ màn hình trước đó hoặc lấy từ storage
            const token = 'user_reset_token'; // Thay thế bằng token thực tế

            const response = await axios.post('/resetPassword', {
                token,  // Token để xác nhận người dùng
                newPassword,  // Mật khẩu mới
            });

            // Kiểm tra phản hồi từ API
            if (response.status === 201) {
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
            console.error('Error resetting password:', error);
            Alert.alert('Error', 'An error occurred while changing the password');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='New Password'
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                style={styles.textinput}
            />
            <TextInput
                placeholder='Confirm New Password'
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.textinput}
            />
            <TouchableOpacity onPress={handleResetPassword}>
                <View style={styles.button}>
                    <Text style={styles.buttonTxt}>Change Password</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    textinput: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        fontSize: SIZES.h4,
        paddingVertical: 10,
        marginVertical: 15,
        color: 'black',
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 30,
        alignItems: 'center',
    },
    buttonTxt: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: SIZES.h4,
    }
});

export default ResetPwdScreen;
