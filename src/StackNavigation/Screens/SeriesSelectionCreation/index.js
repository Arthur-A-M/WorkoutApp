import { Text, Pressable } from 'react-native';
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

    return series.map((item) => (
      <Pressable
        key={item}
        style={{ backgroundColor: 'red' }}
        onPress={() => navigateToExercisesCreation(item)}
      >
        <Text>{item}</Text>
      </Pressable>
    ));
}
