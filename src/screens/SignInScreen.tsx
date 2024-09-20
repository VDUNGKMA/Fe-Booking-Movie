import React, { useState } from 'react';
import { View, Text, ImageBackground, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../theme/theme';
import api from '../api/api'; // Import API
import { AxiosError } from 'axios';
import axios from 'axios';

const SignInScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Biến để lưu thông báo lỗi

    const handleSignIn = async () => {
        try {
            const response = await api.post('/api/auth/login', { email, password }); // Gọi API đăng nhập
            const userId = response.data.data.user.id;
            
            //console.log("cmt",userId.user);
            
            // Nếu đăng nhập thành công, điều hướng tới UserAccountScreen
            navigation.navigate('UserAccountScreen', { userId: userId });
        } catch (error: any) {
            console.error(error);
            // Hiển thị thông báo lỗi nếu đăng nhập thất bại
            setError('Invalid email or password');
        }
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
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>Sign in to continue</Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <TextInput
                            placeholder='Email'
                            value={email}
                            onChangeText={setEmail}
                            style={styles.textInput}
                            placeholderTextColor={COLORS.white}
                        />
                        <TextInput
                            placeholder='Password'
                            value={password}
                            onChangeText={setPassword}
                            style={styles.textInput}
                            placeholderTextColor={COLORS.white}
                            secureTextEntry
                        />
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={handleSignIn}>
                            <View style={styles.button}>
                                <Text style={styles.btnText}>SIGN IN</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ForgetPwdScreen')}>
                            <Text style={styles.text}>Forgot your password? | Click here</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                            <Text style={styles.text}>Don't have an account? | Sign Up</Text>
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontSize: SIZES.h5,
  },
});

export default SignInScreen;
