import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="HIIT" component={HIITScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Workout')}>
        <Text>Go to Workout Screen</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('HIIT')}>
        <Text>Go to HIIT Screen</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

function WorkoutScreen() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>This is the Workout Screen</Text>
      {/* Add workout screen content here */}
      <StatusBar style="auto" />
    </View>
  );
}

function HIITScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the HIIT Screen</Text>
      {/* Add HIIT screen content here */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
