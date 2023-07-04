import { Text, View, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';

import { getObjectData } from '../../../Functions';

import { styles } from './styles';

export default function WorkoutSeriesScreen({ navigation, route }) {
    const [exercises, setExercises] = useState([]);

    const { series } = route.params;

    const fetchExercises = async (serie) => {
        const newExercises = await getObjectData(serie);
        setExercises(newExercises);
    }

    useEffect(() => {
        if (exercises.length > 0) {
            navigation.navigate('Workout', { exercises: exercises });
        }
    }, [exercises, navigation]);

    return (
        <View style={styles.container}>
            {series.map((serie, index) => (
                <Pressable
                    style={styles.pressableSeries}
                    key={index}
                    onPress={() => fetchExercises(serie)}
                >
                    <Text style={[styles.text, { fontSize: 35 }]}>{serie}</Text>
                </Pressable>
            ))}
        </View>
    );
}

