import { Text, View, Pressable, ActivityIndicator, TextInput, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { storeObjectData, getExerciseArray, getStringData } from '../../../Functions';

import { styles } from './styles';
import { sessions, series, login } from '../Workout/data';

export default function ExercisesCreationScreen({ route }) {
    const [numberOfExercises, setNumberOfExercises] = useState(0);
    const [exercises, setExercises] = useState([]);
    const { serieName } = route.params;
  
    useEffect(() => {
      console.log('item is:', serieName);
      initialRender();
    }, []);
  
    const initialRender = async () => {
        const value = await getStringData(serieName);
        setExercises(JSON.parse(value));
    }

    useEffect(() => {
      console.log('exercises are:', exercises);
    }, [exercises]);
  
    const handleInputChange = (index, key, value) => {
      const updatedExercises = [...exercises];
      updatedExercises[index][key] = value;
      setExercises(updatedExercises);
    };
  
const renderExercise = ({ item, index }) => {
  return (
    <View style={{ marginTop: 20 }}>
      {Object.keys(item).map((key) => (
        <TextInput
          style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
          key={`${index} ${key}`}
          value={String(item[key])} // Convert the value to a string
          onChangeText={(value) => handleInputChange(index, key, value)}
        />
      ))}
    </View>
  );
};
  
    const defineListOfexercises = () => {
      const updatedExercises = Array.from({ length: numberOfExercises }, () => ({
        name: '',
        repetitions: '',
        series: '',
        load: '',
      }));
      setExercises(updatedExercises);
    };

  
const handleFooterPress = async () => {
  await storeObjectData(serieName, exercises);
  const value = await getStringData(serieName);
  console.log('the value is:', value);
};
  
    return (
      <View style={styles.container}>
        <Text style={{ backgroundColor: 'red' }}>{serieName}</Text>
        <Pressable onPress={defineListOfexercises}>
          <Text>Define exercises</Text>
          <TextInput
            style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
            value={numberOfExercises}
            onChangeText={(value) => setNumberOfExercises(parseInt(value))}
            keyboardType="numeric"
            maxLength={2}
            placeholder={`Number of exercises is, ${exercises.length}`}
          />
        </Pressable>
        <FlatList data={exercises} renderItem={renderExercise} />
        <Pressable onPress={handleFooterPress}>
          <Text>Create Footer</Text>
        </Pressable>
      </View>
    );
  }
  
