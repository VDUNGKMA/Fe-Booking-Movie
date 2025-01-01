
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createTicket, fetchSeatsByShowtime } from '../api/api';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AxiosError } from 'axios';

const { width } = Dimensions.get('window');

const SeatBookingScreen = ({ navigation, route }: any) => {
  const { showtimeId, showtimePrice } = route.params;
  const [seatsData, setSeatsData] = useState<any[]>([]);
  const [seatRows, setSeatRows] = useState<any[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);

  // useEffect(() => {
  const fetchSeats = async () => {
    try {
      setLoading(true);
      const data = await fetchSeatsByShowtime(showtimeId);

      const sortedData = data.sort((a: any, b: any) => {
        if (a.row < b.row) return -1;
        if (a.row > b.row) return 1;
        return a.number - b.number;
      });

      const rows: any[][] = [];
      sortedData.forEach((seat: any) => {
        const rowIndex = rows.findIndex((row) => row[0]?.row === seat.row);
        if (rowIndex > -1) {
          rows[rowIndex].push(seat);
        } else {
          rows.push([seat]);
        }
      });

      setSeatsData(data);
      setSeatRows(rows);
    } catch (error) {
      console.error('Error fetching seats:', error);
    } finally {
      setLoading(false);
    }
  };

  //   fetchSeats();
  // }, [showtimeId]);
  useEffect(() => {
    fetchSeats();
  }, [showtimeId]);
  const selectSeat = (seatId: number, seatPrice: number) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
      setPrice(price - seatPrice - parseFloat(showtimePrice));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
      setPrice(price + seatPrice + parseFloat(showtimePrice));
    }
  };

  const onZoomEvent = (event: any) => {
    setScale(Math.max(1, Math.min(scale * event.nativeEvent.scale, 3)));
  };


  const BookSeats = async () => {
    if (selectedSeats.length === 0) {
      ToastAndroid.showWithGravity(
        'Vui lòng chọn ghế',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return;
    }

    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        ToastAndroid.showWithGravity(
          'Vui lòng đăng nhập để tiếp tục.',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        navigation.navigate('SignInScreen', {
          redirectTo: 'bookTicket',
          showtimeId,
          selectedSeats,
          totalPrice: price,
        });
        return;
      }

      const response = await createTicket(
        showtimeId,
        selectedSeats,
        'paypal',
        userId,
      );

      if (response.status === 'success') {
        navigation.navigate('PayPalPayment', {
          userId,
          ticketId: response.data.ticketId,
        });
      } else {
        ToastAndroid.showWithGravity(
          response.message || 'Đặt vé thất bại.',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        fetchSeats();
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // Lỗi từ server (AxiosError)
        const serverMessage = error.response?.data?.message || 'Đặt vé thất bại. Vui lòng thử lại.';
        ToastAndroid.showWithGravity(
          serverMessage,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        fetchSeats();
      } else if (error instanceof Error) {
        // Lỗi thông thường (Error)
        if (error.message.includes('Network')) {
          ToastAndroid.showWithGravity(
            'Lỗi kết nối mạng. Vui lòng kiểm tra internet.',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          fetchSeats();
        } else {
          ToastAndroid.showWithGravity(
            error.message || 'Lỗi khi đặt vé. Vui lòng thử lại.',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          fetchSeats();
        }
      } else {
        // Lỗi không xác định
        ToastAndroid.showWithGravity(
          'Đã xảy ra lỗi không xác định. Vui lòng thử lại.',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        fetchSeats();
      }
    } finally {
      setLoading(false);
    }


  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.Orange} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <AppHeader
        name="arrow-left"
        header="Chọn ghế"
        action={() => navigation.goBack()}
        style={styles.appHeader}
      />
      <View style={styles.screenContainer}>
        <Text style={styles.screenText}>Màn hình chiếu</Text>
        <View style={styles.screenLine} />
      </View>

      <PinchGestureHandler onGestureEvent={onZoomEvent}>
        <ScrollView
          horizontal
          contentContainerStyle={[styles.seatContainer, { transform: [{ scale }] }]}
          showsHorizontalScrollIndicator={false}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {seatRows.map((seatRow, index) => (
                <View key={index} style={styles.seatRow}>
                  <Text style={styles.rowLabel}>{seatRow[0]?.row}</Text>
                  {seatRow.map((seat: any) => (
                    <SeatIcon
                      key={seat.id}
                      seat={seat}
                      onSelect={selectSeat}
                      isSelected={selectedSeats.includes(seat.id)}
                    />
                  ))}
                  <Text style={styles.rowLabel}>{seatRow[0]?.row}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </ScrollView>
      </PinchGestureHandler>

      <SeatLegend />

      <View style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <Text style={styles.price}>{price.toLocaleString('vi-VN')} VND</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={BookSeats}>
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SeatIcon = ({ seat, onSelect, isSelected }: any) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(seat.id, seat.price)}
      disabled={seat.status !== 'available'}
      style={[
        styles.seatIconContainer,
        seat.status === 'booked' && styles.bookedSeat,
        isSelected && styles.selectedSeat,
        seat.type === 'VIP' && styles.vipSeat,
        seat.type === 'Couple' && styles.coupleSeat,
      ]}
    >
      {seat.type === 'VIP' && <Icon name="star" size={18} color="white" />}
      {seat.type === 'Couple' && <Icon name="favorite" size={18} color="white" />}
      {seat.type === 'Normal' && <Icon name="event-seat" size={18} color="white" />}
      {seat.status === 'booked' && (
        <Icon name="close" size={24} color="red" style={styles.crossIcon} />
      )}
      {isSelected && (
        <Icon name="check-circle" size={12} color="green" style={styles.selectionIndicator} />
      )}
      <Text style={styles.seatLabel}>{`${seat.row}${String(seat.number).padStart(2, '0')}`}</Text>
    </TouchableOpacity>
  );
};

// Updated SeatLegend component with 2-column layout and X mark for booked seats
const SeatLegend = () => (
  <View style={styles.legendContainer}>
    <View style={styles.legendColumn}>
      <View style={styles.legendItem}>
        <Icon name="event-seat" size={14} color={COLORS.NormalSeatColor} />
        <Text style={styles.legendText}>Ghế thường</Text>
      </View>
      <View style={styles.legendItem}>
        <Icon name="star" size={14} color={COLORS.VIPSeatColor} />
        <Text style={styles.legendText}>Ghế VIP</Text>
      </View>
      <View style={styles.legendItem}>
        <Icon name="favorite" size={14} color={COLORS.CoupleSeatColor} />
        <Text style={styles.legendText}>Ghế cặp đôi</Text>
      </View>
    </View>
    <View style={styles.legendColumn}>
      <View style={styles.legendItem}>
        <Icon name="close" size={14} color={COLORS.Grey} />
        <Text style={styles.legendText}>Ghế đã được đặt (X)</Text>
      </View>
      <View style={styles.legendItem}>
        <Icon name="check-circle" size={14} color="green" />
        <Text style={styles.legendText}>Ghế đang chọn</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
    paddingTop: 50,
  },
  appHeader: {
    marginTop: 90,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenContainer: {
    alignItems: 'center',
    marginVertical: SPACING.space_16,
  },
  screenText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
  screenLine: {
    width: width * 0.8,
    height: 4,
    backgroundColor: COLORS.Grey,
    borderRadius: 2,
    marginTop: SPACING.space_8,
  },
  seatContainer: {
    paddingHorizontal: SPACING.space_16,
    paddingBottom: SPACING.space_16,
  },
  seatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.space_10,
  },
  rowLabel: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    width: SPACING.space_20,
    textAlign: 'center',
  },
  seatIconContainer: {
    margin: SPACING.space_6,
    padding: SPACING.space_10,
    borderRadius: 6,
    alignItems: 'center',
  },
  vipSeat: { backgroundColor: COLORS.VIPSeatColor },
  coupleSeat: { backgroundColor: COLORS.CoupleSeatColor },
  bookedSeat: { backgroundColor: COLORS.Grey },
  selectedSeat: { backgroundColor: COLORS.Orange },
  seatLabel: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_14,
  },
  selectionIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  crossIcon: {
    position: 'absolute',
    top: '25%',
    left: '25%',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.space_16,
    paddingHorizontal: SPACING.space_16,
  },
  legendColumn: {
    flex: 1,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.space_8,
  },
  legendText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_12,
    marginLeft: SPACING.space_4,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.space_16,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLORS.DarkGrey,
  },
  priceContainer: {
    flexDirection: 'column',
  },
  totalPriceText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
  price: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  button: {
    backgroundColor: COLORS.Orange,
    paddingVertical: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
    borderRadius: BORDERRADIUS.radius_25,
  },
  buttonText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
});

export default SeatBookingScreen;
