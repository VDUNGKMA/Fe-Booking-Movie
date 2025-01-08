
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ImageBackground, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, FONTFAMILY, SIZES } from '../theme/theme';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import api, { createTicket } from '../api/api';
import { AxiosError } from 'axios';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import ReactNativeBiometrics from 'react-native-biometrics';
const SignInScreen = ({ navigation, route }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);
  const [biometricsAvailable, setBiometricsAvailable] = useState(false);
  const rnBiometrics = new ReactNativeBiometrics();
  const [showFingerprintButton, setShowFingerprintButton] = useState(false);
  // Retrieve booking details if provided
  const redirectTo = route.params?.redirectTo;
  const showtimeId = route.params?.showtimeId;
  const selectedSeats = route.params?.selectedSeats || [];
  const totalPrice = route.params?.totalPrice || 0;

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '950935021307-fcb8r2hjpmuif54reaijjao4gdapep70.apps.googleusercontent.com', // Lấy từ Firebase Console
      offlineAccess: true, // Nếu cần Refresh Token
    });
    const checkBiometricAvailability = async () => {
      const result = await rnBiometrics.isSensorAvailable();
      setBiometricsAvailable(result.available);
    };
    const fetchFingerprintPreference = async () => {
      const enabled = await AsyncStorage.getItem('fingerprintEnabled');
      setShowFingerprintButton(enabled === 'true')
    };
    checkBiometricAvailability();
    fetchFingerprintPreference()
  }, []);
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices(); // Kiểm tra Play Services
      const userInfo = await GoogleSignin.signIn(); // Mở giao diện đăng nhập

      // Kiểm tra nếu 'idToken' tồn tại trong userInfo
      if (userInfo?.data?.idToken) {
        const { idToken } = userInfo.data; // Kiểm tra và sử dụng idToken


        // Gửi thông tin đăng nhập lên backend để xác thực
        const response = await api.post('/api/auth/google-login', {
          token: idToken,
        });
        const token = response.data.token; // Lấy token từ backend
        const userId = response.data.data.user.id;
        // await EncryptedStorage.setItem('authData', JSON.stringify({ token }));
        await EncryptedStorage.setItem('authData', JSON.stringify({
          token: token,
          userId: userId,
        }));
        setIsLoggedIn(true);

        Alert.alert('Thành Công', 'Đăng nhập Google thành công!');
        navigation.navigate('TabNavigator', { screen: 'Home', params: { isLoggedIn: true } });
      } else {
        throw new Error('idToken không có trong thông tin người dùng.');
      }
    } catch (error: any) {
      // Kiểm tra lỗi và hiển thị thông báo phù hợp
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Thông Báo', 'Đăng nhập bị hủy.');
      } else {
        Alert.alert('Lỗi', 'Đăng nhập Google thất bại.');
      }
      console.error(error); // Đảm bảo có thể in lỗi ra console
    }
  };



  const handleFingerprintLogin = async () => {
    const enabled = await AsyncStorage.getItem('fingerprintEnabled');
    if (enabled !== 'true') {
      Alert.alert('Thông Báo', 'Đăng nhập bằng vân tay chưa được bật!');
      return;
    }

    const result = await rnBiometrics.simplePrompt({
      promptMessage: 'Xác Thực Bằng Vân Tay',
    });

    if (result.success) {
      try {
        const authData = await EncryptedStorage.getItem('authData');
        if (!authData) {
          throw new Error('Không tìm thấy dữ liệu người dùng');
        }

        const parsedData = JSON.parse(authData);
        const userId = parsedData.userId;
        Alert.alert('Thành Công', 'Đăng nhập bằng vân tay thành công!');
        setIsLoggedIn(true);
        navigation.navigate('TabNavigator', { screen: 'Home', params: { isLoggedIn: true } });
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể đăng nhập bằng vân tay.');
      }
    } else {
      Alert.alert('Thất Bại', 'Xác thực vân tay thất bại.');
    }
  };
  const handleSignIn = async () => {
    try {
      setLoading(true);
      const response = await api.post('/api/auth/login', { email, password });
      const userId = response.data.data.user.id;
      const token = response.data.token; // Giả sử token được trả về ở đây
      console.log('Token received:', token); // Thêm dòng này
      // await AsyncStorage.setItem('token', token); // Lưu token vào AsyncStorage
      // await AsyncStorage.setItem('userId', userId.toString());
      // Lưu token và userId an toàn bằng EncryptedStorage
      await EncryptedStorage.setItem('authData', JSON.stringify({
        token: token,
        userId: userId.toString(),
      }));
      Alert.alert('Success', 'Logged in successfully!');
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
            {showFingerprintButton && (
              <TouchableOpacity
                style={styles.fingerprintButton}
                onPress={handleFingerprintLogin}
                disabled={!biometricsAvailable}
              >
                <Text style={styles.buttonText}>
                  {biometricsAvailable ? 'Đăng Nhập Bằng Vân Tay' : 'Vân Tay Không Hỗ Trợ'}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleGoogleSignIn} style={styles.googleButton}>
              <Text style={styles.googleButtonText}>Đăng Nhập Với Google</Text>
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
    marginTop: 100,
    paddingTop: 80,
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.h1 * 1.6,
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
    marginVertical: 10, // Tăng
    fontFamily: FONTFAMILY.poppins_regular,
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
  fingerprintButton: {
    backgroundColor: COLORS.Orange,
    padding: 18,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: COLORS.White,
    fontWeight: 'bold',
    fontSize: SIZES.h4,
    fontFamily: FONTFAMILY.poppins_bold,
  },
  googleButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: SIZES.h4,
    marginLeft: 10,
  },

});

export default SignInScreen;
