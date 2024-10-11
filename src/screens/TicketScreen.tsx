import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Ticket {
  ticketId: number;
  price: string;
  bookingDate: string;
  seats: string,
  qrCode: string | null;
  movie: string;
  cinema: string;
  theater: string;
  startTime: string;
  endTime: string;
}

const TicketScreen = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQrCode, setSelectedQrCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {

        const userId = await AsyncStorage.getItem('userId');
        const response = await axios.get(`http://192.168.1.14:5000/api/customer/users/${userId}/booking-history`);
        setTickets(response.data.data);
      } catch (error) {
        console.error('Error fetching booking history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, []);

  const handleQrCodePress = (qrCode: string) => {
    setSelectedQrCode(qrCode);
    setModalVisible(true);
  };

  const renderTicketItem = ({ item }: { item: Ticket }) => (
    <View style={styles.ticketContainer}>
      <Text style={styles.movieTitle}>{item.movie}</Text>
      <Text style={styles.cinemaText}>Rạp: {item.cinema} - Phòng: {item.theater}</Text>
      <Text style={styles.dateText}>
        Thời gian: {moment(item.startTime).format('DD/MM/YYYY HH:mm')} - {moment(item.endTime).format('HH:mm')}
      </Text>
      <Text style={styles.seatsText}>Ghế ngồi: {item.seats} </Text>

      <Text style={styles.priceText}>Giá vé: {item.price}VND</Text>
      <Text style={styles.bookingDate}>Giờ đặt: {moment(item.bookingDate).format('DD/MM/YYYY HH:mm')}</Text>


      {item.qrCode ? (
        <TouchableOpacity onPress={() => item.qrCode && handleQrCodePress(item.qrCode)}>
          <Image source={{ uri: item.qrCode }} style={styles.qrCode} />
        </TouchableOpacity>

      ) : (
        <Text style={styles.noQrText}>Không có mã QR</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lịch sử đặt vé</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : tickets.length > 0 ? (
        <FlatList
          data={tickets}
          renderItem={renderTicketItem}
          keyExtractor={(item) => item.ticketId.toString()}
        />
      ) : (
        <Text style={styles.noTicketsText}>Không có lịch sử vé.</Text>
      )}

      {/* QR Code Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedQrCode && (
              <Image source={{ uri: selectedQrCode }} style={styles.modalQrCode} />
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  ticketContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cinemaText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 4,
  },
  seatsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  bookingDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  noQrText: {
    color: '#888',
    fontStyle: 'italic',
  },
  noTicketsText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  qrCode: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalQrCode: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TicketScreen;
