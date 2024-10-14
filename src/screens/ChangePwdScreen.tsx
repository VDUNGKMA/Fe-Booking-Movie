import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme';
import { changePassword } from '../api/api';

const ChangePwdScreen = ({ route, navigation }: any) => {
    const { userId } = route.params || {};

    if (!userId) {
        Alert.alert('Lỗi', 'Thiếu mã người dùng');
        navigation.goBack();
        return null;
    }

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async () => {
        if (!currentPassword) {
            Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu hiện tại');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu mới và xác nhận không khớp');
            return;
        }

        try {
            const response = await changePassword(userId, currentPassword, newPassword);
            if (response.status === 'success') {
                Alert.alert('Thành công', 'Đổi mật khẩu thành công', [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('SignInScreen')
                    }
                ]);
            } else {
                Alert.alert('Lỗi', response.message || 'Đổi mật khẩu thất bại');
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Xảy ra lỗi trong quá trình đổi mật khẩu');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đổi Mật Khẩu</Text>

            <TextInput
                placeholder='Mật khẩu hiện tại'
                placeholderTextColor={COLORS.grey}
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
                style={styles.textInput}
            />

            <TextInput
                placeholder='Mật khẩu mới'
                placeholderTextColor={COLORS.grey}
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                style={styles.textInput}
            />

            <TextInput
                placeholder='Xác nhận mật khẩu mới'
                placeholderTextColor={COLORS.grey}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.textInput}
            />

            <TouchableOpacity onPress={handleChangePassword}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Xác nhận đổi mật khẩu</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.Black,
        paddingHorizontal: SPACING.space_20,
        paddingTop: 80,
        alignItems: 'center',
    },
    title: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_24,
        marginBottom: SPACING.space_30,
        color: COLORS.White,
        textAlign: 'center',
    },
    textInput: {
        backgroundColor: COLORS.White,
        borderRadius: 10,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
        paddingVertical: SPACING.space_12,
        paddingHorizontal: SPACING.space_15,
        marginVertical: SPACING.space_12,
        color: COLORS.Black,
        width: '100%',
        shadowColor: COLORS.Black,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 8,
        elevation: 6,
    },
    button: {
        backgroundColor: COLORS.Orange,
        paddingVertical: SPACING.space_15,
        paddingHorizontal: SPACING.space_55,
        borderRadius: 25,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: SPACING.space_24,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 10,
        elevation: 10,
    },
    buttonText: {
        color: COLORS.White,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
    }
});

export default ChangePwdScreen;
