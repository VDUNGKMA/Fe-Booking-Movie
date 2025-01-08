import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useBooking } from '../context/BookingContext';
import { fetchBookingHistoryApi } from '../api/api';
import EncryptedStorage from 'react-native-encrypted-storage';
// Interface for Ticket
interface Ticket {
  ticketId: number;
  price: string;
  bookingDate: string;
  seats: string;
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
  const { bookingUpdated, setBookingUpdated } = useBooking();
  const isFocused = useIsFocused(); // Kiểm tra xem màn hình có được focus không

  const fetchBookingHistory = async () => {
    try {
      // Lấy toàn bộ dữ liệu từ EncryptedStorage
      const authDataString = await EncryptedStorage.getItem('authData');
      if (!authDataString) {
        setTickets([]); // Nếu không có dữ liệu, đặt danh sách vé rỗng
        return;
      }

      // Chuyển chuỗi JSON sang đối tượng
      const authData = JSON.parse(authDataString);
      const userId = authData.userId; // Lấy userId từ đối tượng

      if (!userId) {
        setTickets([]); // Nếu userId không tồn tại, đặt danh sách vé rỗng
        return;
      }

      // Gọi API lấy lịch sử đặt vé
      const response = await fetchBookingHistoryApi(userId);
      setTickets(response.data.data); // Cập nhật danh sách vé
    } catch (error) {
      console.error('Error fetching booking history:', error);
    } finally {
      setLoading(false); // Dừng trạng thái loading
    }
  };


  // Lấy dữ liệu khi màn hình lần đầu được load hoặc khi nó được focus
  useEffect(() => {

    if (isFocused || bookingUpdated) {
      fetchBookingHistory();
      setBookingUpdated(false); // Reset trạng thái sau khi tải lại dữ liệu
    }
  }, [isFocused, bookingUpdated]);


  const handleQrCodePress = (qrCode: string) => {
    setSelectedQrCode(qrCode);
    setModalVisible(true);
  };

  const formatPrice = (price: string) => {
    return parseInt(price, 10).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };

  const renderTicketItem = ({ item }: { item: Ticket }) => {
    const isExpired = moment().isAfter(moment(item.endTime));

    return (
      <View style={[styles.ticketContainer, isExpired && styles.expiredTicket]}>
        <Text style={styles.movieTitle}>{item.movie}</Text>
        <Text style={styles.cinemaText}>Rạp: {item.cinema} - Phòng: {item.theater}</Text>
        <Text style={styles.dateText}>
          Thời gian: {moment(item.startTime).format('DD/MM/YYYY HH:mm')} - {moment(item.endTime).format('HH:mm')}
        </Text>
        <Text style={styles.seatsText}>Ghế ngồi: {item.seats} </Text>
        <Text style={styles.priceText}>Giá vé: {formatPrice(item.price)}</Text>
        <Text style={styles.bookingDate}>Giờ đặt: {moment(item.bookingDate).format('DD/MM/YYYY HH:mm')}</Text>

        {isExpired && <Text style={styles.expiredText}>Vé này đã hết hạn</Text>}

        {item.qrCode ? (
          <TouchableOpacity onPress={() => item.qrCode && handleQrCodePress(item.qrCode)}>
            <Image source={{ uri: item.qrCode }} style={styles.qrCode} />
          </TouchableOpacity>
        ) : (
          <Text style={styles.noQrText}>Không có mã QR</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lịch sử đặt vé</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
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
    backgroundColor: '#000', // Black background
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 40,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff', // White text color
  },
  ticketContainer: {
    backgroundColor: '#1c1c1c', // Dark gray background for tickets
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
    borderWidth: 1,
    borderColor: '#333', // Darker border color
  },
  expiredTicket: {
    backgroundColor: '#2c2c2c', // Slightly different color for expired tickets
    borderColor: '#ff8a80',
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4fc3f7', // Light blue text color
    marginBottom: 10,
  },
  cinemaText: {
    fontSize: 16,
    color: '#a9a9a9', // Light gray
    marginBottom: 4,
  },
  dateText: {
    fontSize: 15,
    color: '#a9a9a9',
    marginBottom: 4,
  },
  seatsText: {
    fontSize: 15,
    color: '#a9a9a9',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#ff7043', // Bright color for price
    marginBottom: 4,
  },
  bookingDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  expiredText: {
    color: '#ff3d00', // Bright red for expiration warning
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  noQrText: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
  noTicketsText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#a9a9a9',
    marginTop: 20,
  },
  qrCode: {
    width: 100,
    height: 100,
    marginTop: 8,
    alignSelf: 'center',
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#1c1c1c', // Dark background for modal
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalQrCode: {
    width: 220,
    height: 220,
    marginBottom: 20,
    borderRadius: 8,
  },
  closeButton: {
    backgroundColor: '#3D5AFE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff', // White text for the button
    fontSize: 16,
  },
});

export default TicketScreen;
