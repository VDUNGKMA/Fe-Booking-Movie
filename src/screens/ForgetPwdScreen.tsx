import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../theme/theme';

const ForgetPwdScreen = ({ navigation }: any) => {
    const handleSendEmail = () => {
        // Logic for sending password recovery email
        navigation.navigate('VerificationScreen'); // Navigate to the verification screen after sending the email
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>Enter your email address below and we will send you an email with instructions on how to reset your password.</Text>
            <TextInput placeholder='Enter your email' style={styles.textinput} />
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
        backgroundColor: 'white', // Set background color to white
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontWeight: 'bold',
        color: 'black', // Set text color to black
        fontSize: SIZES.h1,
        marginVertical: 10,
    },
    subtitle: {
        fontWeight: '500',
        color: 'black', // Set text color to black
    },
    textinput: {
        borderBottomColor: 'black', // Set border color to black
        borderBottomWidth: 1,
        fontSize: SIZES.h4,
        paddingVertical: 10,
        marginVertical: 30,
        color: 'black', // Set text color to black
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
    }
});

export default ForgetPwdScreen;
