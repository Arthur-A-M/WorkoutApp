import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import Navigation from './src/StackNavigation/Navigation';
export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
      <StatusBar barStyle="dark-content" backgroundColor="white" hidden={true} />
    </NavigationContainer>
  );
}
