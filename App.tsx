// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import TabNavigator from './src/navigators/TabNavigator';
// import MovieDetailsScreen from './src/screens/MovieDetailsScreen';
// import SeatBookingScreen from './src/screens/SeatBookingScreen';
// import PaymentConfirmationScreen from './src/screens/PaymentConfirmationScreen';  // Import PaymentConfirmationScreen
// import SuccessScreen from './src/screens/SuccessScreen';  // Import SuccessScreen
// import FailScreen from './src/screens/FailScreen';  // Import FailScreen
// import AppNavigator from './src/navigators/AppNavigator';
// import CinemaSelectionScreen from './src/screens/CinemaSelectionScreen';


// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{headerShown: false}}>
//         <Stack.Screen
//           name="Tab"
//           component={TabNavigator}
//           options={{animation: 'default'}}
//         />
//         <Stack.Screen
//           name="MovieDetails"
//           component={MovieDetailsScreen}
//           options={{animation: 'slide_from_right'}}
//         />
//         <Stack.Screen
//           name="CinemaSelection"
//           component={CinemaSelectionScreen}
//           options={{animation: 'slide_from_right'}}
//         />
//         <Stack.Screen
//           name="SeatBooking"
//           component={SeatBookingScreen}
//           options={{animation: 'slide_from_bottom'}}
//         />
//         <Stack.Screen
//           name="PaymentConfirmationScreen"  // Thêm màn hình PaymentConfirmationScreen
//           component={PaymentConfirmationScreen}
//           options={{animation: 'slide_from_bottom'}}
//         />
//         <Stack.Screen
//           name="SuccessScreen"  // Thêm màn hình SuccessScreen
//           component={SuccessScreen}
//           options={{animation: 'slide_from_bottom'}}
//         />
//         <Stack.Screen
//           name="FailScreen"  // Thêm màn hình FailScreen
//           component={FailScreen}
//           options={{animation: 'slide_from_bottom'}}
//         />
//         <Stack.Screen
//           name="Auth"
//           component={AppNavigator}
//           options={{animation: 'slide_from_bottom'}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import TabNavigator from './src/navigators/TabNavigator';
// import MovieDetailsScreen from './src/screens/MovieDetailsScreen';
// import SeatBookingScreen from './src/screens/SeatBookingScreen';
// import PaymentConfirmationScreen from './src/screens/PayPalPaymentScreen';
// import SuccessScreen from './src/screens/SuccessScreen';
// import FailScreen from './src/screens/FailScreen';
// import AppNavigator from './src/navigators/AppNavigator';
// import CinemaSelectionScreen from './src/screens/CinemaSelectionScreen';
// import PayPalPaymentScreen from './src/screens/PayPalPaymentScreen';

// const Stack = createNativeStackNavigator();

// // Thêm cấu hình Deep Linking
// const linking = {
//   prefixes: ['movieapp://'], // Thay 'yourapp' bằng URL scheme của bạn
//   config: {
//     screens: {
//       // Định nghĩa các màn hình và đường dẫn tương ứng
//       SuccessScreen: 'payment/success',
//       FailScreen: 'payment/cancel',
//       // Các màn hình khác
//       Tab: '',
//       MovieDetails: 'movie-details',
//       CinemaSelection: 'cinema-selection',
//       SeatBooking: 'seat-booking',
//       PaymentConfirmationScreen: 'payment-confirmation',
//       Auth: 'auth',
//     },
//   },
// };

// const App = () => {

//   return (
//     <NavigationContainer linking={linking}>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen
//           name="Tab"
//           component={TabNavigator}
//           options={{ animation: 'default' }}
//         />
//         <Stack.Screen
//           name="MovieDetails"
//           component={MovieDetailsScreen}
//           options={{ animation: 'slide_from_right' }}
//         />
//         <Stack.Screen
//           name="CinemaSelection"
//           component={CinemaSelectionScreen}
//           options={{ animation: 'slide_from_right' }}
//         />
//         <Stack.Screen
//           name="SeatBooking"
//           component={SeatBookingScreen}
//           options={{ animation: 'slide_from_bottom' }}
//         />
//         <Stack.Screen
//           name="PayPalPayment"
//           component={PayPalPaymentScreen}
//           options={{ animation: 'slide_from_bottom' }}
//         />
//         <Stack.Screen
//           name="SuccessScreen"
//           component={SuccessScreen}
//           options={{ animation: 'slide_from_bottom' }}
//         />
//         <Stack.Screen
//           name="FailScreen"
//           component={FailScreen}
//           options={{ animation: 'slide_from_bottom' }}
//         />
//         <Stack.Screen
//           name="Auth"
//           component={AppNavigator}
//           options={{ animation: 'slide_from_bottom' }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

// App.tsx

// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen';
import CinemaSelectionScreen from './src/screens/CinemaSelectionScreen';
import SeatBookingScreen from './src/screens/SeatBookingScreen';
import PayPalPaymentScreen from './src/screens/PayPalPaymentScreen';
import SuccessScreen from './src/screens/SuccessScreen';
import FailScreen from './src/screens/FailScreen';
import AppNavigator from './src/navigators/AppNavigator';
import { AuthProvider } from './src/context/AuthContext'; // Import AuthProvider
import { RootStackParamList } from './src/types/navigationTypes';
import linkingConfig from './src/utils/linkingConfig';
import { enableScreens } from 'react-native-screens';
import InfoScreen from './src/screens/InfoScreen';
import ChangePwdScreen from './src/screens/ChangePwdScreen';
import SignInScreen from './src/screens/SignInScreen';
enableScreens();
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer linking={linkingConfig}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Tab"
            component={TabNavigator}
            options={{ animation: 'default' }}
          />
          <Stack.Screen
            name="MovieDetails"
            component={MovieDetailsScreen}
            options={{ animation: 'slide_from_right' }}
          />
          <Stack.Screen
            name="CinemaSelection"
            component={CinemaSelectionScreen}
            options={{ animation: 'slide_from_right' }}
          />
          <Stack.Screen
            name="SeatBooking"
            component={SeatBookingScreen}
            options={{ animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="PayPalPayment"
            component={PayPalPaymentScreen}
            options={{ animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="SuccessScreen"
            component={SuccessScreen}
            options={{ animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="FailScreen"
            component={FailScreen}
            options={{ animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="Auth"
            component={AppNavigator}
            options={{ animation: 'slide_from_bottom' }}
          />
          <Stack.Screen name="InfoScreen"
            component={InfoScreen}
            options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name="ChangePwdScreen"
            component={ChangePwdScreen}
            options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name="SignInScreen"
            component={SignInScreen}
            options={{ animation: 'slide_from_bottom' }} />

        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
