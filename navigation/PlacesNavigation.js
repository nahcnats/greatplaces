// Import libraries
import React, { useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';

// Import constants
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const PlacesNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Places"
      screenOptions={defaultNavOptions}
    >
      <Stack.Screen
        name="Places"
        component={PlacesListScreen}
      />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetailScreen}
      />
      <Stack.Screen
        name="NewPlace"
        component={NewPlaceScreen}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
      />
    </Stack.Navigator>
  );
}

const PlacesNavigation = () => {
  return (
    <NavigationContainer>
      <PlacesNavigator />
    </NavigationContainer>
  )
}

export default PlacesNavigation;