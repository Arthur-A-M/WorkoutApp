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
        <Pressable onPress={() => navigation.navigate('SeriesSelectionCreation', { email: email })}>
          <Text>Go to SeriesSelectionCreation Screen</Text>
        </Pressable>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Pressable onPress={goToWorkoutScreen}>
          <Text>Go to Workout Screen</Text>{/**will break the app if accessed before series is defined */}
        </Pressable>
        <Pressable onPress={() => navigation.navigate('HIIT')}>
          <Text>Go to HIIT Screen</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('SeriesNamesCreation', { email: email })}>
          <Text>Go to SeriesNamesCreation Screen</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('SeriesSelectionCreation', { series: series })}>
          <Text>Go to SeriesSelectionCreation Screen</Text>
        </Pressable>
      </View>
    );
  }
}

