import { Text, View, Pressable } from 'react-native';
import React  from 'react';

import { getObjectData } from '../../../Functions';
import { unifiedStyles } from '../../../Styles/styles';

import { styles } from './styles';

export default function WorkoutSeriesScreen({ navigation, route }) {
    const { series } = route.params;

    const fetchExercises = async (serie) => {
        const newExercises = await getObjectData(serie);
        navigation.navigate('Workout', { exercises: newExercises });
    }

    return (
        <View style={unifiedStyles.container}>
            {series.map((serie, index) => (
                <Pressable
                    style={[unifiedStyles.containedView, styles.pressable, { width: '90%', }]}
                    key={index}
                    onPress={() => fetchExercises(serie)}
                >
                    <Text style={styles.text}>{serie}</Text>
                </Pressable>
            ))}
        </View>
    );
}

