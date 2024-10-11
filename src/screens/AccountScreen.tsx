// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';

// type RootParamList = {
//   AccountScreen: undefined;
//   SignUpScreen: undefined;
//   SignInScreen: undefined;
//   Auth: { screen: string };
// };

// const AccountScreen = () => {
//   const navigation = useNavigation<StackNavigationProp<RootParamList>>();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerTitle}>Tài khoản</Text>
//       <TouchableOpacity style={styles.settingsIcon}>
//         <Text>⚙️</Text>
//       </TouchableOpacity>
      
//       <View style={styles.promotionContainer}>
//         <Image 
//           source={require('../assets/image/img6.png')} 
//           style={styles.image}
//         />
//         <Text style={styles.promotionText}>
//             Đăng ký thành viên Cinames{'\n'}Nhận ngay ưu đãi!
//         </Text>

//         <View style={styles.featuresContainer}>
//           <View style={styles.feature}>
//             <Image 
//               source={require('../assets/image/img7.png')} 
//               style={styles.icon}
//             />
//             <Text>Tích Điểm</Text>
//           </View>
//           <View style={styles.feature}>
//             <Image 
//               source={require('../assets/image/img4.png')} 
//               style={styles.icon}
//             />
//             <Text>Đổi quà</Text>
//           </View>
//           <View style={styles.feature}>
//             <Image 
//               source={require('../assets/image/img5.png')} 
//               style={styles.icon}
//             />
//             <Text>Ưu đãi đặc biệt</Text>
//           </View>
//         </View>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity 
//             style={styles.registerButton}
//             onPress={() => navigation.navigate('Auth', { screen: 'SignUpScreen' })}
//           >
//             <Text style={styles.buttonText}>Đăng ký</Text>
//           </TouchableOpacity>
//           <TouchableOpacity 
//             style={styles.loginButton}
//             onPress={() => navigation.push('Auth', { screen: 'SignInScreen' })}
//           >
//             <Text style={styles.buttonText}>Đăng nhập</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.infoContainer}>
//         <Text style={styles.infoText}>
//           Gọi ĐƯỜNG DÂY NÓNG: <Text style={styles.linkText}>19002224</Text>
//         </Text>
//         <Text style={styles.infoText}>
//           Email: <Text style={styles.linkText}>hotro@galaxystudio.vn</Text>
//         </Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   settingsIcon: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//   },
//   promotionContainer: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   image: {
//     width: 100,
//     height: 100,
//   },
//   promotionText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 10,
//   },
//   featuresContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     marginVertical: 10,
//   },
//   feature: {
//     alignItems: 'center',
//   },
//   icon: {
//     width: 40,
//     height: 40,
//     marginBottom: 5,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//   },
//   registerButton: {
//     backgroundColor: '#FF7F00',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   loginButton: {
//     backgroundColor: '#FF7F00',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   infoContainer: {
//     marginTop: 30,
//   },
//   infoText: {
//     fontSize: 16,
//     marginVertical: 5,
//   },
//   linkText: {
//     color: '#FF7F00',
//   },
// });

// export default AccountScreen;
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SIZES, COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme'; // Đảm bảo bạn đã import đầy đủ

type RootParamList = {
  AccountScreen: undefined;
  SignUpScreen: undefined;
  SignInScreen: undefined;
  Auth: { screen: string };
};

const AccountScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Chào mừng bạn đến với Cinamas</Text>

      <View style={styles.promotionContainer}>
        <Image
          source={require('../assets/image/img6.png')}
          style={styles.image}
        />
        <Text style={styles.promotionText}>
          Đăng ký thành viên Cinames{'\n'}Nhận ngay ưu đãi!
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Auth', { screen: 'SignUpScreen' })}
          >
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.push('Auth', { screen: 'SignInScreen' })}
          >
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.space_20,
    backgroundColor: COLORS.Black, // Sử dụng màu đen từ theme
  },
  headerTitle: {
    color: COLORS.White,
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_24,
    textAlign: 'center',
    marginVertical: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  promotionContainer: {
    alignItems: 'center',
    marginVertical: SPACING.space_20,
  },
  image: {
    width: 100,
    height: 100,
  },
  promotionText: {
    color: COLORS.White,
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_18,
    textAlign: 'center',
    marginVertical: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: SPACING.space_20,
  },
  registerButton: {
    backgroundColor: COLORS.Orange, // Đặt màu cam cho nút
    paddingVertical: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: COLORS.Orange, // Đặt màu cam cho nút
    paddingVertical: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.White,
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
  },
});

export default AccountScreen;