import { Text, View, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { storeData, getExerciseArray, getStringData } from '../../../Functions'

import { styles } from './styles';
import { sessions } from '../Workout/data';

export default function HomeScreen({ navigation }) {
  const [localDataChecked, setLocalDataChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const Series = ['Serie A', 'Serie B', 'Serie C'];

  const storeData = async () => {
    try {
      for (let i = 0; i < Series.length; i++) {
        const jsonGetValue = await AsyncStorage.getItem(`${Series[i]}`);
        if (!jsonGetValue) {
          const jsonValue = JSON.stringify(sessions[i].exercises);
          await AsyncStorage.setItem(Series[i], jsonValue);
          alert('Session saved!');
        }
      }
      return navigation.navigate('Workout');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function fetchData() {
      let arr = [];
      for (let i = 0; i < Series.length; i++) {
        const response = await getStringData(`${Series[i]}`);
        arr.push(response);
      }
      if (arr[0] && arr[1] && arr[2]) {
        setLocalDataChecked(true);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Pressable
            onPress={localDataChecked ? () => navigation.navigate('Workout') : () => storeData()}
          >
            <Text>Go to Workout Screen</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('HIIT')}>
            <Text>Go to HIIT Screen</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

