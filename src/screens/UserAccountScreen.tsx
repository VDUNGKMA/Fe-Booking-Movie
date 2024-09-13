// UserAccountScreen.tsx
import React, { useState } from 'react';
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import AppHeader from '../components/AppHeader';
import SettingComponent from '../components/SettingComponent';

const UserAccountScreen = ({ navigation }: any) => {
  const [hasBankAccount, setHasBankAccount] = useState(false); // Giả sử trạng thái có tài khoản ngân hàng

  const handleBankAccountPress = () => {
    if (hasBankAccount) {
      navigation.navigate('InfoCardScreen'); // Điều hướng đến InfoCardScreen nếu có tài khoản ngân hàng
    } else {
      navigation.navigate('CardScreen'); // Điều hướng đến CardScreen nếu chưa có tài khoản ngân hàng
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
        <Text style={styles.avatarText}>John Doe</Text>
      </View>

      <View style={styles.profileContainer}>
        <SettingComponent
          icon="user"
          heading="Account"
          subheading="Edit Profile"
          subtitle="Change Password"
          onPress={() => navigation.navigate('InfoScreen')} // Điều hướng đến InfoScreen
        />
        <SettingComponent
          icon="dollar"
          heading="Bank Account"
          subheading="View Bank Details"
          subtitle="Add or Update Bank Account"
          onPress={handleBankAccountPress} // Sử dụng hàm handlePress để điều hướng
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
