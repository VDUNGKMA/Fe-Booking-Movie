  // // SeatBookingScreen.tsx
  // import React, {useState} from 'react';
  // import {
  //   Text,
  //   View,
  //   StyleSheet,
  //   ScrollView,
  //   StatusBar,
  //   ImageBackground,
  //   TouchableOpacity,
  //   FlatList,
  //   ToastAndroid,
  // } from 'react-native';
  // import {
  //   BORDERRADIUS,
  //   COLORS,
  //   FONTFAMILY,
  //   FONTSIZE,
  //   SPACING,
  // } from '../theme/theme';
  // import LinearGradient from 'react-native-linear-gradient';
  // import AppHeader from '../components/AppHeader';
  // import CustomIcon from '../components/CustomIcon';
  // import EncryptedStorage from 'react-native-encrypted-storage';

  // const timeArray: string[] = [
  //   '10:30',
  //   '12:30',
  //   '14:30',
  //   '15:00',
  //   '19:30',
  //   '21:00',
  // ];

  // const generateDate = () => {
  //   const date = new Date();
  //   let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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

  // const generateSeats = () => {
  //   let numRow = 8;
  //   let numColumn = 3;
  //   let rowArray = [];
  //   let start = 1;
  //   let reachnine = false;

  //   for (let i = 0; i < numRow; i++) {
  //     let columnArray = [];
  //     for (let j = 0; j < numColumn; j++) {
  //       let seatObject = {
  //         number: start,
  //         taken: Boolean(Math.round(Math.random())),
  //         selected: false,
  //       };
  //       columnArray.push(seatObject);
  //       start++;
  //     }
  //     if (i == 3) {
  //       numColumn += 2;
  //     }
  //     if (numColumn < 9 && !reachnine) {
  //       numColumn += 2;
  //     } else {
  //       reachnine = true;
  //       numColumn -= 2;
  //     }
  //     rowArray.push(columnArray);
  //   }
  //   return rowArray;
  // };

  // const SeatBookingScreen = ({navigation, route}: any) => {
  //   // const [dateArray, setDateArray] = useState<any[]>(generateDate());
  //   const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  //   const [price, setPrice] = useState<number>(0);
  //   const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
  //   const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  //   // const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();
  //   const { selectedDate, selectedTime } = route.params;


  //   const selectSeat = (index: number, subindex: number, num: number) => {
  //     if (!twoDSeatArray[index][subindex].taken) {
  //       let array: any = [...selectedSeatArray];
  //       let temp = [...twoDSeatArray];
  //       temp[index][subindex].selected = !temp[index][subindex].selected;
  //       if (!array.includes(num)) {
  //         array.push(num);
  //         setSelectedSeatArray(array);
  //       } else {
  //         const tempindex = array.indexOf(num);
  //         if (tempindex > -1) {
  //           array.splice(tempindex, 1);
  //           setSelectedSeatArray(array);
  //         }
  //       }
  //       setPrice(array.length * 5.0);
  //       setTwoDSeatArray(temp);
  //     }
  //   };

  //   const BookSeats = async () => {
  //     if (selectedSeatArray.length !== 0) { // Kiểm tra chỉ ghế đã chọn
  //       try {
  //         await EncryptedStorage.setItem(
  //           'ticket',
  //           JSON.stringify({
  //             seatArray: selectedSeatArray,
  //             ticketImage: route.params.PosterImage,
  //             price: price, // Thêm giá vào đây
  //             selectedDate: selectedDate,  // Thêm date
  //             selectedTime: selectedTime,    // Thêm time
  //           }),
  //         );
  //       } catch (error) {
  //         console.error(
  //           'Something went Wrong while storing in BookSeats Functions',
  //           error,
  //         );
  //       }
    
  //       navigation.navigate('PaymentConfirmationScreen', {
  //         seatArray: selectedSeatArray,
  //         ticketImage: route.params.PosterImage,
  //         amount: price, // Thêm số tiền vào đây
  //         selectedDate: selectedDate,  // Thêm date
  //         selectedTime: selectedTime,    // Thêm time
  //       });
        
  //     } else {
  //       ToastAndroid.showWithGravity(
  //         'Please Select Seats',
  //         ToastAndroid.SHORT,
  //         ToastAndroid.BOTTOM,
  //       );
  //     }
  //   };
    
  //   return (
  //     <ScrollView
  //       style={styles.container}
  //       bounces={false}
  //       showsVerticalScrollIndicator={false}>
  //       <StatusBar hidden />
  //       <View>
  //         <ImageBackground
  //           source={{uri: route.params?.BgImage}}
  //           style={styles.ImageBG}>
  //           <LinearGradient
  //             colors={[COLORS.BlackRGB10, COLORS.Black]}
  //             style={styles.linearGradient}>
  //             <View style={styles.appHeaderContainer}>
  //               <AppHeader
  //                 name="close"
  //                 header={''}
  //                 action={() => navigation.goBack()}
  //               />
  //             </View>
  //           </LinearGradient>
  //         </ImageBackground>
  //         <Text style={styles.screenText}>Screen this side</Text>
  //       </View>

  //       <View style={styles.seatContainer}>
  //         <View style={styles.containerGap20}>
  //           {twoDSeatArray?.map((item, index) => {
  //             return (
  //               <View key={index} style={styles.seatRow}>
  //                 {item?.map((subitem, subindex) => {
  //                   return (
  //                     <TouchableOpacity
  //                       key={subitem.number}
  //                       onPress={() => {
  //                         selectSeat(index, subindex, subitem.number);
  //                       }}>
  //                       <CustomIcon
  //                         name="seat"
  //                         style={[
  //                           styles.seatIcon,
  //                           subitem.taken ? {color: COLORS.Grey} : {},
  //                           subitem.selected ? {color: COLORS.Orange} : {},
  //                         ]}
  //                       />
  //                     </TouchableOpacity>
  //                   );
  //                 })}
  //               </View>
  //             );
  //           })}
  //         </View>
  //         <View style={styles.seatRadioContainer}>
  //           <View style={styles.radioContainer}>
  //             <CustomIcon name="radio" style={styles.radioIcon} />
  //             <Text style={styles.radioText}>Available</Text>
  //           </View>
  //           <View style={styles.radioContainer}>
  //             <CustomIcon
  //               name="radio"
  //               style={[styles.radioIcon, {color: COLORS.Grey}]}
  //             />
  //             <Text style={styles.radioText}>Taken</Text>
  //           </View>
  //           <View style={styles.radioContainer}>
  //             <CustomIcon
  //               name="radio"
  //               style={[styles.radioIcon, {color: COLORS.Orange}]}
  //             />
  //             <Text style={styles.radioText}>Selected</Text>
  //           </View>
  //         </View>
  //       </View>

  //       {/* <View>
  //         <FlatList
  //           data={dateArray}
  //           keyExtractor={item => item.date}
  //           horizontal
  //           bounces={false}
  //           contentContainerStyle={styles.containerGap24}
  //           renderItem={({item, index}) => {
  //             return (
  //               <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
  //                 <View
  //                   style={[
  //                     styles.dateContainer,
  //                     index == 0
  //                       ? {marginLeft: SPACING.space_24}
  //                       : index == dateArray.length - 1
  //                       ? {marginRight: SPACING.space_24}
  //                       : {},
  //                     index == selectedDateIndex
  //                       ? {backgroundColor: COLORS.Orange}
  //                       : {},
  //                   ]}>
  //                   <Text style={styles.dateText}>{item.date}</Text>
  //                   <Text style={styles.dayText}>{item.day}</Text>
  //                 </View>
  //               </TouchableOpacity>
  //             );
  //           }}
  //         />
  //       </View>

  //       <View style={styles.OutterContainer}>
  //         <FlatList
  //           data={timeArray}
  //           keyExtractor={item => item}
  //           horizontal
  //           bounces={false}
  //           contentContainerStyle={styles.containerGap24}
  //           renderItem={({item, index}) => {
  //             return (
  //               <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
  //                 <View
  //                   style={[
  //                     styles.timeContainer,
  //                     index == 0
  //                       ? {marginLeft: SPACING.space_24}
  //                       : index == dateArray.length - 1
  //                       ? {marginRight: SPACING.space_24}
  //                       : {},
  //                     index == selectedTimeIndex
  //                       ? {backgroundColor: COLORS.Orange}
  //                       : {},
  //                   ]}>
  //                   <Text style={styles.timeText}>{item}</Text>
  //                 </View>
  //               </TouchableOpacity>
  //             );
  //           }}
  //         />
  //       </View> */}

  //         {/* Hiển thị ngày và giờ đã chọn */}
  //         <View style={styles.selectedInfoContainer}>
  //         <Text style={styles.selectedInfoText}>Date: {selectedDate}</Text>
  //         <Text style={styles.selectedInfoText}>Time: {selectedTime}</Text>
  //       </View>

  //       <View style={styles.buttonPriceContainer}>
  //         <View style={styles.priceContainer}>
  //           <Text style={styles.totalPriceText}>Total Price</Text>
  //           <Text style={styles.price}>$ {price}.00</Text>
  //         </View>
  //         <TouchableOpacity onPress={BookSeats}>
  //           <Text style={styles.buttonText}>Buy Tickets</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </ScrollView>
  //   );
  // };

  // const styles = StyleSheet.create({
  //   container: {
  //     display: 'flex',
  //     flex: 1,
  //     backgroundColor: COLORS.Black,
  //   },
  //   ImageBG: {
  //     width: '100%',
  //     aspectRatio: 3072 / 1727,
  //   },
  //   linearGradient: {
  //     height: '100%',
  //   },
  //   appHeaderContainer: {
  //     marginHorizontal: SPACING.space_36,
  //     marginTop: SPACING.space_20 * 2,
  //   },
  //   screenText: {
  //     textAlign: 'center',
  //     fontFamily: FONTFAMILY.poppins_regular,
  //     fontSize: FONTSIZE.size_10,
  //     color: COLORS.WhiteRGBA15,
  //   },
  //   seatContainer: {
  //     marginVertical: SPACING.space_20,
  //   },
  //   containerGap20: {
  //     gap: SPACING.space_20,
  //   },
  //   seatRow: {
  //     flexDirection: 'row',
  //     gap: SPACING.space_20,
  //     justifyContent: 'center',
  //   },
  //   seatIcon: {
  //     fontSize: FONTSIZE.size_24,
  //     color: COLORS.White,
  //   },
  //   seatRadioContainer: {
  //     flexDirection: 'row',
  //     marginTop: SPACING.space_36,
  //     marginBottom: SPACING.space_10,
  //     alignItems: 'center',
  //     justifyContent: 'space-evenly',
  //   },
  //   radioContainer: {
  //     flexDirection: 'row',
  //     gap: SPACING.space_10,
  //     alignItems: 'center',
  //   },
  //   radioIcon: {
  //     fontSize: FONTSIZE.size_20,
  //     color: COLORS.White,
  //   },
  //   radioText: {
  //     fontFamily: FONTFAMILY.poppins_medium,
  //     fontSize: FONTSIZE.size_12,
  //     color: COLORS.White,
  //   },
  //   containerGap24: {
  //     gap: SPACING.space_24,
  //   },
  //   dateContainer: {
  //     width: SPACING.space_10 * 7,
  //     height: SPACING.space_10 * 10,
  //     borderRadius: SPACING.space_10 * 10,
  //     backgroundColor: COLORS.DarkGrey,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  //   dateText: {
  //     fontFamily: FONTFAMILY.poppins_medium,
  //     fontSize: FONTSIZE.size_24,
  //     color: COLORS.White,
  //   },
  //   dayText: {
  //     fontFamily: FONTFAMILY.poppins_regular,
  //     fontSize: FONTSIZE.size_12,
  //     color: COLORS.White,
  //   },
  //   OutterContainer: {
  //     marginVertical: SPACING.space_24,
  //   },
  //   timeContainer: {
  //     paddingVertical: SPACING.space_10,
  //     borderWidth: 1,
  //     borderColor: COLORS.WhiteRGBA50,
  //     paddingHorizontal: SPACING.space_20,
  //     borderRadius: BORDERRADIUS.radius_25,
  //     backgroundColor: COLORS.DarkGrey,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  //   timeText: {
  //     fontFamily: FONTFAMILY.poppins_regular,
  //     fontSize: FONTSIZE.size_14,
  //     color: COLORS.White,
  //   },
  //   buttonPriceContainer: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //     paddingHorizontal: SPACING.space_24,
  //     paddingBottom: SPACING.space_24,
  //   },
  //   priceContainer: {
  //     alignItems: 'center',
  //   },
  //   totalPriceText: {
  //     fontFamily: FONTFAMILY.poppins_regular,
  //     fontSize: FONTSIZE.size_14,
  //     color: COLORS.Grey,
  //   },
  //   price: {
  //     fontFamily: FONTFAMILY.poppins_medium,
  //     fontSize: FONTSIZE.size_24,
  //     color: COLORS.White,
  //   },
  //   buttonText: {
  //     borderRadius: BORDERRADIUS.radius_25,
  //     paddingHorizontal: SPACING.space_24,
  //     paddingVertical: SPACING.space_10,
  //     fontFamily: FONTFAMILY.poppins_semibold,
  //     fontSize: FONTSIZE.size_16,
  //     color: COLORS.White,
  //     backgroundColor: COLORS.Orange,
  //   },

  //   selectedInfoContainer: {
  //     position: 'absolute',
  //     top: SPACING.space_20,
  //     right: SPACING.space_20,
  //     backgroundColor: COLORS.Black,
  //     padding: SPACING.space_10,
  //     borderRadius: BORDERRADIUS.radius_10,
  //   },
  //   selectedInfoText: {
  //     fontFamily: FONTFAMILY.poppins_regular,
  //     fontSize: FONTSIZE.size_14,
  //     color: COLORS.White,
  //   },
  // });

  // export default SeatBookingScreen;
