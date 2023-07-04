import { Text, View, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { storeObjectData, getExerciseArray, getStringData } from '../../../Functions';

import { styles } from './styles';
import { sessions, series, login } from '../Workout/data';

export default function SeriesExercisesCreationScreen({ navigation }) {
    const [seriesNames, setSeriesNames] = useState([]);

    useEffect(() => {
        printResponse();
    }, []);

    useEffect(() => {
        console.log(
            'seriesNames is:',
            seriesNames,
            Array.isArray(seriesNames),
            seriesNames ? 'is true' : 'is false'
        );
    }, [seriesNames]);

    const printResponse = async () => {
        const response = await getStringData(`${login}`);
        console.log('response is:', JSON.parse(response));
        setSeriesNames(JSON.parse(response));
    };

const navigateToExercisesCreation = (serieName) => {
    navigation.navigate('ExercisesCreation', { serieName: serieName });
};

    const renderSeriesNames = () => {
        if (seriesNames.length === 0) {
            return <ActivityIndicator />;
        }

        return seriesNames.map((item, index) => (
            <Pressable
                key={index}
                style={{ backgroundColor: 'red' }}
                onPress={() => navigateToExercisesCreation(item)}
            >
                <Text>{item}</Text>
            </Pressable>
        ));
    };

    return <View style={styles.container}>{renderSeriesNames()}</View>;
}
