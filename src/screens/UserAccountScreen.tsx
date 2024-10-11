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
    const [user, setUser] = useState<any>(null); // State lưu thông tin người dùng
    const [loading, setLoading] = useState(true); // State để theo dõi trạng thái loading
    const { setIsLoggedIn } = useContext(AuthContext);
    // Hàm gọi API để lấy thông tin người dùng
    const fetchUserData = async () => {
        const userId = await AsyncStorage.getItem('userId');
        try {
            const response = await api.get(`api/customer/user/${userId}`); // Sửa URL API ở đây
            setUser(response.data.data.user);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData(); // Gọi API khi component được render

        // Lắng nghe sự kiện quay lại màn hình
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUserData(); // Cập nhật dữ liệu người dùng mỗi khi màn hình được hiển thị lại
        });

        return unsubscribe; // Trả về hàm huỷ sự kiện khi component unmount
    }, [navigation]);

    const handleBankAccountPress = () => {
        if (user?.hasBankAccount) {
            navigation.navigate('InfoCardScreen');
        } else {
            navigation.navigate('CardScreen');
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.White} />
            </View>
        );
    }

    const handleLogoutPress = () => {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'No', // Nếu nhấn "No" sẽ đóng popup
                    style: 'cancel',
                },
                {
                    text: 'Yes', // Nếu nhấn "Yes" sẽ chuyển đến màn hình đăng nhập
                    onPress: async () => {
                        await AsyncStorage.removeItem('userId');
                        await AsyncStorage.removeItem('jwtToken');
                        setIsLoggedIn(false);
                        // navigation.navigate('SignInScreen');
                        navigation.replace('TabNavigator', {
                            screen: 'Home',
                            params: { isLoggedIn: true },
                        });

                    },
                },
            ],
            { cancelable: true } // Cho phép đóng popup bằng cách nhấn ra ngoài
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <View style={styles.appHeaderContainer}>
                <AppHeader
                    name="close"
                    header={'My Profile'}
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

            <View style={styles.profileContainer}>
                <SettingComponent
                    icon="user"
                    heading="Account"
                    subheading="Edit Profile"
                    subtitle="Change Password"
                    onPress={() => navigation.navigate('InfoScreen', { user })} // Điều hướng đến InfoScreen với thông tin người dùng
                />

                <SettingComponent
                    icon="setting"
                    heading="Settings"
                    subheading="Theme"
                    subtitle="Permissions"
                />
                <SettingComponent
                    icon="close"
                    heading="Logout"
                    subheading="Logout from your account"
                    subtitle="Confirm Logout"
                    onPress={handleLogoutPress}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: COLORS.Black,
    },
    appHeaderContainer: {
        marginHorizontal: SPACING.space_36,
        marginTop: SPACING.space_20 * 2,
    },
    profileContainer: {
        alignItems: 'center',
        padding: SPACING.space_36,
    },
    avatarImage: {
        height: 80,
        width: 80,
        borderRadius: 80,
    },
    avatarText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        marginTop: SPACING.space_16,
        color: COLORS.White,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.Black,
    },
});

export default UserAccountScreen;