// SeatBookingScreen.tsx
// import React, { useState, useEffect } from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   ScrollView,
//   StatusBar,
//   ImageBackground,
//   TouchableOpacity,
//   ActivityIndicator,
//   ToastAndroid,
// } from 'react-native';
// import {
//   BORDERRADIUS,
//   COLORS,
//   FONTFAMILY,
//   FONTSIZE,
//   SPACING,
// } from '../theme/theme';
// import LinearGradient from 'react-native-linear-gradient';
// import AppHeader from '../components/AppHeader';
// import CustomIcon from '../components/CustomIcon';
// import EncryptedStorage from 'react-native-encrypted-storage';
// import { fetchSeatsByShowtime } from '../api/api';

// const SeatBookingScreen = ({ navigation, route }: any) => {
//   const { showtimeId } = route.params;
//   const [seatsData, setSeatsData] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
//   const [price, setPrice] = useState<number>(0);

//   useEffect(() => {
//     const fetchSeats = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchSeatsByShowtime(showtimeId);
//         setSeatsData(data);
//       } catch (error) {
//         console.error('Error fetching seats: ', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSeats();
//   }, [showtimeId]);

//   const selectSeat = (seatId: number, seatPrice: number) => {
//     if (selectedSeats.includes(seatId)) {
//       setSelectedSeats(selectedSeats.filter(id => id !== seatId));
//       setPrice(price - seatPrice);
//     } else {
//       setSelectedSeats([...selectedSeats, seatId]);
//       setPrice(price + seatPrice);
//     }
//   };

