import React, { useState } from 'react';
import { View, Text, ImageBackground, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../theme/theme';

const SignUpScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSignUp = () => {
        // Kiểm tra các trường bắt buộc
        if (!username || !email || !contactNumber || !password) {
            setError('Please fill in all fields');
            return;
        }

        // Lưu thông tin người dùng (giả sử lưu vào bộ nhớ tạm thời)
        global.userInfo = { username, email, contactNumber, password };
        navigation.navigate('SignInScreen'); // Điều hướng đến màn hình đăng nhập
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/image/img8.png')}
                style={{ flex: 1 }}
                resizeMode="cover"
            >
                <ScrollView>
                    <View style={styles.topContainer}>
                        <Text style={styles.title}>Get Started</Text>
                        <Text style={styles.subtitle}>Sign up to continue</Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <TextInput
                            placeholder='Username'
                            style={styles.textInput}
                            placeholderTextColor={COLORS.white}
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            placeholder='Email'
                            style={styles.textInput}
                            placeholderTextColor={COLORS.white}
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            placeholder='Contact Number'
                            style={styles.textInput}
                            placeholderTextColor={COLORS.white}
                            value={contactNumber}
                            onChangeText={setContactNumber}
                        />
                        <TextInput
                            placeholder='Password'
                            style={styles.textInput}
                            placeholderTextColor={COLORS.white}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    {error && <Text style={styles.errorText}>{error}</Text>}
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={handleSignUp}>
                            <View style={styles.button}>
                                <Text style={styles.btnText}>SIGN UP</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                            <Text style={styles.text}>Already have an account? | Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    topContainer: {
        marginTop: 100,
        alignItems: 'center',
    },
    title: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: SIZES.h1 * 1.5,
    },
    subtitle: {
        color: COLORS.white,
        fontSize: SIZES.h4,
        paddingTop: 3,
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
        marginHorizontal: 15,
        marginVertical: 5,
    },
    errorText: {
        color: 'red',
        fontSize: SIZES.h5,
        textAlign: 'center',
        marginTop: 10,
    },
    btnContainer: {
        marginTop: 50,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 20,
        marginHorizontal: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    btnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: SIZES.h4,
    },
    text: {
        color: COLORS.white,
        textAlign: 'center',
        marginTop: 10,
        fontWeight: '600',
        fontSize: SIZES.h5,
    },
    bottomContainer: {
        justifyContent: 'center',
        marginTop: 50,
    },
});

export default SignUpScreen;
