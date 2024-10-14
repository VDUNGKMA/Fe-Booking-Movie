import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { COLORS, SIZES } from '../theme/theme';
import api from '../api/api';

const VerificationScreen = ({ route, navigation }: any) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(120);
  const { email } = route.params;
  const inputsRef = useRef<Array<TextInput | null>>([]); // References for each TextInput

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleCodeChange = (value: string, index: number) => {
    // Check if a paste event has occurred
    if (value.length > 1) {
      const newCode = value.slice(0, 6).split('');
      setCode(newCode);
      newCode.forEach((val, idx) => {
        if (inputsRef.current[idx]) inputsRef.current[idx]?.setNativeProps({ text: val });
      });
      if (newCode.every((digit) => digit !== '')) {
        handleContinue(); // Automatically submit if the OTP is complete
      }
      return;
    }

    // Update code array and move focus to next input
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value !== '' && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleContinue = async () => {
    if (code.every((digit) => digit !== '')) {
      const verificationCode = code.join('');
      try {
        const response = await api.post('/api/auth/verifyOTP', { otp: verificationCode, email });
        if (response.status === 200) {
          navigation.navigate('ResetPwdScreen', { email });
        } else {
          setError('Mã xác thực không hợp lệ. Vui lòng thử lại.');
        }
      } catch (error) {
        setError('Không thể xác minh mã. Vui lòng thử lại sau.');
      }
    } else {
      Alert.alert('Vui lòng nhập đầy đủ mã xác thực.');
    }
  };

  const handleResendCode = async () => {
    setCountdown(120);
    setError('');
    setCode(['', '', '', '', '', '']);
    try {
      const response = await api.post('/api/auth/forgotPassword', { email });
      if (response.status === 200) {
        Alert.alert('OTP mới đã được gửi tới email của bạn.');
      } else {
        setError('Không thể gửi lại mã. Vui lòng thử lại.');
      }
    } catch (error) {
      setError('Không thể gửi lại mã. Vui lòng thử lại sau.');
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/image/img12.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Nhập mã xác thực</Text>
      <Text style={styles.subtitle}>
        Chúng tôi đã gửi mã tới email của bạn. Vui lòng kiểm tra hộp thư đến.
      </Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.inputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.inputBox}
            ref={(ref) => (inputsRef.current[index] = ref)}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleCodeChange(value, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && index > 0 && !digit) {
                inputsRef.current[index - 1]?.focus();
              }
            }}
          />
        ))}
      </View>

      <Text style={styles.countdownText}>Mã hết hạn trong: {formatTime(countdown)}</Text>

      <TouchableOpacity onPress={handleResendCode} disabled={countdown > 0}>
        <Text style={[styles.resendText, countdown > 0 && styles.disabledText]}>
          Không nhận được mã? Gửi lại mã
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.Black,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 40,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: SIZES.h4,
    color: COLORS.grey,
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    color: COLORS.white,
    marginHorizontal: 5,
  },
  countdownText: {
    fontSize: SIZES.h5,
    color: COLORS.Red,
    marginTop: 10,
  },
  resendText: {
    fontSize: SIZES.h5,
    color: COLORS.primary,
    marginVertical: 20,
  },
  disabledText: {
    color: COLORS.grey,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.h4,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default VerificationScreen;
