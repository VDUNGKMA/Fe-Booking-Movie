// //CinemaSelectionScreen.tsx
// import React, { useState } from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   ScrollView,
//   Alert,
// } from 'react-native';

// import {
//     BORDERRADIUS,
//     COLORS,
//     FONTFAMILY,
//     FONTSIZE,
//     SPACING,
// } from '../theme/theme';

// // Dữ liệu giả cho rạp chiếu, giờ chiếu và định dạng phim
// const cinemas = [
//   {
//     name: 'CGV Aeon Hà Đông',
//     formats: [
//       { type: '2D Phụ Đề Anh', times: ['17:00', '17:30', '18:00', '19:30'] },
//       { type: '2D English Sub', times: ['16:30', '19:00', '21:30'] },
//       { type: '2D English Sub | GOLD CLASS', times: ['16:00', '18:30', '21:00'] },
//     ],
//   },
//   {
//     name: 'CGV Aeon Long Biên',
//     formats: [
//       { type: '2D Phụ Đề Anh', times: ['16:00', '16:20', '16:40', '17:00'] },
//       { type: '2D English Sub | SCREENX Cinema', times: ['18:00', '20:40'] },
//     ],
//   },
//   // Thêm các rạp khác ở đây
// ];

// // Hàm sinh ngày
// const generateDate = () => {
//   const date = new Date();
//   let weekday = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'];
//   let weekdays = [];
//   for (let i = 0; i < 7; i++) {
//     let tempDate = {
//       date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
//       day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
//     };
//     weekdays.push(tempDate);
//   }
//   return weekdays;
// };

// const dates = generateDate();

// const CinemaSelectionScreen = ({ navigation, route }: any) => {
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);
//   const [expandedCinema, setExpandedCinema] = useState<string | null>(null);

//   const toggleCinema = (name: string) => {
//     setExpandedCinema(expandedCinema === name ? null : name);
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {/* Phần chọn ngày */}
//         <FlatList
//           data={dates}
//           keyExtractor={(item, index) => index.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={[styles.dateItem, item.date.toString() === selectedDate && styles.selectedDate]}
//               onPress={() => setSelectedDate(item.date.toString())}
//             >
//               <Text style={styles.dateText}>{item.day}</Text>
//               <Text style={styles.dateText}>{item.date}</Text>
//             </TouchableOpacity>
//           )}
//         />

//         {/* Phần chọn rạp */}
//         {cinemas.map((cinema, index) => (
//           <View key={index}>
//             <TouchableOpacity
//               style={styles.cinemaItem}
//               onPress={() => toggleCinema(cinema.name)}
//             >
//               <Text style={styles.cinemaText}>{cinema.name}</Text>
//             </TouchableOpacity>

//             {expandedCinema === cinema.name && (
//               <View style={styles.formatContainer}>
//                 {cinema.formats.map((format, formatIndex) => (
//                   <View key={formatIndex} style={styles.formatItem}>
//                     <Text style={styles.formatText}>{format.type}</Text>
//                     <View style={styles.timeContainer}>
//                       {format.times.map((time, timeIndex) => (
//                         <TouchableOpacity
//                           key={timeIndex}
//                           style={[styles.timeItem, time === selectedTime ? styles.selectedTime : styles.defaultTime]}
//                           onPress={() => setSelectedTime(time)}
//                         >
//                           <Text style={styles.timeText}>{time}</Text>
//                         </TouchableOpacity>
//                       ))}
//                     </View>
//                   </View>
//                 ))}
//               </View>
//             )}
//           </View>
//         ))}
//       </ScrollView>

