import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, StatusBar, Image, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import AppHeader from '../components/AppHeader';
import SettingComponent from '../components/SettingComponent';
import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const UserAccountScreen = ({ route, navigation }: any) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { setIsLoggedIn } = useContext(AuthContext);

    const fetchUserData = async () => {
        const userId = await AsyncStorage.getItem('userId');
        try {
            const response = await api.get(`api/customer/user/${userId}`);
            setUser(response.data.data.user);
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu người dùng:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();

        const unsubscribe = navigation.addListener('focus', () => {
            fetchUserData();
        });

        return unsubscribe;
    }, [navigation]);

    const handleLogoutPress = () => {
        Alert.alert(
            'Xác nhận Đăng Xuất',
            'Bạn có chắc chắn muốn đăng xuất không?',
            [
                {
                    text: 'Không',
                    style: 'cancel',
                },
                {
                    text: 'Có',
                    onPress: async () => {
                        await AsyncStorage.removeItem('userId');
                        await AsyncStorage.removeItem('jwtToken');
                        setIsLoggedIn(false);
                        navigation.replace('TabNavigator', {
                            screen: 'Home',
                            params: { isLoggedIn: false },
                        });
                    },
                },
            ],
            { cancelable: true }
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.White} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <View style={styles.appHeaderContainer}>
                <AppHeader
                    name="close"
                    header={'Thông Tin Tài Khoản'}
                    action={() => navigation.goBack()}
                />
            </View>

            <View style={styles.profileContainer}>
                <Image
                    source={require('../assets/image/avatar.png')}
                    style={styles.avatarImage}
                />
                <Text style={styles.avatarText}>{user?.username}</Text>
            </View>

            <View style={styles.settingsContainer}>
                <SettingComponent
                    icon="user"
                    heading="Tài Khoản"
                    subheading="Chỉnh Sửa Thông Tin"
                    subtitle="Đổi Mật Khẩu"
                    onPress={() => navigation.navigate('InfoScreen', { user })}
                />
                <SettingComponent
                    icon="close"
                    heading="Đăng Xuất"
                    subheading="Thoát khỏi tài khoản của bạn"
                    subtitle="Xác nhận Đăng Xuất"
                    onPress={handleLogoutPress}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.Black,
        paddingTop: SPACING.space_20,
    },
    appHeaderContainer: {
        marginHorizontal: SPACING.space_36,
        marginTop: SPACING.space_40,
    },
    profileContainer: {
        alignItems: 'center',
        paddingVertical: SPACING.space_36,
    },
    avatarImage: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: COLORS.White,
        marginBottom: SPACING.space_16,
    },
    avatarText: {
        fontFamily: FONTFAMILY.poppins_bold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.White,
    },
    settingsContainer: {
        backgroundColor: COLORS.DarkGrey,
        borderRadius: 20,
        marginHorizontal: SPACING.space_20,
        paddingVertical: SPACING.space_16,
        paddingHorizontal: SPACING.space_20,
        shadowColor: COLORS.Black,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.Black,
    },
});

export default UserAccountScreen;
