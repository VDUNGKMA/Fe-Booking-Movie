// src/screens/FailScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FailScreen = ({ navigation, route }: any) => {
  // const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh Toán Thất Bại!</Text>
      <Text style={styles.message}>Vui lòng thử lại hoặc liên hệ hỗ trợ.</Text>
      <Button
        title="Quay Lại Trang Chủ"
        onPress={() => navigation.navigate('Tab')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFE6E6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF0000',
  },
  message: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default FailScreen;
