// src/screens/PayPalPaymentScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createPayment, executePayment } from '../api/api';

const PayPalPaymentScreen = ({ navigation, route }: any) => {
  // const navigation = useNavigation();
  // const route = useRoute();
  const { ticketIds, userId } = route.params as { ticketIds: number; userId: number };

  const [loading, setLoading] = useState(true);
  const [approvalUrl, setApprovalUrl] = useState<string | null>(null);

  useEffect(() => {
    // Tạo đơn hàng PayPal khi component được mount
    const initiatePayment = async () => {
      try {
        const response = await createPayment(userId, ticketIds);
        setApprovalUrl(response.data.approvalUrl);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Unable to create PayPal order.');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    initiatePayment();
  }, [ticketIds, userId, navigation]);

  const handleNavigationStateChange = async (navState: any) => {
    const { url } = navState;
    console.log('Navigated to:', url);

    if (url.startsWith('movieapp://payment/success')) {
      // Trích xuất token từ URL
      const tokenMatch = url.match(/token=([^&]+)/);
      const token = tokenMatch ? tokenMatch[1] : null;

      if (token) {
        try {
          const captureResponse = await executePayment(token);

          if (captureResponse.data.status === 'COMPLETED') {
            navigation.navigate('SuccessScreen', { qrCode: captureResponse.data.qrCode });
          } else {
            navigation.navigate('FailScreen');
          }
        } catch (error) {
          console.error(error);
          navigation.navigate('FailScreen');
        }
      } else {
        navigation.navigate('FailScreen');
      }
    } else if (url.startsWith('movieapp://payment/cancel')) {
      // Thanh toán bị hủy
      navigation.navigate('FailScreen');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5524" />
      </View>
    );
  }

  if (!approvalUrl) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5524" />
      </View>
    );
  }

  return (
    <WebView
      source={{ uri: approvalUrl }}
      onNavigationStateChange={handleNavigationStateChange}
      startInLoadingState
      renderLoading={() => (
        <ActivityIndicator size="large" color="#FF5524" style={styles.loading} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PayPalPaymentScreen;
