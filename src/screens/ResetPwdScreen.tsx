import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, SIZES } from '../theme/theme';

const ResetPwdScreen = ({ navigation }: any) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New password and confirmation do not match');
            return;
        }
        // Logic to handle password change
        Alert.alert('Success', 'Password changed successfully', [
            {
                text: 'OK',
                onPress: () => navigation.navigate('SignInScreen') // Navigate to the SignInScreen after successful password change
            }
        ]);
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
    title: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: SIZES.h1,
        marginVertical: 10,
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
