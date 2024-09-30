// src/screens/SuccessScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const SuccessScreen = ({ navigation, route }: any) => {
  // const navigation = useNavigation();
  // const route = useRoute();
  const { qrCode } = route.params as { qrCode: string };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh Toán Thành Công!</Text>
      <Image
        source={{ uri: qrCode }}
        style={styles.qrCode}
      />
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
    backgroundColor: '#E6FFE6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#008000',
  },
  qrCode: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
});

export default SuccessScreen;
