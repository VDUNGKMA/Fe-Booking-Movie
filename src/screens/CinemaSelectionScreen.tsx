// CinemaSelectionScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

import { fetchShowtimesByMovie } from '../api/api';
import CustomIcon from '../components/CustomIcon';
import Collapsible from 'react-native-collapsible';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');


const generateDate = () => {
  const date = new Date();
  let weekday = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = new Date(date.getTime() + i * 24 * 60 * 60 * 1000);

    // Tạo ngày theo UTC để tránh lệch múi giờ
    const day = tempDate.getUTCDate();
    const fullDate = tempDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const dayName = weekday[tempDate.getUTCDay()]; // Lấy tên ngày theo UTC

    weekdays.push({
      date: day,
      day: dayName,
      fullDate: fullDate,
    });
  }
  return weekdays;
};

const dates = generateDate();

const CinemaSelectionScreen = ({ navigation, route }: any) => {
  const { movieId } = route.params;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const [expandedCinema, setExpandedCinema] = useState<number | null>(null);
  const [showtimesData, setShowtimesData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        setLoading(true);
        if (selectedDate) {
          console.log("chek selected date", selectedDate)
          const data = await fetchShowtimesByMovie(movieId, selectedDate);
          setShowtimesData(data);
        } else {
          // Nếu không có ngày nào được chọn, xóa dữ liệu suất chiếu
          setShowtimesData([]);
        }
        setSelectedTime(null); // Reset selectedTime khi thay đổi ngày
      } catch (error) {
        console.error('Error fetching showtimes: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimes();
  }, [movieId, selectedDate]);

  const toggleCinema = (cinemaId: number) => {
    setExpandedCinema(expandedCinema === cinemaId ? null : cinemaId);
  };

  const cinemas = showtimesData.reduce((accumulator, showtime) => {
    const cinemaId = showtime.theater.cinema.id;
    const cinemaName = showtime.theater.cinema.name;
    const theaterName = showtime.theater.name;

    if (!accumulator[cinemaId]) {
      accumulator[cinemaId] = {
        id: cinemaId,
        name: cinemaName,
        theaters: {},
      };
    }

    if (!accumulator[cinemaId].theaters[showtime.theater_id]) {
      accumulator[cinemaId].theaters[showtime.theater_id] = {
        id: showtime.theater_id,
        name: theaterName,
        showtimes: [],
      };
    }

    accumulator[cinemaId].theaters[showtime.theater_id].showtimes.push(showtime);

    return accumulator;
  }, {});

  const cinemasArray = Object.values(cinemas);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Phần chọn ngày */}
        <FlatList
          data={dates}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateList}
          extraData={selectedDate}
          renderItem={({ item }) => {
            const isSelected = item.fullDate === selectedDate;
            return (
              <TouchableOpacity
                style={[
                  styles.dateItem,
                  isSelected && styles.selectedDate,
                ]}
                onPress={() => {
                  if (isSelected) {
                    // Bỏ chọn ngày nếu người dùng nhấp lại
                    setSelectedDate(null);
                    setSelectedTime(null);
                  } else {
                    // Chọn ngày mới
                    setSelectedDate(item.fullDate);
                    setSelectedTime(null);
                  }
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dateText,
                    isSelected && styles.selectedDateText,
                  ]}
                >
                  {item.day}
                </Text>
                <Text
                  style={[
                    styles.dateText,
                    isSelected && styles.selectedDateText,
                  ]}
                >
                  {item.date}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.Orange} />
        ) : !selectedDate ? (
          <Text style={styles.noShowtimesText}>
            Vui lòng chọn ngày để xem suất chiếu.
          </Text>
        ) : cinemasArray.length === 0 ? (
          <Text style={styles.noShowtimesText}>
            Không có suất chiếu cho ngày đã chọn.
          </Text>
        ) : (
          cinemasArray.map((cinema: any) => (
            <View key={cinema.id}>
              <TouchableOpacity
                style={styles.cinemaItem}
                onPress={() => toggleCinema(cinema.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.cinemaText}>{cinema.name}</Text>
                <MaterialIcons
                  name={
                    expandedCinema === cinema.id
                      ? 'keyboard-arrow-up'
                      : 'keyboard-arrow-down'
                  }
                  style={styles.cinemaIcon}
                />
              </TouchableOpacity>

              <Collapsible collapsed={expandedCinema !== cinema.id}>
                <View style={styles.formatContainer}>
                  {Object.values(cinema.theaters).map((theater: any) => (
                    <View key={theater.id} style={styles.formatItem}>
                      <Text style={styles.formatText}>
                        Phòng chiếu: {theater.name}
                      </Text>
                      <View style={styles.timeContainer}>
                        {theater.showtimes.map((showtime: any) => {
                          const time = showtime.start_time.substring(11, 16);
                          const price = showtime.price;
                          const isTimeSelected = showtime.id === selectedTime;
                          { console.log(isTimeSelected) }
                          return (
                           
                            <TouchableOpacity
                              key={showtime.id}
                              style={[
                                styles.timeItem,
                                isTimeSelected
                                  ? styles.selectedTime
                                  : styles.defaultTime,
                              ]}
                              onPress={() => {
                                if (isTimeSelected) {
                                  // Bỏ chọn suất chiếu nếu người dùng nhấp lại
                                  setSelectedTime(null);
                                  setSelectedPrice(null);
                                  
                                } else {
                                  // Chọn suất chiếu mới
                                  setSelectedTime(showtime.id);
                                  setSelectedPrice(price);
                                }
                              }}
                              activeOpacity={0.7}
                            >
                              <Text
                                style={[
                                  styles.timeText,
                                  isTimeSelected && styles.selectedTimeText,
                                ]}
                              >
                                {time}
                              </Text>
                              {/* Bạn có thể hiển thị giá vé nếu muốn */}
                              {/* <Text style={styles.priceText}>{price} VND</Text> */}
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  ))}
                </View>
              </Collapsible>
            </View>
          ))
        )}
      </ScrollView>

      {/* Nút tiếp tục ở dưới chân trang */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          if (!selectedDate) {
            Alert.alert('Vui lòng chọn ngày và suất chiếu trước khi tiếp tục!');
          } else if (!selectedTime) {
            Alert.alert('Vui lòng chọn suất chiếu trước khi tiếp tục!');
          } else {
            navigation.navigate('SeatBooking', {
              showtimeId: selectedTime,
              movieId: movieId,
              showtimePrice: selectedPrice,
            });
          }
        }}
        activeOpacity={0.9}
      >
        <Text style={styles.continueButtonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
    paddingTop: 30
  },
  scrollContainer: {
    paddingBottom: SPACING.space_80,
    
  },
  dateList: {
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_10,
  },
  dateItem: {
    padding: SPACING.space_10,
    backgroundColor: COLORS.Black,
    borderRadius: BORDERRADIUS.radius_8,
    marginHorizontal: SPACING.space_8,
    alignItems: 'center',
  },
  selectedDate: {
    backgroundColor: COLORS.Orange,
  },
  dateText: {
    color: COLORS.WhiteRGBA75,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
  selectedDateText: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
  },
  cinemaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.space_15,
    backgroundColor: COLORS.DarkGrey,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.Gray,
  },
  cinemaText: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  cinemaIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
  formatContainer: {
    padding: SPACING.space_10,
    backgroundColor: COLORS.Black,
  },
  formatItem: {
    marginBottom: SPACING.space_10,
  },
  formatText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    marginBottom: SPACING.space_5,
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeItem: {
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_8,
    margin: SPACING.space_4,
    alignItems: 'center',
  },
  selectedTime: {
    backgroundColor: COLORS.Orange,
  },
  defaultTime: {
    backgroundColor: COLORS.Grey, // Thử màu xanh để kiểm tra
  },

  timeText: {
    color: COLORS.WhiteRGBA75,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
  selectedTimeText: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
  },
  priceText: {
    color: COLORS.WhiteRGBA75,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
  },
  continueButton: {
    paddingVertical: SPACING.space_15,
    backgroundColor: COLORS.Orange,
    borderRadius: BORDERRADIUS.radius_8,
    marginHorizontal: SPACING.space_20,
    alignItems: 'center',
    position: 'absolute',
    bottom: SPACING.space_20,
    left: 0,
    right: 0,
  },
  continueButtonText: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
  },
  noShowtimesText: {
    textAlign: 'center',
    color: COLORS.White,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
  },
});

export default CinemaSelectionScreen;
