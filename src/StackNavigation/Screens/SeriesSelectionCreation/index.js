import { Text, Pressable, View } from 'react-native';
import React, { useEffect} from 'react';

import { styles } from './styles';

export default function SeriesSelectionCreation({ navigation, route }) {
  const { series } = route.params;

  useEffect(() => {
    console.log('series is:', series);
    console.log('series is array:', Array.isArray(series));
  }, []);

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
