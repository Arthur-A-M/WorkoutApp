import { Text, View, Pressable, FlatList, ActivityIndicator, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getExerciseArray, ReturnTime } from '../../../Functions';
import { renderExercise } from '../../../Components';
import { series, sessions, login } from '../Workout/data';

import { styles } from './styles';

export default function SeriesNamesCreationScreen({ navigation }) {
    const [numberOfSeries, setnumberOfSeries] = useState(0);
    const [seriesNames, setSeriesNames] = useState([]);

    const defineListOfNames = () => {
        const updatedSeriesNames = Array.from({ length: numberOfSeries }, () => '');
        setSeriesNames(updatedSeriesNames);
    }

    const handleInputChange = (index, value) => {
        const updatedSeriesNames = [...seriesNames];
        updatedSeriesNames[index] = value;
        setSeriesNames(updatedSeriesNames);
    }

    const renderExercise = ({ item, index }) => {
        return (
                <TextInput
                    style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                    key={index}
                    value={item}
                    onChangeText={value => handleInputChange(index, value)}
                />
        );
    }

    const createSeries = async () => {
        try {
            const jsonValue = JSON.stringify(seriesNames);
            await AsyncStorage.setItem(`${login}`, jsonValue);
            alert(`Serie: created, under the login ${login} !`);
            console.log(jsonValue);
            return navigation.navigate('Home');
        } catch (error) {
            console.log(error);
            alert(`Error: ${error}`);
        }
    }

    useEffect(() => {
        console.log(seriesNames);
    }, [seriesNames]);

    return (
        <View style={styles.container}>
            <TextInput
                style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={value => setnumberOfSeries(parseInt(value))}
                keyboardType="numeric"
                maxLength={1}
            />
            <Pressable onPress={defineListOfNames}>
                <Text>Create name inputs</Text>
            </Pressable>
            <Pressable onPress={createSeries}>
                <Text>Create series</Text>
            </Pressable>
            <FlatList data={seriesNames} renderItem={renderExercise} />
        </View>
    )
}
