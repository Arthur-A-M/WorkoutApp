import { Text, Pressable, View } from 'react-native';
import React from 'react';

import { styles } from './styles';

export default function SeriesSelectionCreation({ navigation, route }) {
  const { series } = route.params;

  const navigateToExercisesCreation = (serie) => {
    navigation.navigate('ExercisesCreation', { serie: serie });
  };

  return (
    <View style={styles.container}>
      {series.map((item) => (
        <Pressable
          key={item}
          style={styles.pressable}
          onPress={() => navigateToExercisesCreation(item)}
        >
          <Text style={styles.text}>{item}</Text>
        </Pressable>
      ))}
    </View>
  );
}
