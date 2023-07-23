import { Text, View, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

import { getStringData } from '../../../Functions';
import { pressableStarting } from '../../../Components';

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
      } else {
        alert('No session found!');
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const goToWorkoutScreen = () => {
    if (localDataChecked) {
      navigation.navigate('WorkoutSeries', { series });
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
  }

  if (!localDataChecked) {
    return (
      <View style={styles.container}>
        <Pressable
          style={({ pressed }) => [
            styles.pressableCreatingExercises,
            pressed && styles.pressableCreatingClicked,
          ]}
          onPress={() => navigation.navigate('SeriesNamesCreation', { email })}>
          <Text style={styles.textExercises}>Create New Series</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewStartingExercises}>
        <pressableStarting
          imgaString={'ResistenceTrainning.jpg'}
          textString={'GYM\nResistence Trainning'}
          onPress={goToWorkoutScreen}
        />
        <pressableStarting
          imgaString={'HIIT.jpg'}
          textString={'HIIT'}
          onPress={() => navigation.navigate('HIIT')}
        />
      </View>
      <View style={styles.viewCreatingExercises}>
        <Pressable
          style={({ pressed }) => [
            styles.pressableCreatingExercises,
            pressed && styles.pressableCreatingClicked,
          ]}
          onPress={() => navigation.navigate('SeriesNamesCreation', { email })}>
          <Text style={styles.textExercises}>Create New Series</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.pressableCreatingExercises,
            pressed && styles.pressableCreatingClicked,
          ]}
          onPress={() => navigation.navigate('SeriesSelectionCreation', { series })}>
          <Text style={styles.textExercises}>Edit Exercises</Text>
        </Pressable>
      </View>
    </View>
  );
}

