
// src/screens/SeatBookingScreen.tsx

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
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const SeatBookingScreen = ({ navigation, route }: any) => {
  const { showtimeId, showtimePrice } = route.params;
  const [seatsData, setSeatsData] = useState<any[]>([]);
  const [seatRows, setSeatRows] = useState<any[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [scale, setScale] = useState<number>(1); // Scale state for zooming

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoading(true);
        const data = await fetchSeatsByShowtime(showtimeId);

        // Sort seats by row and number
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
    setScale(Math.max(1, Math.min(scale * event.nativeEvent.scale, 3))); // Limit zoom between 1x and 3x
  };

  const BookSeats = async () => {
    if (selectedSeats.length !== 0) {
      try {
        setLoading(true);
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          ToastAndroid.showWithGravity(
            'Vui lòng đăng nhập để tiếp tục.',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          navigation.navigate('SignInScreen');
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
        }
      } catch (error) {
        console.error('Error booking seats: ', error);
        ToastAndroid.showWithGravity(
          'Lỗi khi đặt vé. Vui lòng thử lại.',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } finally {
        setLoading(false);
      }
    } else {
      ToastAndroid.showWithGravity(
        'Vui lòng chọn ghế',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
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
        name="arrow-left" // Adjust icon name if needed
        header="Chọn ghế"
        action={() => navigation.goBack()} // Ensuring action is a function
        style={styles.appHeader}
      />
      <View style={styles.screenContainer}>
        <Text style={styles.screenText}>Screen</Text>
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
                    <TouchableOpacity
                      key={seat.id}
                      onPress={() => selectSeat(seat.id, seat.price)}
                      disabled={seat.status !== 'available'}
                      style={[
                        styles.seatIconContainer,
                        seat.status === 'booked' && styles.seatBooked,
                        selectedSeats.includes(seat.id) && styles.seatSelected,
                        seat.type === 'VIP' && styles.seatVIP,
                        seat.type === 'CineComfort' && styles.seatCineComfort,
                        seat.type === 'Couple' && styles.seatCouple,
                      ]}
                    >
                      {selectedSeats.includes(seat.id) && (
                        <View style={styles.selectionDot} />
                      )}
                      <Text style={styles.seatLabel}>{`${seat.row}${String(seat.number).padStart(2, '0')}`}</Text>
                    </TouchableOpacity>
                  ))}
                  <Text style={styles.rowLabel}>{seatRow[0]?.row}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </ScrollView>
      </PinchGestureHandler>

      {/* Legend arranged in two rows */}
      <View style={styles.seatStatusContainer}>
        <View style={styles.statusRow}>
          <View style={styles.statusItem}>
            <View style={[styles.statusIcon, { backgroundColor: COLORS.NormalSeatColor }]} />
            <Text style={styles.statusText}>Normal Chair</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusIcon, { backgroundColor: COLORS.VIPSeatColor }]} />
            <Text style={styles.statusText}>VIP Chair</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusIcon, { backgroundColor: COLORS.CineComfortColor }]} />
            <Text style={styles.statusText}>CineComfort Chair</Text>
          </View>
        </View>
        <View style={styles.statusRow}>
          <View style={styles.statusItem}>
            <View style={[styles.statusIcon, { backgroundColor: COLORS.CoupleSeatColor }]} />
            <Text style={styles.statusText}>Couple Chair</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusIcon, { backgroundColor: COLORS.Grey }]} />
            <Text style={styles.statusText}>Booked Chair</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusIcon, { backgroundColor: COLORS.Orange }]} />
            <Text style={styles.statusText}>Selected Chair</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <Text style={styles.price}>{price.toLocaleString('vi-VN')} VND</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={BookSeats}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
    paddingTop: 50
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
    marginHorizontal: SPACING.space_6, // Increased margin for spacing between seats
    paddingVertical: SPACING.space_10, // Increased padding to make seat icon larger
    paddingHorizontal: SPACING.space_16, // Increased padding for a larger appearance
    borderRadius: 6, // Slightly larger border radius for rounded corners
    backgroundColor: COLORS.NormalSeatColor,
    position: 'relative',
    alignItems: 'center',
  },
  seatLabel: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16, // Increased font size for seat label
    textAlign: 'center',
  },
  seatVIP: {
    backgroundColor: COLORS.VIPSeatColor,
  },
  seatCineComfort: {
    backgroundColor: COLORS.CineComfortColor,
  },
  seatCouple: {
    backgroundColor: COLORS.CoupleSeatColor,
  },
  seatBooked: {
    backgroundColor: COLORS.Grey,
  },
  seatSelected: {
    backgroundColor: COLORS.Orange,
  },
  selectionDot: {
    position: 'absolute',
    top: -SPACING.space_8, // Adjusted position for the larger seat
    width: SPACING.space_8, // Increased size of the selection dot
    height: SPACING.space_8, // Increased size of the selection dot
    borderRadius: SPACING.space_4,
    backgroundColor: COLORS.White,
  },
  seatStatusContainer: {
    paddingHorizontal: SPACING.space_16,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: SPACING.space_8,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    width: SPACING.space_18, // Increased size for status icons
    height: SPACING.space_18,
    borderRadius: 4,
    marginRight: SPACING.space_8,
  },
  statusText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
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
