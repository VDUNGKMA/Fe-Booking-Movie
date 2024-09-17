import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../theme/theme';
import api from '../api/api'; // Import file API
import { AxiosError } from 'axios';
import axios from 'axios';

const ForgetPwdScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSendEmail = async () => {
        try {
            // Gọi API để gửi email khôi phục mật khẩu
            const response = await api.post('/api/auth/forgotPassword', { email });

            if (response.status === 200) {
                setSuccess('Password recovery email sent successfully.');
                navigation.navigate('VerificationScreen'); // Điều hướng đến màn hình xác minh sau khi gửi email thành công
            } else {
                setError('Unable to send recovery email. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setError('Unable to connect to the server. Please try again later.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>
                Enter your email address below and we will send you an email with instructions on how to reset your password.
            </Text>
            <TextInput
                placeholder='Enter your email'
                value={email}
                onChangeText={setEmail}
                style={styles.textinput}
                placeholderTextColor="gray"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {success ? <Text style={styles.successText}>{success}</Text> : null}
            <TouchableOpacity onPress={handleSendEmail}>
                <View style={styles.button}>
                    <Text style={styles.buttonTxt}>Send</Text>
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
    subtitle: {
        fontWeight: '500',
        color: 'black',
    },
    textinput: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        fontSize: SIZES.h4,
        paddingVertical: 10,
        marginVertical: 30,
        color: 'black',
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 60,
        alignItems: 'center',
    },
    buttonTxt: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: SIZES.h4,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
    successText: {
        color: 'green',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default ForgetPwdScreen;
