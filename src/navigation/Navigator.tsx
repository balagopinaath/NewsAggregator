import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsOverview from '../screens/NewsOverview';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Favourite from '../screens/Favourite';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

type RootStackParamList = {
  HomeScreen: undefined;
  NewsOverview: undefined;
  Favourite: undefined;
};

function HomeScreen() {
  return (
    <BottomTabs.Navigator screenOptions={{headerShown: false}}>
      <BottomTabs.Screen
        options={{
          tabBarIcon(props) {
            return (
              <Icon
                style={{fontSize: 18}}
                name={props.focused ? 'newspaper-circle' : 'newspaper-outline'}
                {...props}
              />
            );
          },
        }}
        name="Home"
        component={Home}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon(props) {
            return (
              <Icon
                style={{fontSize: 18}}
                name={props.focused ? 'cards-heart' : 'cards-heart-outline'}
                {...props}
              />
            );
          },
        }}
        name="Favourite"
        component={(props: any) => <Favourite {...props} />}
      />
    </BottomTabs.Navigator>
  );
}

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          name="NewsOverview"
          component={(props: any) => <NewsOverview {...props} />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
