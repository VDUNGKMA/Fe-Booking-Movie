// src/utils/linkingConfig.ts

import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationTypes';

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: ['movieapp://'],
    config: {
        screens: {
            SuccessScreen: 'payment/success',
            FailScreen: 'payment/cancel',
            Tab: {
                screens: {
                    Home: 'home',
                    Search: 'search',
                    Ticket: 'ticket',
                    User: 'user',
                },
            },
            MovieDetails: 'movie-details/:id',
            CinemaSelection: 'cinema-selection',
            SeatBooking: 'seat-booking',
            PayPalPayment: 'payment-confirmation',
            Auth: {
                screens: {
                    SignInScreen: 'auth/signin',
                    SignUpScreen: 'auth/signup',
                    ForgetPwdScreen: 'auth/forget-password',
                    UserAccountScreen: 'auth/account',
                    VerificationScreen: 'auth/verify/:code',
                    ResetPwdScreen: 'auth/reset-password',
                    InfoScreen: 'auth/info',
                    CardScreen: 'auth/card',
                    InfoCardScreen: 'auth/info-card',
                    PaymentConfirmationScreen: 'auth/payment-confirmation',
                    ChangePwdScreen: 'auth/change-password',
                },
            },
        },
    },
};

export default linking;
