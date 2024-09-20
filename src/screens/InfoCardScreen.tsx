import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TextInput } from 'react-native';
import api from '../api/api';

const InfoCardScreen = ({ navigation, route }: any) => {
  const { accountNumber } = route.params;

  const [cardDetails, setCardDetails] = useState<any>({
    accountNumber: '',
    accountHolder: '',
    bankName: ''
  }); // State để lưu thông tin thẻ ngân hàng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCardDetails = async () => {
    try {
      const response = await api.get(`/api/user/me/${accountNumber}`); // Thay đổi URL theo API của bạn
      setCardDetails(response.data);
    } catch (error) {
      console.error('Error fetching card details:', error);
      setError('Failed to load card details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardDetails();
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

      {/* Thông tin thẻ ngân hàng với TextInput */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Card Number:</Text>
        <TextInput
          style={styles.input}
          value={cardDetails.accountNumber}
          onChangeText={(text) => setCardDetails({ ...cardDetails, accountNumber: text })}
        />

        <Text style={styles.label}>Card Holder:</Text>
        <TextInput
          style={styles.input}
          value={cardDetails.accountHolder}
          onChangeText={(text) => setCardDetails({ ...cardDetails, accountHolder: text })}
        />

        <Text style={styles.label}>Bank Name:</Text>
        <TextInput
          style={styles.input}
          value={cardDetails.bankName}
          onChangeText={(text) => setCardDetails({ ...cardDetails, bankName: text })}
        />
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
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default InfoCardScreen;