//   const BookSeats = async () => {
//     if (selectedSeats.length !== 0) {
//       // Tiến hành đặt vé và chuyển đến màn hình thanh toán
//       navigation.navigate('PaymentConfirmationScreen', {
//         seatIds: selectedSeats,
//         showtimeId: showtimeId,
//         amount: price,
//       });
//     } else {
//       ToastAndroid.showWithGravity(
//         'Vui lòng chọn ghế',
//         ToastAndroid.SHORT,
//         ToastAndroid.BOTTOM,
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#FF5524" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <StatusBar hidden />
//       <View>
//         {/* Nếu cần hiển thị hình ảnh hoặc thông tin bổ sung */}
//       </View>

//       <Text style={styles.screenText}>Màn hình ở phía này</Text>

//       {/* Hiển thị ghế */}
//       <View style={styles.seatContainer}>
//         <View style={styles.containerGap20}>
//           {seatsData.map((seatRow, index) => (
//             <View key={index} style={styles.seatRow}>
//               {seatRow.map((seat: any) => (
//                 <TouchableOpacity
//                   key={seat.id}
//                   onPress={() => selectSeat(seat.id, seat.price)}
//                   disabled={seat.status !== 'available'}
//                 >
//                   <CustomIcon
//                     name="seat"
//                     style={[
//                       styles.seatIcon,
//                       seat.status === 'booked' && { color: COLORS.Grey },
//                       selectedSeats.includes(seat.id) && { color: COLORS.Orange },
//                     ]}
//                   />
//                 </TouchableOpacity>
//               ))}
//             </View>
//           ))}
//         </View>
//         {/* Hiển thị chú thích trạng thái ghế */}
//         <View style={styles.seatRadioContainer}>
//           <View style={styles.radioContainer}>
//             <CustomIcon name="radio" style={styles.radioIcon} />
//             <Text style={styles.radioText}>Còn trống</Text>
//           </View>
//           <View style={styles.radioContainer}>
//             <CustomIcon
//               name="radio"
//               style={[styles.radioIcon, { color: COLORS.Grey }]}
//             />
//             <Text style={styles.radioText}>Đã đặt</Text>
//           </View>
//           <View style={styles.radioContainer}>
//             <CustomIcon
//               name="radio"
//               style={[styles.radioIcon, { color: COLORS.Orange }]}
//             />
//             <Text style={styles.radioText}>Đã chọn</Text>
//           </View>
//         </View>
//       </View>

