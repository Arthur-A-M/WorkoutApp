import { Text, View, Pressable, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

import { getStringData } from '../../../Functions';
import  PressableStarting  from '../../../Components';
import { Colors } from '../../../Styles/Colors';
import { unifiedStyles } from '../../../Styles/styles';

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
          onPress={() => navigation.navigate('SeriesNamesCreation', { email })}>
          <Text style={styles.textExercises}>Create New Series</Text>
        </Pressable>
      </View>
    );
  }

  if(localDataChecked){
    return (
    <View style={unifiedStyles.container}>
      <View style={[unifiedStyles.containedView, { justifyContent: 'space-around' }]}>
        <Pressable
          style={({ pressed }) => [
            styles.pressableStartingExercises,
            pressed && styles.pressableStartingClicked,
          ]}
          onPress={goToWorkoutScreen}>
          <View style={styles.viewStartingExercise}>
            <Image
              source={require(`../../../../assets/ResistenceTrainning.jpg`)}
              style={styles.imageStartingExercises}
            />
            <Text style={styles.textStartingExercises}>GYM{'\n'}Resistence Training</Text>
            <AntDesign name="rightcircle" size={45} color={Colors.coreColors.main} />
          </View>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.pressableStartingExercises,
            pressed && styles.pressableStartingClicked,
          ]}
          onPress={() => navigation.navigate('Cardio')}>
          <View style={styles.viewStartingExercise}>
            <Image
              source={require(`../../../../assets/HIIT.jpg`)}
              style={styles.imageStartingExercises}
            />
            <Text style={styles.textStartingExercises}>Cardio</Text>
            <AntDesign name="rightcircle" size={45} color={Colors.coreColors.main} />
          </View>
        </Pressable>
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
}

