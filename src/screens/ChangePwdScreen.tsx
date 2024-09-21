import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme';

const ChangePwdScreen = ({ navigation }: any) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        if (!currentPassword) {
            Alert.alert('Error', 'Please enter your current password');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New password and confirmation do not match');
            return;
        }
        // Giả sử thay đổi mật khẩu thành công
        Alert.alert('Success', 'Password changed successfully', [
            {
                text: 'OK',
                onPress: () => navigation.navigate('SignInScreen') // Điều hướng đến SignInScreen sau khi đổi mật khẩu thành công
            }
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change Password</Text>

            <TextInput
                placeholder='Current Password'
                placeholderTextColor={COLORS.grey}
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
                style={styles.textinput}
            />

            <TextInput
                placeholder='New Password'
                placeholderTextColor={COLORS.grey}
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                style={styles.textinput}
            />

            <TextInput
                placeholder='Confirm New Password'
                placeholderTextColor={COLORS.grey}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.textinput}
            />

            <TouchableOpacity onPress={handleChangePassword}>
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
        backgroundColor: COLORS.Black, // Nền màu đen
        paddingHorizontal: SPACING.space_20,
        paddingTop: 50, // Thay thế SPACING.space_50 bằng giá trị số cụ thể
    },
    title: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_24,
        marginBottom: 30, // Thay thế SPACING.space_30 bằng giá trị số cụ thể
        color: COLORS.White, // Màu trắng cho tiêu đề
        textAlign: 'center',
    },
    textinput: {
        backgroundColor: COLORS.White, // Textbox nền trắng
        borderRadius: 8,
        fontFamily: FONTFAMILY.poppins_regular, // Áp dụng font chữ giống InfoScreen
        fontSize: FONTSIZE.size_16, // Kích thước text giống InfoScreen
        paddingVertical: SPACING.space_12,
        paddingHorizontal: SPACING.space_15,
        marginVertical: SPACING.space_15,
        color: COLORS.Black, // Text màu đen trên nền trắng
    },
    button: {
        backgroundColor: COLORS.Orange, // Nút màu cam
        paddingVertical: SPACING.space_12, // Giảm kích thước nút
        paddingHorizontal: SPACING.space_40, // Giảm kích thước chiều ngang nút
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'center', // Căn giữa nút
        marginTop: SPACING.space_20,
    },
    buttonTxt: {
        color: COLORS.White, // Text màu trắng trên nút
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16, // Áp dụng kích thước và kiểu font giống InfoScreen
    }
});

export default ChangePwdScreen;