//       {/* Hiển thị tổng giá và nút tiếp tục */}
//       <View style={styles.buttonPriceContainer}>
//         <View style={styles.priceContainer}>
//           <Text style={styles.totalPriceText}>Tổng giá</Text>
//           <Text style={styles.price}>{price} VND</Text>
//         </View>
//         <TouchableOpacity onPress={BookSeats}>
//           <Text style={styles.buttonText}>Mua vé</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };
// import React, { useState, useEffect } from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   ScrollView,
//   StatusBar,
//   ImageBackground,
//   TouchableOpacity,
//   ActivityIndicator,
//   ToastAndroid,
// } from 'react-native';
// import {
//   BORDERRADIUS,
//   COLORS,
//   FONTFAMILY,
//   FONTSIZE,
//   SPACING,
// } from '../theme/theme';
// import LinearGradient from 'react-native-linear-gradient';
// import AppHeader from '../components/AppHeader';
// import CustomIcon from '../components/CustomIcon';
// import EncryptedStorage from 'react-native-encrypted-storage';
// import { fetchSeatsByShowtime } from '../api/api';

// const SeatBookingScreen = ({ navigation, route }: any) => {
//   const { showtimeId } = route.params;
//   const [seatsData, setSeatsData] = useState<any[]>([]);
//   const [seatRows, setSeatRows] = useState<any[][]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
//   const [price, setPrice] = useState<number>(0);

