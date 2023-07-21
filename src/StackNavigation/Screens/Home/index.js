import { Text, View, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

import { getStringData } from '../../../Functions';

import { styles } from './styles';

export default function HomeScreen({ navigation, route }) {
  const [localDataChecked, setLocalDataChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [series, setSeries] = useState([]);

  const { email } = route.params;

  useEffect(() => {
    async function fetchData() {
      const response = await getStringData(email);
      if (response) {
        setLocalDataChecked(true);
        setSeries(JSON.parse(response));
        console.log('response is:', response);
      } else if (response === null || response === []) {
        alert('No session found!');
      }
    }
    fetchData();
    console.log('series is:', series);
  }, []);

  useEffect(() => {
    console.log('series is:', series);
    console.log('localDataChecked is:', localDataChecked);
    setIsLoading(false);
    console.log('series is array:', Array.isArray(series));
  }, [series]);

  const goToWorkoutScreen = () => {
    if (localDataChecked) {
      navigation.navigate('WorkoutSeries', { series: series });
    } else {
      alert('No session found!');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  } else if (!isLoading && !localDataChecked) {
    return (
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate('SeriesNamesCreation', { email: email })}>
          <Text>Go to SeriesNamesCreation Screen</Text>
        </Pressable>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.viewStartingExercises}>
          <Pressable
            style={({ pressed }) => [
              styles.pressableStartingExercises,
              pressed && {
                opacity: 0.7,
                width: '37%',
                height: 37,
              },
            ]}
            onPress={goToWorkoutScreen}>
            <Text style={styles.textStartingExercises}>GYM{"\n"}Resistence Trainning</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.pressableStartingExercises,
              pressed && {
                opacity: 0.7,
                width: '37%',
                height: 37,
              },
            ]}
            onPress={() => navigation.navigate('HIIT')}>
            <Text style={styles.textStartingExercises}>HIIT</Text>
          </Pressable>
        </View>
        <View style={styles.viewCreatingExercises}>
          <Pressable
            style={({ pressed }) => [
              styles.pressableCreatingExercises,
              pressed && {
                opacity: 0.7,
                width: '37%',
                height: 37,
              },
            ]}
            onPress={() => navigation.navigate('SeriesNamesCreation', { email: email })}>
            <Text style={styles.textExercises}>Create New Series</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.pressableCreatingExercises,
              pressed && {
                opacity: 0.7,
                width: '37%',
                height: 37,
              },
            ]}
            onPress={() => navigation.navigate('SeriesSelectionCreation', { series: series })}>
            <Text style={styles.textExercises}>Edit Exercises</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