//       {/* Nút tiếp tục ở dưới chân trang */}
//       <TouchableOpacity
//         style={styles.continueButton}
//         onPress={() => {
//           // Kiểm tra xem người dùng đã chọn ngày và giờ hay chưa
//           if (selectedDate && selectedTime) {
//             // Điều hướng đến SeatBookingScreen với các thông tin đã chọn
//             navigation.navigate('SeatBooking', {
//               selectedDate,
//               selectedTime,
//             });
//           } else {
//             // Nếu chưa chọn, hiển thị thông báo hoặc xử lý lỗi ở đây
//             Alert.alert('Please select a date and time before continuing!');
//           }
//         }}
//       >
//         <Text style={styles.continueButtonText}>Continue</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black', // Đổi màu nền thành đen
//   },
//   scrollContainer: {
//     paddingBottom: 80, // Dưới cùng để tránh bị che khuất bởi nút
//   },
//   dateItem: {
//     padding: 10,
//     backgroundColor: '#555', // Đổi màu nền item ngày sang xám
//     borderRadius: 10,
//     marginHorizontal: 5,
//     alignItems: 'center',
//   },
//   selectedDate: {
//     backgroundColor: '#FF5524', // Màu xám nhạt cho ngày đã chọn
//   },
//   dateText: {
//     color: 'white', // Đổi màu chữ thành trắng
//   },
//   cinemaItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 15,
//     backgroundColor: 'black', // Đổi màu nền item rạp sang xám
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   cinemaText: {
//     fontSize: 16,
//     color: 'white', // Đổi màu chữ thành trắng
//   },
//   formatContainer: {
//     padding: 10,
//     backgroundColor: 'black', // Đổi màu nền cho định dạng sang xám
//   },
//   formatItem: {
//     marginBottom: 10,
//   },
//   formatText: {
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: 'white', // Đổi màu chữ thành trắng
//   },
//   timeContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   timeItem: {
//     padding: 10,
//     backgroundColor: '#FF5524', // Đổi màu nút giờ mặc định sang xám
//     borderRadius: 5,
//     margin: 5,
//   },
//   selectedTime: {
//     backgroundColor: '#FF5524', // Màu cam cho giờ đã chọn
//   },
//   defaultTime: {
//     backgroundColor: '#555', // Màu xám cho giờ không được chọn
//   },
//   timeText: {
//     color: 'white',
//   },
//   continueButton: {
//     padding: 15,
//     backgroundColor: '#FF5524', // Đổi màu nút thành xám nhạt
//     borderRadius: 5,
//     margin: 20,
//     alignItems: 'center',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   continueButtonText: {
//     color: '#ffffff', // Đổi màu chữ nút thành trắng
//     fontWeight: 'bold',
//   },


// });

// export default CinemaSelectionScreen;
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
} from 'react-native';

import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

import { fetchShowtimesByMovie } from '../api/api';

const generateDate = () => {
  const date = new Date();
  let weekday = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
      fullDate: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // YYYY-MM-DD
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};

const dates = generateDate();