//   useEffect(() => {
//     const fetchSeats = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchSeatsByShowtime(showtimeId);
//         console.log('Seats Data:', data); // Kiểm tra dữ liệu ghế
//         setSeatsData(data);

//         // Chuyển đổi 'seatsData' thành 'seatRows'
//         const rows: any[][] = [];
//         data.forEach((seat: any) => {
//           const rowIndex = rows.findIndex((row) => row[0]?.row === seat.row);
//           if (rowIndex > -1) {
//             rows[rowIndex].push(seat);
//           } else {
//             rows.push([seat]);
//           }
//         });
//         setSeatRows(rows);
//       } catch (error) {
//         console.error('Error fetching seats: ', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSeats();
//   }, [showtimeId]);

//   const selectSeat = (seatId: number, seatPrice: number) => {
//     if (selectedSeats.includes(seatId)) {
//       setSelectedSeats(selectedSeats.filter(id => id !== seatId));
//       setPrice(price - seatPrice);
//     } else {
//       setSelectedSeats([...selectedSeats, seatId]);
//       setPrice(price + seatPrice);
//     }
//   };

//   const BookSeats = async () => {
//     if (selectedSeats.length !== 0) {
//       // Tiến hành đặt vé và chuyển đến màn hình thanh toán
//       navigation.navigate('PaymentConfirmationScreen', {
//         seatIds: selectedSeats,
//         showtimeId: showtimeId,
//         amount: price,
//       });
//     } else {
//       ToastAndroid.showWithGravity(
//         'Vui lòng chọn ghế',
//         ToastAndroid.SHORT,
//         ToastAndroid.BOTTOM,
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#FF5524" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <StatusBar hidden />
//       <View>
//         {/* Nếu cần hiển thị hình ảnh hoặc thông tin bổ sung */}
//       </View>

//       <Text style={styles.screenText}>Màn hình ở phía này</Text>

