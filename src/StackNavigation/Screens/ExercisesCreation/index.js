import { Text, View, Pressable, TextInput, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';

import { storeObjectData, getStringData } from '../../../Functions';

import { styles } from './styles';

export default function ExercisesCreationScreen({ route }) {
    const [numberOfExercises, setNumberOfExercises] = useState(0);
    const [exercises, setExercises] = useState([]);

    const { serie } = route.params;
  
    useEffect(() => {
      console.log('item is:', serie);
      initialRender();
    }, []);
  
    const initialRender = async () => {
        const value = await getStringData(serie);
        if (value) {
          setExercises(JSON.parse(value));
        } else {
          alert('No session found!');
        }
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
          placeholder={key}
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
  await storeObjectData(serie, exercises);
  const value = await getStringData(serie);
  console.log('the value is:', value);
};
  
    return (
      <View style={styles.container}>
        <Text style={{ backgroundColor: 'red' }}>{serie}</Text>
        <Pressable onPress={defineListOfexercises}>
          <Text>Define exercises</Text>
          <TextInput
            style={styles.TextInput}
            value={numberOfExercises}
            onChangeText={(value) => setNumberOfExercises(parseInt(value))}// need verification the same used before to test if it is integer
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
  
