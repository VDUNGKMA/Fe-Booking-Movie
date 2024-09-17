import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import api from '../api/api';

const InfoCardScreen = ({ navigation, route }: any) => {
  const { accountNumber } = route.params; // Chỉ sử dụng accountNumber để gọi API

  const [cardDetails, setCardDetails] = useState<any>(null); // State để lưu thông tin thẻ ngân hàng
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái loading
  const [error, setError] = useState<string | null>(null); // State để lưu lỗi nếu có

  // Hàm gọi API để lấy thông tin thẻ ngân hàng
  const fetchCardDetails = async () => {
    try {
      const response = await axios.get(`/api/user/me/${accountNumber}`); // Thay đổi URL theo API của bạn
      setCardDetails(response.data);
    } catch (error) {
      console.error('Error fetching card details:', error);
      setError('Failed to load card details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardDetails(); // Gọi API khi component được render
  }, [accountNumber]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

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
        <Text style={styles.info}>{cardDetails?.accountNumber || 'N/A'}</Text>
        
        <Text style={styles.label}>Card Holder:</Text>
        <Text style={styles.info}>{cardDetails?.accountHolder || 'N/A'}</Text>
        
        <Text style={styles.label}>Bank Name:</Text>
        <Text style={styles.info}>{cardDetails?.bankName || 'N/A'}</Text>
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
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default InfoCardScreen;
