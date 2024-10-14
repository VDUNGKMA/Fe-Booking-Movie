
// // export default AccountScreen;
// import React from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { SIZES, COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme'; // Đảm bảo bạn đã import đầy đủ

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
//       <Text style={styles.headerTitle}>Chào mừng bạn đến với Cinamas</Text>

//       <View style={styles.promotionContainer}>
//         <Image
//           source={require('../assets/image/img6.png')}
//           style={styles.image}
//         />
//         <Text style={styles.promotionText}>
//           Đăng ký thành viên Cinamas{'\n'}Nhận ngay ưu đãi!
//         </Text>

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
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 80,
//     backgroundColor: COLORS.Black, // Sử dụng màu đen từ theme
//   },
//   headerTitle: {
//     color: COLORS.White,
//     fontWeight: 'bold',
//     fontSize: FONTSIZE.size_24,
//     textAlign: 'center',
//     marginVertical: SPACING.space_20,
//     fontFamily: FONTFAMILY.poppins_medium,
//   },
//   promotionContainer: {
//     alignItems: 'center',
//     marginVertical: SPACING.space_20,
//   },
//   image: {
//     width: 100,
//     height: 100,
//   },
//   promotionText: {
//     color: COLORS.White,
//     fontWeight: 'bold',
//     fontSize: FONTSIZE.size_18,
//     textAlign: 'center',
//     marginVertical: SPACING.space_10,
//     fontFamily: FONTFAMILY.poppins_medium,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     marginTop: SPACING.space_20,
//   },
//   registerButton: {
//     backgroundColor: COLORS.Orange, // Đặt màu cam cho nút
//     paddingVertical: SPACING.space_12,
//     paddingHorizontal: SPACING.space_24,
//     borderRadius: 5,
//   },
//   loginButton: {
//     backgroundColor: COLORS.Orange, // Đặt màu cam cho nút
//     paddingVertical: SPACING.space_12,
//     paddingHorizontal: SPACING.space_24,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: COLORS.White,
//     fontWeight: 'bold',
//     fontSize: FONTSIZE.size_16,
//     fontFamily: FONTFAMILY.poppins_medium,
//   },
// });

// export default AccountScreen;
// export default AccountScreen;
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SIZES, COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme';

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
    backgroundColor: COLORS.Black,
    justifyContent: 'center',
  },
  headerTitle: {
    color: COLORS.White,
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_24,
    textAlign: 'center',
    marginBottom: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  promotionContainer: {
    alignItems: 'center',
    // backgroundColor: '#A9A9A9',
    padding: SPACING.space_20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: COLORS.Black,
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60, // Rounded image
    marginBottom: SPACING.space_12,
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
    backgroundColor: COLORS.Orange,
    paddingVertical: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
    borderRadius: 30,
    elevation: 3,
    shadowColor: COLORS.Black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  loginButton: {
    // backgroundColor: '#FFD580',
    backgroundColor: COLORS.Orange,
    paddingVertical: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
    borderRadius: 30,
    elevation: 3,
    shadowColor: COLORS.Black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  buttonText: {
    color: COLORS.White,
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
  },
});

export default AccountScreen;