const CinemaSelectionScreen = ({ navigation, route }: any) => {
  const { movieId } = route.params; // Nhận movieId từ tham số truyền vào
  const [selectedDate, setSelectedDate] = useState<string>(dates[0].fullDate);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const [expandedCinema, setExpandedCinema] = useState<number | null>(null);
  const [showtimesData, setShowtimesData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        setLoading(true);
        console.log("moiveid", movieId, selectedDate)
        const data = await fetchShowtimesByMovie(movieId, selectedDate);
        console.log("check showtime abc", data)
        setShowtimesData(data);
        setSelectedTime(null); // Reset selectedTime khi dữ liệu thay đổi
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
    // Tạo khóa duy nhất cho mỗi rạp
    if (!accumulator[cinemaId]) {
      accumulator[cinemaId] = {
        id: cinemaId,
        name: cinemaName,
        theaters: {},
      };
    }

    // Tạo khóa duy nhất cho mỗi phòng chiếu
    if (!accumulator[cinemaId].theaters[showtime.theater_id]) {
      accumulator[cinemaId].theaters[showtime.theater_id] = {
        id: showtime.theater_id,
        name: theaterName,
        showtimes: [],
      };
    }

    // Thêm suất chiếu vào phòng chiếu
    accumulator[cinemaId].theaters[showtime.theater_id].showtimes.push(showtime);

    return accumulator;
  }, {});

  // Chuyển đổi đối tượng thành mảng
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
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.dateItem,
                item.fullDate === selectedDate && styles.selectedDate,
              ]}
              onPress={() => {
                setSelectedDate(item.fullDate);
                setSelectedTime(null); // Reset selectedTime khi thay đổi ngày
              }}
            >
              <Text style={styles.dateText}>{item.day}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </TouchableOpacity>
          )}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#FF5524" />
        ) : cinemasArray.length === 0 ? (
          <Text style={styles.noShowtimesText}>
            Không có suất chiếu cho ngày đã chọn.
          </Text>
        ) : (
          cinemasArray.map((cinema : any, index) => (
            <View key={cinema.id}>
              <TouchableOpacity
                style={styles.cinemaItem}
                onPress={() => toggleCinema(cinema.id)}
              >
                <Text style={styles.cinemaText}>{cinema.name}</Text>
              </TouchableOpacity>

              {expandedCinema === cinema.id && (
                <View style={styles.formatContainer}>
                  {Object.values(cinema.theaters).map((theater: any) => (
                    <View key={theater.id} style={styles.formatItem}>
                      <Text style={styles.formatText}>
                        Phòng chiếu: {theater.name}
                      </Text>
                      <View style={styles.timeContainer}>
                        {theater.showtimes.map((showtime: any) => {
                          const time = showtime.start_time.substring(11, 16); // Lấy giờ và phút
                          const price = showtime.price; 
                          return (
                            <TouchableOpacity
                              key={showtime.id}
                              style={[
                                styles.timeItem,
                                showtime.id === selectedTime
                                  ? styles.selectedTime
                                  : styles.defaultTime,
                              ]}
                              onPress={() => {setSelectedTime(showtime.id)
                                setSelectedPrice(price); // Lưu selectedPrice
                              }
                              }
                            >
                              <Text style={styles.timeText}>{time}</Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>

      {/* Nút tiếp tục ở dưới chân trang */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          // Kiểm tra xem người dùng đã chọn giờ chiếu hay chưa
          if (selectedTime) {
            // Điều hướng đến SeatBookingScreen với các thông tin đã chọn
            navigation.navigate('SeatBooking', {
              showtimeId: selectedTime,
              movieId: movieId,
              showtimePrice: selectedPrice,
            });
          } else {
            // Nếu chưa chọn, hiển thị thông báo hoặc xử lý lỗi ở đây
            Alert.alert('Vui lòng chọn suất chiếu trước khi tiếp tục!');
          }
        }}
      >
        <Text style={styles.continueButtonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... giữ nguyên các styles hiện tại ...
  container: {
    flex: 1,
    backgroundColor: 'black', // Đổi màu nền thành đen
  },
  scrollContainer: {
    paddingBottom: 80, // Dưới cùng để tránh bị che khuất bởi nút
  },
  dateItem: {
    padding: 10,
    backgroundColor: '#555', // Đổi màu nền item ngày sang xám
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedDate: {
    backgroundColor: '#FF5524', // Màu xám nhạt cho ngày đã chọn
  },
  dateText: {
    color: 'white', // Đổi màu chữ thành trắng
  },
  cinemaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'black', // Đổi màu nền item rạp sang xám
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  cinemaText: {
    fontSize: 16,
    color: 'white', // Đổi màu chữ thành trắng
  },
  formatContainer: {
    padding: 10,
    backgroundColor: 'black', // Đổi màu nền cho định dạng sang xám
  },
  formatItem: {
    marginBottom: 10,
  },
  formatText: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white', // Đổi màu chữ thành trắng
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeItem: {
    padding: 10,
    backgroundColor: '#FF5524', // Đổi màu nút giờ mặc định sang xám
    borderRadius: 5,
    margin: 5,
  },
  selectedTime: {
    backgroundColor: '#FF5524', // Màu cam cho giờ đã chọn
  },
  defaultTime: {
    backgroundColor: '#555', // Màu xám cho giờ không được chọn
  },
  timeText: {
    color: 'white',
  },
  continueButton: {
    padding: 15,
    backgroundColor: '#FF5524', // Đổi màu nút thành xám nhạt
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  continueButtonText: {
    color: '#ffffff', // Đổi màu chữ nút thành trắng
    fontWeight: 'bold',
  },

  noShowtimesText: {
    textAlign: 'center',
    color: 'white',
    marginTop: 20,
  },
});

export default CinemaSelectionScreen;
