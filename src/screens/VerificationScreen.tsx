import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../theme/theme'; // Điều chỉnh nếu cần dựa theo thiết lập theme của bạn
import { Alert } from 'react-native';

const VerificationScreen = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState(['', '', '', '', '', '']); // Thay đổi kích thước thành 6

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleContinue = () => {
    // Ví dụ logic: chỉ chuyển tiếp nếu tất cả các ô mã được điền đầy đủ
    if (code.every((digit) => digit !== '')) {
      navigation.navigate('ResetPwdScreen');
    } else {
      Alert.alert('Please enter the full verification code');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/image/img12.png')} // Đảm bảo rằng đường dẫn hình ảnh là chính xác
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Enter verification code</Text>
      <Text style={styles.subtitle}>
        We have sent the code to your email. Please check your mailbox
      </Text>
    
      <View style={styles.inputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.inputBox}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleCodeChange(value, index)}
          />
        ))}
      </View>
      <TouchableOpacity>
        <Text style={styles.resendText}>Code not received? Resend code</Text>
      </TouchableOpacity>
      {/* Nút "Continue" để điều hướng */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 40,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.Black,
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
    color: COLORS.Black,
    marginHorizontal: 5,
  },
  resendText: {
    fontSize: SIZES.h5,
    color: COLORS.grey,
    marginVertical: 20,
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
});

export default VerificationScreen;
