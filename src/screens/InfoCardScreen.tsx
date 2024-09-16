import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const InfoCardScreen = ({ navigation, route }: any) => {
  // Nhận dữ liệu từ route.params
  const { accountNumber, accountHolder, bankName } = route.params;

  return (
    <View style={styles.container}>
      {/* Thẻ ngân hàng */}
      <View style={styles.card}>
        <Image
          source={require('../assets/image/img13.png')} // Thay thế bằng hình ảnh thẻ ngân hàng thực tế
          style={styles.cardImage}
        />
      </View>

      {/* Thông tin thẻ ngân hàng */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Card Number:</Text>
        <Text style={styles.info}>{accountNumber}</Text>
        
        <Text style={styles.label}>Card Holder:</Text>
        <Text style={styles.info}>{accountHolder}</Text>
        
        <Text style={styles.label}>Bank Name:</Text>
        <Text style={styles.info}>{bankName}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 150, // Thay đổi kích thước theo nhu cầu
    resizeMode: 'contain',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
});

export default InfoCardScreen;
