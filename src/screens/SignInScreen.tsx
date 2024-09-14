import React, { useState } from 'react';
import { View, Text, ImageBackground, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../theme/theme';

const SignInScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        // Kiểm tra thông tin đăng nhập
        const userInfo = global.userInfo;
        if (userInfo && userInfo.email === email && userInfo.password === password) {
            navigation.navigate('UserAccountScreen', { user: userInfo }); // Điều hướng đến UserAccountScreen với thông tin người dùng
        } else {
            // Xử lý lỗi đăng nhập
            alert('Invalid email or password');
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
});

export default SignInScreen;