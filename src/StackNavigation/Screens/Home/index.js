import { Text, View, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

import { getStringData } from '../../../Functions';

import { styles } from './styles';

export default function HomeScreen({ navigation, route }) {
  const [localDataChecked, setLocalDataChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [series, setSeries] = useState([]);

  const { login } = route.params;// a variavel agora irá se chamar email

  useEffect(() => {
    async function fetchData() {
      const response = await getStringData(login);
      if (response) {
        setLocalDataChecked(true);
        setIsLoading(false); // temporario
        setSeries(JSON.parse(response));
        console.log('response is:', response);
      } else if (response === null || response === []) {
        setLocalDataChecked(true);
        setIsLoading(false); //temporario
        alert('No session found!');
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
            <Text>Go to Workout Screen</Text>{/**will break the app if accessed before series is defined */}
          </Pressable>
          <Pressable onPress={() => navigation.navigate('HIIT')}>
            <Text>Go to HIIT Screen</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('SeriesNamesCreation', { login: login })}>
            <Text>Go to SeriesNamesCreation Screen</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('SeriesExercisesCreation', { login: login })}>
            <Text>Go to SeriesExercisesCreation Screen</Text>{/**will break the app if accessed before series names is defined */}
          </Pressable>
        </View>
      )}
    </View>
  );
}

