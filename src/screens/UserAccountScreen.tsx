import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import AppHeader from '../components/AppHeader';
import SettingComponent from '../components/SettingComponent';
import api from '../api/api';
 
const UserAccountScreen = ({ route, navigation }: any) => {
    const { userId } = route.params; // Lấy userId từ route.params
    const [user, setUser] = useState<any>(null); // State lưu thông tin người dùng
    const [loading, setLoading] = useState(true); // State để theo dõi trạng thái loading
 
    // Hàm gọi API để lấy thông tin người dùng
    const fetchUserData = async () => {
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
    }, [userId]);
 
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
console.log("check user",user)
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
                    icon="dollar"
                    heading="Bank Account"
                    subheading="View Bank Details"
                    subtitle="Add or Update Bank Account"
                    onPress={handleBankAccountPress}
                />
                <SettingComponent
                    icon="setting"
                    heading="Settings"
                    subheading="Theme"
                    subtitle="Permissions"
                />
                <SettingComponent
                    icon="info"
                    heading="About"
                    subheading="About Movies"
                    subtitle="more"
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
 
 