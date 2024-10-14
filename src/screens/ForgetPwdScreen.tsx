import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../theme/theme';
import api from '../api/api'; // Import file API

const ForgetPwdScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const handleSendEmail = async () => {
        setLoading(true); // Start loading
        try {
            const response = await api.post('/api/auth/forgotPassword', { email });
            if (response.status === 200) {
                setSuccess('Đã gửi email khôi phục mật khẩu thành công.');
                navigation.navigate('VerificationScreen', { email });
            } else {
                setError('Không thể gửi email khôi phục. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error(error);
            setError('Không thể kết nối với máy chủ. Vui lòng thử lại sau.');
        } finally {
            setLoading(false); // Stop loading after API call completes
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quên Mật Khẩu</Text>
            <Text style={styles.subtitle}>
                Nhập địa chỉ email của bạn bên dưới và chúng tôi sẽ gửi cho bạn email hướng dẫn cách đặt lại mật khẩu.
            </Text>
            <TextInput
                placeholder='Nhập email của bạn'
                value={email}
                onChangeText={setEmail}
                style={styles.textInput}
                placeholderTextColor="#808080"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {success ? <Text style={styles.successText}>{success}</Text> : null}

            {/* Show loading spinner if loading, otherwise show button */}
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.Orange} style={styles.loadingIndicator} />
            ) : (
                <TouchableOpacity onPress={handleSendEmail} style={styles.button} disabled={loading}>
                    <Text style={styles.buttonText}>Gửi</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.Black,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        color: COLORS.White,
        fontSize: SIZES.h1,
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        color: COLORS.WhiteRGBA75,
        fontSize: SIZES.h5,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 30,
    },
    textInput: {
        borderBottomColor: COLORS.WhiteRGBA50,
        borderBottomWidth: 1,
        fontSize: SIZES.h4,
        color: COLORS.White,
        paddingVertical: 8,
        marginVertical: 10,
        width: '100%',
    },
    button: {
        backgroundColor: COLORS.Orange,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 40,
        width: '60%',
        alignItems: 'center',
        shadowColor: COLORS.Black,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: COLORS.White,
        fontWeight: 'bold',
        fontSize: SIZES.h4,
    },
    loadingIndicator: {
        marginTop: 40,
    },
    errorText: {
        color: COLORS.Red,
        fontSize: SIZES.h5,
        textAlign: 'center',
        marginTop: 10,
    },
    successText: {
        color: COLORS.Green,
        fontSize: SIZES.h5,
        textAlign: 'center',
        marginTop: 10,
    },
});

export default ForgetPwdScreen;
