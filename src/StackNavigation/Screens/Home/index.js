import { Text, View, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { storeData, getExerciseArray, getStringData } from '../../../Functions';

import { styles } from './styles';
import { sessions, login } from '../Workout/data';

export default function HomeScreen({ navigation }) {
  const [localDataChecked, setLocalDataChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getStringData(`${login}`);
      if (response) {
        setLocalDataChecked(true);
        setSeries(JSON.parse(response));
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (series) {
      setIsLoading(false);
    }
  },[series]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Pressable
            onPress={localDataChecked ? 
              () => navigation.navigate('Workout', { series: series }) 
              : alert('No session found!')}//Buggued alerts even when there os a session
          >
            <Text>Go to Workout Screen</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('HIIT')}>
            <Text>Go to HIIT Screen</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('SeriesNamesCreation')}>
            <Text>Go to SeriesNamesCreation Screen</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('SeriesExercisesCreation')}>
            <Text>Go to SeriesExercisesCreation Screen</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

