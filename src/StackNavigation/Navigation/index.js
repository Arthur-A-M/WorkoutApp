import React from 'react';
import { SafeAreaView} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../Screens/Home';
import WorkoutScreen from '../Screens/Workout';
import HIITScreen from '../Screens/HIIT';


const Stack = createStackNavigator();
export default function Navigation() {
    const screens = [
        { name: "Home", component: HomeScreen },
        { name: "Workout", component: WorkoutScreen },
        { name: "HIIT", component: HIITScreen }
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                {screens.map(screen =>
                    <Stack.Screen
                        key={screen.name}
                        name={screen.name}
                        component={screen.component}
                    />
                )}
            </Stack.Navigator>
        </SafeAreaView>
    );
}
