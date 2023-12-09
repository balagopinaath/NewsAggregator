import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsOverview from '../screens/NewsOverview';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Favourite from '../screens/Favourite';

type RootStackParamList = {
  Home: undefined;
  Favourite: undefined;
};

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator<RootStackParamList>();

const HomeScreen = () => {
  return (
    <BottomTabs.Navigator screenOptions={{headerShown: false}}>
      <BottomTabs.Screen name="Home" component={Home} />
      <BottomTabs.Screen name="Favourite" component={Favourite} />
    </BottomTabs.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          options={{headerShown: false}}
          name="HomeScreen"
          component={HomeScreen}></Stack.Screen>
        <Stack.Screen
          name="NewsOverview"
          component={NewsOverview}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
