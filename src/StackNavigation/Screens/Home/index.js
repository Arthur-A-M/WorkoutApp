import { Text, View, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

import { getStringData } from '../../../Functions';

import { styles } from './styles';

export default function HomeScreen({ navigation, route }) {
  const [localDataChecked, setLocalDataChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [series, setSeries] = useState([]);

  const { login } = route.params;

  useEffect(() => {
    async function fetchData() {
      const response = await getStringData(login);
      if (response) {
        setLocalDataChecked(true);
        setSeries(JSON.parse(response));
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (series.length > 0) {
      setIsLoading(false);
    }
  }, [series]);

  const goToWorkoutScreen = () => {
    if (localDataChecked) {
      navigation.navigate('WorkoutSeries', { series: series });
    } else {
      alert('No session found!');
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Pressable onPress={goToWorkoutScreen}>
            <Text>Go to Workout Screen</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('HIIT')}>
            <Text>Go to HIIT Screen</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('SeriesNamesCreation')}>
            <Text>Go to SeriesNamesCreation Screen</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('SeriesExercisesCreation', { login: login })}>
            <Text>Go to SeriesExercisesCreation Screen</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

