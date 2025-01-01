
import React, { useContext, useState } from 'react';
import { View, Text, ImageBackground, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, SIZES } from '../theme/theme';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import api, { createTicket } from '../api/api';
import { AxiosError } from 'axios';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignInScreen = ({ navigation, route }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);

  // Retrieve booking details if provided
  const redirectTo = route.params?.redirectTo;
  const showtimeId = route.params?.showtimeId;
  const selectedSeats = route.params?.selectedSeats || [];
  const totalPrice = route.params?.totalPrice || 0;
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: '950935021307-1up2n3aqmnuo3biaphdl89o9bbvhp5hs.apps.googleusercontent.com', // Sử dụng Web Client ID cho backend
      // androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com', // Sử dụng Android Client ID cho Android
      offlineAccess: true, // Hỗ trợ refresh token
    });
  }, []);
  const handleGoogleSignIn = async () => {
    try {
      // Kiểm tra Google Play Services
      console.log("Before checking Google Play Services");
      await GoogleSignin.hasPlayServices();  // Kiểm tra dịch vụ Google Play
      console.log("Google Play Services is available");


      console.log("Before calling GoogleSignin.signIn()");
      const userInfo = await GoogleSignin.signIn();
      console.log("Google Sign-In successful", userInfo);

      // // Kiểm tra xem token có tồn tại không
      // const idToken = userInfo?.idToken;
      // if (!idToken) {
      //   console.error('ID Token is missing.');
      //   Alert.alert('Error', 'Unable to retrieve ID Token.');
      //   return;
      // }

      // Gửi ID token tới server để xác thực
      // const response = await api.post('/api/auth/google-login', { token: idToken });

      // Lưu token từ backend
      // const { token, data } = response.data;
      // await AsyncStorage.setItem('token', token);
      // await AsyncStorage.setItem('userId', data.user.id.toString());

      setIsLoggedIn(true);
      navigation.navigate('TabNavigator', { screen: 'Home', params: { isLoggedIn: true } });
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const code = (error as any).code;
        if (code === statusCodes.SIGN_IN_CANCELLED) {
          Alert.alert('Cancelled', 'Google Sign-In was cancelled.');
        } else if (code === statusCodes.IN_PROGRESS) {
          Alert.alert('In Progress', 'Google Sign-In is already in progress.');
        } else {
          Alert.alert('Error', 'An error occurred during Google Sign-In.');
        }
      } else {
        Alert.alert('Error', 'An unknown error occurred.');
      }
    }
  };
  const handleSignIn = async () => {
    try {
      setLoading(true);
      const response = await api.post('/api/auth/login', { email, password });
      const userId = response.data.data.user.id;
      const token = response.data.token; // Giả sử token được trả về ở đây
      console.log('Token received:', token); // Thêm dòng này
      await AsyncStorage.setItem('token', token); // Lưu token vào AsyncStorage
      await AsyncStorage.setItem('userId', userId.toString());
      setIsLoggedIn(true);
      if (redirectTo === 'bookTicket' && showtimeId && selectedSeats.length) {
        await createTicketAndNavigate(userId);
      } else {
        navigation.navigate('TabNavigator', { screen: 'Home', params: { isLoggedIn: true } });
      }
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const createTicketAndNavigate = async (userId: string) => {
    try {
      const response = await createTicket(showtimeId, selectedSeats, 'paypal', userId);
      if (response.status === 'success') {
        navigation.navigate('PayPalPayment', {
          userId,
          ticketId: response.data.ticketId,
        });
      } else {
        Alert.alert('Booking Failed', response.message || 'Could not create ticket.');
      }
    } catch (error) {
      Alert.alert('Error', 'Booking error. Try again.');
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/image/login.jpg')}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <ScrollView>
          <View style={styles.topContainer}>
            <Text style={styles.title}>Chào mừng trở lại</Text>
            <Text style={styles.subtitle}>Đăng nhập để tiếp tục</Text>
          </View>
          <View style={styles.dataContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.textInput}
              placeholderTextColor={COLORS.white}
            />
            <TextInput
              placeholder="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              style={styles.textInput}
              placeholderTextColor={COLORS.white}
              secureTextEntry
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={handleSignIn} style={styles.buttonShadow}>
              <View style={styles.button}>
                <Text style={styles.btnText}>ĐĂNG NHẬP</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGoogleSignIn} style={styles.buttonShadow}>
              <View style={styles.button}>
                <Text style={styles.btnText}>ĐĂNG NHẬP BẰNG GOOGLE</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ForgetPwdScreen')}>
              <Text style={styles.text}>Quên mật khẩu? | Nhấn vào đây</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={styles.text}>Bạn chưa có tài khoản? | Đăng ký</Text>
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
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  topContainer: {
    marginTop: 120,
    paddingTop: 80,
    alignItems: 'center',
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
    marginTop: 60,
  },
  textInput: {
    color: COLORS.white,
    fontSize: SIZES.h3,
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  btnContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  buttonShadow: {
    borderRadius: 10,
    shadowColor: COLORS.Black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 6,
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
    marginTop: 60,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontSize: SIZES.h5,
  },
});

export default SignInScreen;
