
// import { createStackNavigator } from '@react-navigation/stack';
// import SignInScreen from '../screens/SignInScreen';
// import SignUpScreen from '../screens/SignUpScreen';
// import ForgetPwdScreen from '../screens/ForgetPwdScreen';
// import UserAccountScreen from '../screens/UserAccountScreen';
// import VerificationScreen from '../screens/VerificationScreen';
// import ResetPwdScreen from '../screens/ResetPwdScreen';
// import InfoScreen from '../screens/InfoScreen';
// import CardScreen from '../screens/CardScreen';
// import InfoCardScreen from '../screens/InfoCardScreen';

// import PaymentConfirmationScreen from '../screens/PayPalPaymentScreen';
// import SuccessScreen from '../screens/SuccessScreen';
// import FailScreen from '../screens/FailScreen';

// import ChangePwdScreen from '../screens/ChangePwdScreen';

// // import CinemaSelectionScreen from '../screens/CinemaSelectionScreen';


// const Stack = createStackNavigator();

// const AppNavigator = () => {
//   return (
//     // Không cần thêm NavigationContainer ở đây
//     <Stack.Navigator initialRouteName="SignInScreen" screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="SignInScreen" component={SignInScreen} />
//       <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
//       <Stack.Screen name="ForgetPwdScreen" component={ForgetPwdScreen} />
//       <Stack.Screen name="UserAccountScreen" component={UserAccountScreen} />
//       <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
//       <Stack.Screen name="ResetPwdScreen" component={ResetPwdScreen} />
//       <Stack.Screen name="InfoScreen" component={InfoScreen} />
//       <Stack.Screen name="CardScreen" component={CardScreen} />
//       <Stack.Screen name="InfoCardScreen" component={InfoCardScreen} />

//       <Stack.Screen name="PaymentConfirmationScreen" component={PaymentConfirmationScreen} />
//       <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
//       <Stack.Screen name="FailScreen" component={FailScreen} />

//       <Stack.Screen name="ChangePwdScreen" component={ChangePwdScreen} />

//       {/* <Stack.Screen name="CinemaSelection" component={CinemaSelectionScreen} /> */}
     
//     </Stack.Navigator>
//   );
// };

// export default AppNavigator;
// src/navigators/AppNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgetPwdScreen from '../screens/ForgetPwdScreen';
import UserAccountScreen from '../screens/UserAccountScreen';
import VerificationScreen from '../screens/VerificationScreen';
import ResetPwdScreen from '../screens/ResetPwdScreen';
import InfoScreen from '../screens/InfoScreen';
import CardScreen from '../screens/CardScreen';
import InfoCardScreen from '../screens/InfoCardScreen';
import PaymentConfirmationScreen from '../screens/PayPalPaymentScreen';
import ChangePwdScreen from '../screens/ChangePwdScreen';

import { AuthStackParamList } from '../types/navigationTypes';
import TabNavigator from './TabNavigator';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import HomeScreen from '../screens/HomeScreen';
import TicketScreen from '../screens/TicketScreen';
import PayPalPaymentScreen from '../screens/PayPalPaymentScreen';
const Stack = createStackNavigator<AuthStackParamList>();

const AppNavigator = () => {
  
  return (
    <Stack.Navigator initialRouteName="SignInScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ForgetPwdScreen" component={ForgetPwdScreen} />
      <Stack.Screen name="UserAccountScreen" component={UserAccountScreen} />
      <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
      <Stack.Screen name="ResetPwdScreen" component={ResetPwdScreen} />
      <Stack.Screen name="InfoScreen" component={InfoScreen}   />
      <Stack.Screen name="CardScreen" component={CardScreen} />
      <Stack.Screen name="InfoCardScreen" component={InfoCardScreen} />
      <Stack.Screen name="PaymentConfirmationScreen" component={PaymentConfirmationScreen} />
      <Stack.Screen name="ChangePwdScreen" component={ChangePwdScreen} />
      <Stack.Screen name="TicketScreen" component={TicketScreen} /> 
      <Stack.Screen name="PayPalPaymentScreen" component={PayPalPaymentScreen} /> 

      {/* Không định nghĩa SuccessScreen và FailScreen ở đây để tránh trùng lặp */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
