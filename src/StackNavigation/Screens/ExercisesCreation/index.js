import { Text, View, Pressable, TextInput, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';

import { SelectList } from 'react-native-dropdown-select-list'

import { storeObjectData, getStringData } from '../../../Functions';

import { styles } from './styles';

export default function ExercisesCreationScreen({ route }) {
  const [numberOfExercises, setNumberOfExercises] = useState(0);
  const [exercises, setExercises] = useState([]);

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

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
      <View style={styles.viewTextInput}>
        {Object.keys(item).map((key) => (
          <TextInput
            style={[
              styles.textInput,
              {
                borderBottomLeftRadius: key === 'load' ? 10 : 0,
                borderBottomRightRadius: key === 'load' ? 10 : 0,
                borderTopLeftRadius: key === 'name' ? 10 : 0,
                borderTopRightRadius: key === 'name' ? 10 : 0
              }
            ]}
            key={`${index} ${key}`}
            value={String(item[key])}
            onChangeText={(value) => handleInputChange(index, key, value)}
            placeholder={key}
            placeholderTextColor={'white'}
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


  const handleExerciseCreation = async () => {
    const hasEmptyValue = exercises.some(obj => Object.values(obj).some(value => value === ''));
    if (hasEmptyValue) {
      alert('One or more values are empty');
      return;
    }

    await storeObjectData(serie, exercises);
    const value = await getStringData(serie);
    console.log('the value is:', value);
    alert('Exercises created!');
  };

  if (exercises.length > 0) {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.flatListIems}
          data={exercises}
          renderItem={renderExercise} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable
            style={[styles.pressable, { marginVertical: 20 }]}
            onPress={handleExerciseCreation}>
            <Text>Create exercises</Text>
          </Pressable>
          <Pressable
            style={[styles.pressable, { width: 100, marginLeft: 8, height: 40 }]}
            onPress={() => {setNumberOfExercises(0); setExercises([]);}}>
            <Text>Redefine exercises</Text>
          </Pressable>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{serie}</Text>
        <SelectList
          boxStyles={{ backgroundColor: 'gray' }}
          inputStyles={{ color: 'white' }}
          dropdownStyles={{ alignItems: 'center' }}
          dropdownTextStyles={{ color: 'white' }}
          setSelected={(val) => setNumberOfExercises(val)}
          maxHeight={450}
          data={data}
          save="value"
          search={false}
          placeholder="N° of series"
        />
        <Pressable
          style={styles.pressable}
          onPress={defineListOfexercises}>
          <Text>Define exercises</Text>
        </Pressable>
      </View>
    );
  }

}

