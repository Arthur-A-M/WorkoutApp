import { Text, View, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { storeData, getExerciseArray, getStringData } from '../../../Functions';

import { styles } from './styles';
import { sessions, series, login } from '../Workout/data';

export default function SeriesExercisesCreationScreen() {

    useEffect(() => {
        printResponse();
    }, [])
    const printResponse = async () => {
        const response = await getStringData(`${login}`);
        console.log(response);
    }


    return (
        <View>
            <Text>index</Text>
        </View>
    );
}
