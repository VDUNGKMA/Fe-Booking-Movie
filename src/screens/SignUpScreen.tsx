
// export default SignUpScreen;
import React, { useState } from 'react';
import { View, Text, ImageBackground, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../theme/theme';
import api from '../api/api';
import { AxiosError } from 'axios';

const SignUpScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSignUp = async () => {
        if (!username || !email || !contactNumber || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await api.post('/api/auth/register-customer', {
                username,
                email,
                phone_number: contactNumber,
                password,
            });
            if (response.status === 201) {
                navigation.navigate('SignInScreen');
            }
        } catch (err) {
            if (err instanceof AxiosError && err.response) {
                setError(err.response.data.message || 'Something went wrong');
            } else {
                setError('Unable to connect to the server. Please try again later.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/image/register.jpg')}
                style={{ flex: 1 }}
                resizeMode="cover"
            >
                <View style={styles.overlay} />
                <View style={styles.overlay} />
                <ScrollView>
                    <View style={styles.topContainer}>
                        <Text style={styles.title}>Bắt đầu</Text>
                        <Text style={styles.subtitle}>Đăng ký để tiếp tục</Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <TextInput
                            placeholder='Tên người dùng'
                            style={styles.textInput}
                            placeholderTextColor={COLORS.lightGrey}
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            placeholder='Email'
                            style={styles.textInput}
                            placeholderTextColor={COLORS.lightGrey}
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            placeholder='Số điện thoại'
                            style={styles.textInput}
                            placeholderTextColor={COLORS.lightGrey}
                            value={contactNumber}
                            onChangeText={setContactNumber}
                        />
                        <TextInput
                            placeholder='Mật khẩu'
                            style={styles.textInput}
                            placeholderTextColor={COLORS.lightGrey}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    {error && <Text style={styles.errorText}>{error}</Text>}
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={handleSignUp} style={styles.buttonShadow}>
                            <View style={styles.button}>
                                <Text style={styles.btnText}>ĐĂNG KÝ</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                            <Text style={styles.text}>Bạn đã có tài khoản? | Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
    },
    topContainer: {
        marginTop: 80,
        alignItems: 'center',
        paddingTop:80
    },
    title: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: SIZES.h1 * 1.4,
        letterSpacing: 1,
    },
    subtitle: {
        color: COLORS.white,
        fontSize: SIZES.h4,
        paddingTop: 5,
        letterSpacing: 0.5,
    },
    dataContainer: {
        marginTop: 50,
    },
    textInput: {
        color: COLORS.white,
        fontSize: SIZES.h3,
        borderBottomColor: COLORS.lightGrey,
        borderBottomWidth: 1,
        paddingVertical: 15,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    errorText: {
        color: 'red',
        fontSize: SIZES.h5,
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
    },
    btnContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    buttonShadow: {
        borderRadius: 10,
        shadowColor: COLORS.Black,
        shadowOpacity: 0.4,
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 5,
    },
    button: {
        backgroundColor: COLORS.Orange,
        paddingVertical: 18,
        paddingHorizontal: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
    },
    btnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: SIZES.h4,
        letterSpacing: 1,
    },
    text: {
        color: COLORS.white,
        textAlign: 'center',
        marginTop: 15,
        fontWeight: '600',
        fontSize: SIZES.h5,
    },
    bottomContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
});

export default SignUpScreen;

