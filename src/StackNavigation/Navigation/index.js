import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../Screens/Home';
import WorkoutScreen from '../Screens/Workout';
import HIITScreen from '../Screens/HIIT';


const Stack = createStackNavigator();
export default function Navigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Workout" component={WorkoutScreen} />
            <Stack.Screen name="HIIT" component={HIITScreen} />
        </Stack.Navigator>
    )
}