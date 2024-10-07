// src/types/navigationTypes.ts

import { NavigatorScreenParams } from '@react-navigation/native';

// Định nghĩa các màn hình trong Tab Navigator
export type TabParamList = {
    Home: undefined;
    Search: undefined;
    Ticket: undefined;
    User: undefined;
    UserAccount: undefined;
};

// Định nghĩa các màn hình trong Auth Stack Navigator
export type AuthStackParamList = {
    SignInScreen: undefined;
    SignUpScreen: undefined;
    TabNavigator: undefined;
    ForgetPwdScreen: undefined;
    UserAccountScreen: undefined;
    VerificationScreen: { code: string };
    ResetPwdScreen: undefined;
    InfoScreen: undefined;
    CardScreen: undefined;
    InfoCardScreen: undefined;
    PaymentConfirmationScreen: { ticketId: number; userId: number };
    ChangePwdScreen: undefined;
};

// Định nghĩa các màn hình trong Root Stack Navigator
export type RootStackParamList = {
    Tab: NavigatorScreenParams<TabParamList>;
    MovieDetails: { id: string };
    CinemaSelection: undefined;
    SeatBooking: { ticketId: number; userId: number };
    PayPalPayment: { ticketId: number; userId: number };
    SuccessScreen: { qrCode: string };
    FailScreen: undefined;
    Auth: NavigatorScreenParams<AuthStackParamList>;
    InfoScreen: undefined;
    ChangePwdScreen: undefined;
    SignInScreen: undefined;
    MovieDetailsScreen: undefined;
};