//       {/* Hiển thị ghế */}
//       <View style={styles.seatContainer}>
//         <View style={styles.containerGap20}>
//           {seatRows.map((seatRow, index) => (
//             <View key={index} style={styles.seatRow}>
//               {seatRow.map((seat: any) => (
//                 <TouchableOpacity
//                   key={seat.id}
//                   onPress={() => selectSeat(seat.id, seat.price)}
//                   disabled={seat.status !== 'available'}
//                 >
//                   <CustomIcon
//                     name="seat"
//                     style={[
//                       styles.seatIcon,
//                       seat.status === 'booked' && { color: COLORS.Grey },
//                       selectedSeats.includes(seat.id) && { color: COLORS.Orange },
//                     ]}
//                   />
//                 </TouchableOpacity>
//               ))}
//             </View>
//           ))}
//         </View>
//         {/* Hiển thị chú thích trạng thái ghế */}
//         <View style={styles.seatRadioContainer}>
//           <View style={styles.radioContainer}>
//             <CustomIcon name="radio" style={styles.radioIcon} />
//             <Text style={styles.radioText}>Còn trống</Text>
//           </View>
//           <View style={styles.radioContainer}>
//             <CustomIcon
//               name="radio"
//               style={[styles.radioIcon, { color: COLORS.Grey }]}
//             />
//             <Text style={styles.radioText}>Đã đặt</Text>
//           </View>
//           <View style={styles.radioContainer}>
//             <CustomIcon
//               name="radio"
//               style={[styles.radioIcon, { color: COLORS.Orange }]}
//             />
//             <Text style={styles.radioText}>Đã chọn</Text>
//           </View>
//         </View>
//       </View>

//       {/* Hiển thị tổng giá và nút tiếp tục */}
//       <View style={styles.buttonPriceContainer}>
//         <View style={styles.priceContainer}>
//           <Text style={styles.totalPriceText}>Tổng giá</Text>
//           <Text style={styles.price}>{price} VND</Text>
//         </View>
//         <TouchableOpacity onPress={BookSeats}>
//           <Text style={styles.buttonText}>Mua vé</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };
 
// const styles = StyleSheet.create({
//     container: {
//       display: 'flex',
//       flex: 1,
//       backgroundColor: COLORS.Black,
//     },
//     ImageBG: {
//       width: '100%',
//       aspectRatio: 3072 / 1727,
//   },
//   loadingContainer: {
//     flex: 1,
//     alignSelf: 'center',
//     justifyContent: 'center',
//   },
//     linearGradient: {
//       height: '100%',
//     },
//     appHeaderContainer: {
//       marginHorizontal: SPACING.space_36,
//       marginTop: SPACING.space_20 * 2,
//     },
//     screenText: {
//       textAlign: 'center',
//       fontFamily: FONTFAMILY.poppins_regular,
//       fontSize: FONTSIZE.size_10,
//       color: COLORS.WhiteRGBA15,
//     },
//     seatContainer: {
//       marginVertical: SPACING.space_20,
//     },
//     containerGap20: {
//       gap: SPACING.space_20,
//     },
//     seatRow: {
//       flexDirection: 'row',
//       gap: SPACING.space_20,
//       justifyContent: 'center',
//     },
//     seatIcon: {
//       fontSize: FONTSIZE.size_24,
//       color: COLORS.White,
//     },
//     seatRadioContainer: {
//       flexDirection: 'row',
//       marginTop: SPACING.space_36,
//       marginBottom: SPACING.space_10,
//       alignItems: 'center',
//       justifyContent: 'space-evenly',
//     },
//     radioContainer: {
//       flexDirection: 'row',
//       gap: SPACING.space_10,
//       alignItems: 'center',
//     },
//     radioIcon: {
//       fontSize: FONTSIZE.size_20,
//       color: COLORS.White,
//     },
//     radioText: {
//       fontFamily: FONTFAMILY.poppins_medium,
//       fontSize: FONTSIZE.size_12,
//       color: COLORS.White,
//     },
//     containerGap24: {
//       gap: SPACING.space_24,
//     },
//     dateContainer: {
//       width: SPACING.space_10 * 7,
//       height: SPACING.space_10 * 10,
//       borderRadius: SPACING.space_10 * 10,
//       backgroundColor: COLORS.DarkGrey,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     dateText: {
//       fontFamily: FONTFAMILY.poppins_medium,
//       fontSize: FONTSIZE.size_24,
//       color: COLORS.White,
//     },
//     dayText: {
//       fontFamily: FONTFAMILY.poppins_regular,
//       fontSize: FONTSIZE.size_12,
//       color: COLORS.White,
//     },
//     OutterContainer: {
//       marginVertical: SPACING.space_24,
//     },
//     timeContainer: {
//       paddingVertical: SPACING.space_10,
//       borderWidth: 1,
//       borderColor: COLORS.WhiteRGBA50,
//       paddingHorizontal: SPACING.space_20,
//       borderRadius: BORDERRADIUS.radius_25,
//       backgroundColor: COLORS.DarkGrey,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     timeText: {
//       fontFamily: FONTFAMILY.poppins_regular,
//       fontSize: FONTSIZE.size_14,
//       color: COLORS.White,
//     },
//     buttonPriceContainer: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       paddingHorizontal: SPACING.space_24,
//       paddingBottom: SPACING.space_24,
//     },
//     priceContainer: {
//       alignItems: 'center',
//     },
//     totalPriceText: {
//       fontFamily: FONTFAMILY.poppins_regular,
//       fontSize: FONTSIZE.size_14,
//       color: COLORS.Grey,
//     },
//     price: {
//       fontFamily: FONTFAMILY.poppins_medium,
//       fontSize: FONTSIZE.size_24,
//       color: COLORS.White,
//     },
//     buttonText: {
//       borderRadius: BORDERRADIUS.radius_25,
//       paddingHorizontal: SPACING.space_24,
//       paddingVertical: SPACING.space_10,
//       fontFamily: FONTFAMILY.poppins_semibold,
//       fontSize: FONTSIZE.size_16,
//       color: COLORS.White,
//       backgroundColor: COLORS.Orange,
//     },

