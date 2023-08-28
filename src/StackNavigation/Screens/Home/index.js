import { Text, View, Pressable, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

import { getStringData } from '../../../Functions';
import { unifiedStyles } from '../../../Styles/styles';
import { ExerciseButton } from '../../../Components';

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
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const goToWorkoutScreen = () => {
    if (localDataChecked) {
      navigation.navigate('WorkoutSeries', { series });
    }
  };

  if (isLoading) {
    return (
      <View style={unifiedStyles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!localDataChecked) {
    return (
      <View style={unifiedStyles.container}>
        <Pressable
          style={({ pressed }) => [
            styles.pressableCreatingExercises,
            pressed && styles.pressableCreatingClicked,
          ]}
          onPress={() =>
            navigation.navigate('SeriesNamesCreation', { email })
          }
        >
          <Text style={styles.textExercises}>Create New Series</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={unifiedStyles.container}>
      <View
        style={[unifiedStyles.containedView, { justifyContent: "space-around" }]}
      >
        <ExerciseButton
          type={"ResistenceTrainning"}
          onPress={goToWorkoutScreen}
        />
        <ExerciseButton
         type={"Cardio"} 
         onPress={() => navigation.navigate('Cardio', { email })}
         />
      </View>
      <View style={styles.viewCreatingExercises}>
        <Pressable
          style={({ pressed }) => [
            styles.pressableCreatingExercises,
            pressed && styles.pressableCreatingClicked,
          ]}
          onPress={() =>
            navigation.navigate('SeriesNamesCreation', { email })
          }
        >
          <Text style={styles.textExercises}>Create New Series</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.pressableCreatingExercises,
            pressed && styles.pressableCreatingClicked,
          ]}
          onPress={() =>
            navigation.navigate('SeriesSelectionCreation', { series })
          }
        >
          <Text style={styles.textExercises}>Edit Exercises</Text>
        </Pressable>
      </View>
    </View>
  );
}

