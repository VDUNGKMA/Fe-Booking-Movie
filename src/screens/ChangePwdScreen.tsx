import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme';
import { changePassword } from '../api/api';

const ChangePwdScreen = ({route,navigation}: any) => {
    const { userId } = route.params || {};
    
    console.log('User ID:', userId); // Log userId để kiểm tra

    if (!userId) {
        Alert.alert('Error', 'User ID is missing');
        navigation.goBack();
        return null;
    }

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async () => {
        if (!currentPassword) {
            Alert.alert('Error', 'Please enter your current password');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New password and confirmation do not match');
            return;
        }
    
        try {
            const response = await changePassword(userId, currentPassword, newPassword);
            console.log('Response:', response); // Log response để kiểm tra
            if (response.status === 'success') {
                Alert.alert('Success', 'Password changed successfully', [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('SignInScreen')
                    }
                ]);
            } else {
                Alert.alert('Error', response.message || 'Failed to change password');
            }
        } catch (error) {
            // console.error('Error in changePassword:', error); // Log chi tiết lỗi
            // console.error('Error response:', error.response); // Log response để kiểm tra
           // const errorMessage = error.response?.data?.message || error.message || 'Failed to change password';
            //Alert.alert('Error', errorMessage);
        }
        
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
        backgroundColor: COLORS.Black,
        paddingHorizontal: SPACING.space_20,
        paddingTop: 50,
    },
    title: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_24,
        marginBottom: 30,
        color: COLORS.White,
        textAlign: 'center',
    },
    textinput: {
        backgroundColor: COLORS.White,
        borderRadius: 8,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
        paddingVertical: SPACING.space_12,
        paddingHorizontal: SPACING.space_15,
        marginVertical: SPACING.space_15,
        color: COLORS.Black,
    },
    button: {
        backgroundColor: COLORS.Orange,
        paddingVertical: SPACING.space_12,
        paddingHorizontal: SPACING.space_40,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: SPACING.space_20,
    },
    buttonTxt: {
        color: COLORS.White,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
    }
});

export default ChangePwdScreen;
