import React from 'react';
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import AppHeader from '../components/AppHeader';
import SettingComponent from '../components/SettingComponent';

const UserAccountScreen = ({ route, navigation }: any) => {
    const { user } = route.params; // Lấy thông tin người dùng từ route.params

    const handleBankAccountPress = () => {
        if (user.hasBankAccount) {
            navigation.navigate('InfoCardScreen');
        } else {
            navigation.navigate('CardScreen');
        }
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
                <Text style={styles.avatarText}>{user.username}</Text>
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
});

export default UserAccountScreen;