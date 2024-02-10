// Main.js

import * as React from 'react';
import { View, Text } from 'react-native';
import SelectScreen from './SelectCity';
import ShowCity from './ShowCity';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

console.log("NavClient Acces")

const loginName = 'Show City';
const AssetName = 'City Details';

const Tab = createBottomTabNavigator();

const NavClient = () => {
  return (
    <NavigationContainer>
     <Tab.Navigator
  initialRouteName={loginName}
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      let rn = route.name;

      if (rn === loginName) {
        iconName = focused ? 'home' : 'home-outline';
      } else if (rn === AssetName) {
        iconName = focused ? 'settings' : 'settings-outline';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}>
  <Tab.Screen name={loginName} component={SelectScreen} />
  <Tab.Screen name={AssetName} component={ShowCity} />
</Tab.Navigator>

    </NavigationContainer>
  );
};

export default NavClient;
