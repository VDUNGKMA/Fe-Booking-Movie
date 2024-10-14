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
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu mới và xác nhận mật khẩu không khớp');
            return;
        }
        try {
            const response = await api.post('/api/auth/resetPassword', {
                email,
                newPassword,
            });
            if (response.status === 200) {
                Alert.alert('Thành công', 'Đổi mật khẩu thành công', [
                    { text: 'OK', onPress: () => navigation.navigate('SignInScreen') }
                ]);
            } else {
                Alert.alert('Lỗi', 'Không thể thay đổi mật khẩu');
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đổi mật khẩu');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đặt Lại Mật Khẩu</Text>
            <Text style={styles.subtitle}>Nhập và xác nhận mật khẩu mới của bạn bên dưới</Text>

            {/* New Password Input */}
            <View style={styles.textBox}>
                <TextInput
                    placeholder='Mật khẩu mới'
                    placeholderTextColor={COLORS.Grey}
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                    style={styles.textInput}
                />
            </View>

            {/* Confirm Password Input */}
            <View style={styles.textBox}>
                <TextInput
                    placeholder='Xác nhận mật khẩu mới'
                    placeholderTextColor={COLORS.Grey}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={styles.textInput}
                />
            </View>

            {/* Change Password Button */}
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Đổi Mật Khẩu</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.space_20,
        backgroundColor: COLORS.Black,
        paddingTop: 100,
        alignItems: 'center',
    },
    title: {
        fontFamily: FONTFAMILY.poppins_bold,
        fontSize: FONTSIZE.size_24,
        color: COLORS.White,
        marginBottom: SPACING.space_10,
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.WhiteRGBA75,
        textAlign: 'center',
        marginBottom: SPACING.space_30,
    },
    textBox: {
        backgroundColor: COLORS.WhiteRGBA50,
        borderRadius: 10,
        paddingVertical: SPACING.space_15,
        paddingHorizontal: SPACING.space_12,
        marginBottom: SPACING.space_20,
        width: '100%',
        shadowColor: COLORS.Black,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
    },
    textInput: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
        color: COLORS.White,
        paddingHorizontal: 5,
    },
    button: {
        backgroundColor: COLORS.Orange,
        borderRadius: 30,
        paddingVertical: SPACING.space_15,
        paddingHorizontal: SPACING.space_55,
        marginTop: SPACING.space_30,
        alignItems: 'center',
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 6,
    },
    buttonText: {
        color: COLORS.White,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
    },
});

export default ResetPwdScreen;