//     selectedInfoContainer: {
//       position: 'absolute',
//       top: SPACING.space_20,
//       right: SPACING.space_20,
//       backgroundColor: COLORS.Black,
//       padding: SPACING.space_10,
//       borderRadius: BORDERRADIUS.radius_10,
//     },
//     selectedInfoText: {
//       fontFamily: FONTFAMILY.poppins_regular,
//       fontSize: FONTSIZE.size_14,
//       color: COLORS.White,
//     },
//   });


// export default SeatBookingScreen;
// src/screens/SeatBookingScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../components/AppHeader';
import CustomIcon from '../components/CustomIcon';
import EncryptedStorage from 'react-native-encrypted-storage';
import { createTicket, fetchSeatsByShowtime } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SeatBookingScreen = ({ navigation, route }: any) => {
  const { showtimeId, showtimePrice } = route.params;
  const [seatsData, setSeatsData] = useState<any[]>([]);
  const [seatRows, setSeatRows] = useState<any[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setLoading(true);
        const data = await fetchSeatsByShowtime(showtimeId);
        // console.log('Seats Data:', data); // Kiểm tra dữ liệu ghế
        setSeatsData(data);

        // Chuyển đổi 'seatsData' thành 'seatRows'
        const rows: any[][] = [];
        data.forEach((seat: any) => {
          const rowIndex = rows.findIndex((row) => row[0]?.row === seat.row);
          if (rowIndex > -1) {
            rows[rowIndex].push(seat);
          } else {
            rows.push([seat]);
          }
        });
        setSeatRows(rows);
      } catch (error) {
        console.error('Error fetching seats: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [showtimeId]);

  const selectSeat = (seatId: number, seatPrice: number) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
      setPrice(price - seatPrice - parseFloat(showtimePrice));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
      setPrice(price + seatPrice + parseFloat(showtimePrice));
    }
  };

  // const BookSeats = async () => {
  //   if (selectedSeats.length !== 0) {
  //     // Tiến hành đặt vé và chuyển đến màn hình thanh toán
  //     navigation.navigate('PayPalPayment', {
  //       ticketId: selectedSeats, // Thay đổi từ seatIds: selectedSeats
  //       userId: 18, // Thay bằng logic thực tế để lấy userId
  //       amount: price,
  //     });
  //   } else {
  //     ToastAndroid.showWithGravity(
  //       'Vui lòng chọn ghế',
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM,
  //     );
  //   }
  // };
  const BookSeats = async () => {
    if (selectedSeats.length !== 0) {
      try {
        setLoading(true);

        // Lấy userId từ EncryptedStorage hoặc context
        // const userId = await EncryptedStorage.getItem('userId');
        const userId = await AsyncStorage.getItem('userId');;
        console.log("check userId", userId)
        if (!userId) {
          // Nếu chưa đăng nhập, điều hướng đến màn hình đăng nhập
          ToastAndroid.showWithGravity(
            'Vui lòng đăng nhập để tiếp tục.',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          navigation.navigate('SignInScreen'); // Điều hướng đến màn hình đăng nhập
          return;
        }

        const paymentMethod = 'paypal'; // Hoặc lấy từ lựa chọn của người dùng
        console.log("check show",showtimeId,selectedSeats,paymentMethod, userId)
        // Gọi API tạo vé
        const response = await createTicket(showtimeId, selectedSeats, paymentMethod, userId);
        console.log("check create ticket", response)
        if (response.status === 'success') {
          // Lấy totalPrice và ticketIds từ phản hồi API
          const { totalPrice, ticketIds } = response.data;
          
          // Chuyển đến màn hình thanh toán hoặc xác nhận
          navigation.navigate('PayPalPayment', {
            // totalPrice: response.data.totalPrice,
            userId,
            ticketIds // Nếu API trả về danh sách ticketIds
          });
        } else {
          // Hiển thị thông báo lỗi
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
        <ActivityIndicator size="large" color="#FF5524" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <View>
        {/* Nếu cần hiển thị hình ảnh hoặc thông tin bổ sung */}
      </View>

      <Text style={styles.screenText}>Màn hình ở phía này</Text>

      {/* Hiển thị ghế */}
      <View style={styles.seatContainer}>
        <View style={styles.containerGap20}>
          {seatRows.map((seatRow, index) => (
            <View key={index} style={styles.seatRow}>
              {seatRow.map((seat: any) => (
                <TouchableOpacity
                  key={seat.id}
                  onPress={() => selectSeat(seat.id, seat.price)}
                  disabled={seat.status !== 'available'}
                >
                  <CustomIcon
                    name="seat"
                    style={[
                      styles.seatIcon,
                      seat.status === 'booked' && { color: COLORS.Grey },
                      selectedSeats.includes(seat.id) && { color: COLORS.Orange },
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        {/* Hiển thị chú thích trạng thái ghế */}
        <View style={styles.seatRadioContainer}>
          <View style={styles.radioContainer}>
            <CustomIcon name="radio" style={styles.radioIcon} />
            <Text style={styles.radioText}>Còn trống</Text>
          </View>
          <View style={styles.radioContainer}>
            <CustomIcon
              name="radio"
              style={[styles.radioIcon, { color: COLORS.Grey }]}
            />
            <Text style={styles.radioText}>Đã đặt</Text>
          </View>
          <View style={styles.radioContainer}>
            <CustomIcon
              name="radio"
              style={[styles.radioIcon, { color: COLORS.Orange }]}
            />
            <Text style={styles.radioText}>Đã chọn</Text>
          </View>
        </View>
      </View>

      {/* Hiển thị tổng giá và nút tiếp tục */}
      <View style={styles.buttonPriceContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPriceText}>Tổng giá</Text>
          <Text style={styles.price}>{(price).toLocaleString('vi-VN')} VND</Text>
        </View>
        <TouchableOpacity onPress={BookSeats}>
          <Text style={styles.buttonText}>Mua vé</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  ImageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    height: '100%',
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  screenText: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA15,
  },
  seatContainer: {
    marginVertical: SPACING.space_20,
  },
  containerGap20: {
    gap: SPACING.space_20,
  },
  seatRow: {
    flexDirection: 'row',
    gap: SPACING.space_20,
    justifyContent: 'center',
  },
  seatIcon: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  seatRadioContainer: {
    flexDirection: 'row',
    marginTop: SPACING.space_36,
    marginBottom: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  radioContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  radioIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
  radioText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  dateContainer: {
    width: SPACING.space_10 * 7,
    height: SPACING.space_10 * 10,
    borderRadius: SPACING.space_10 * 10,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  dayText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  OutterContainer: {
    marginVertical: SPACING.space_24,
  },
  timeContainer: {
    paddingVertical: SPACING.space_10,
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA50,
    paddingHorizontal: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_25,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  buttonPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_24,
    paddingBottom: SPACING.space_24,
  },
  priceContainer: {
    alignItems: 'center',
  },
  totalPriceText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
  price: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    backgroundColor: COLORS.Orange,
  },

  selectedInfoContainer: {
    position: 'absolute',
    top: SPACING.space_20,
    right: SPACING.space_20,
    backgroundColor: COLORS.Black,
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
  },
  selectedInfoText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
});

export default SeatBookingScreen;
