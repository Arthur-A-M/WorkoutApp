import { Text, View, Pressable, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons';

import { getObjectData, ReturnTime } from '../../../Functions';
import { renderExercise } from '../../../Components';

import { styles } from './styles';


export default function WorkoutSeriesScreen({ navigation, route }) {
    const [exercises, setExercises] = useState([]);

    const { series } = route.params;

    useEffect(() => {
        navigation.navigate('Workout', { exercises: exercises });
    }, [exercises]);

    const fetchExercises = async (serie) => {
        console.log(serie);
        const newExercises = await getObjectData(serie);
        setExercises(newExercises);
    }

    return (
        <View style={styles.container}>
            {series.map((serie, index) => (
                <Pressable
                    style={styles.pressableSeries}
                    key={index}
                    onPress={() => fetchExercises(`${serie}`)}
                >
                    <Text style={[styles.text, { fontSize: 35 }]}>{serie}</Text>
                </Pressable>
            ))}
        </View>
    );
}

