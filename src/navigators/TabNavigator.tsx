
// src/navigators/TabNavigator.tsx

import React, { useContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import TicketScreen from '../screens/TicketScreen';
import AccountScreen from '../screens/AccountScreen';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import { View, StyleSheet } from 'react-native';
import { TabParamList } from '../types/navigationTypes';
import UserAccountScreen from '../screens/UserAccountScreen';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { BookingProvider } from './context/BookingContext';
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = ({route}:any) => {
  // const { isLoggedIn: initialLoggedInState } = route.params || { isLoggedIn: false }; // Lấy trạng thái đăng nhập từ props
  // // const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái để kiểm soát đăng nhập
  // const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedInState); 
  const { isLoggedIn } = useContext(AuthContext); // Lấy trạng thái đăng nhập từ AuthContext
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.Black,
          borderTopWidth: 0,
          height: SPACING.space_10 * 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.activeTabBackground,
                focused ? { backgroundColor: COLORS.Orange } : {},
              ]}
            >
              <CustomIcon
                name="video"
                color={COLORS.White}
                size={FONTSIZE.size_30}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.activeTabBackground,
                focused ? { backgroundColor: COLORS.Orange } : {},
              ]}
            >
              <CustomIcon
                name="search"
                color={COLORS.White}
                size={FONTSIZE.size_30}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={TicketScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.activeTabBackground,
                focused ? { backgroundColor: COLORS.Orange } : {},
              ]}
            >
              <CustomIcon
                name="ticket"
                color={COLORS.White}
                size={FONTSIZE.size_30}
              />
            </View>
          ),
        }}
      />
      {isLoggedIn ? (
        <Tab.Screen
          name="UserAccount"
          component={UserAccountScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? { backgroundColor: COLORS.Orange } : {},
                ]}
              >
                <CustomIcon
                  name="user"
                  color={COLORS.White}
                  size={FONTSIZE.size_30}
                />
              </View>
            ),
          }}
        />
      ) : (
          <Tab.Screen
            name="User"
            component={AccountScreen}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ focused }) => (
                <View
                  style={[
                    styles.activeTabBackground,
                    focused ? { backgroundColor: COLORS.Orange } : {},
                  ]}
                >
                  <CustomIcon
                    name="user"
                    color={COLORS.White}
                    size={FONTSIZE.size_30}
                  />
                </View>
              ),
            }}
          />
      )}
      
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeTabBackground: {
    backgroundColor: COLORS.Black,
    padding: SPACING.space_18,
    borderRadius: SPACING.space_18 * 10,
  },
});

export default TabNavigator;
