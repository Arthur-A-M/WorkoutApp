import { Text, Pressable, View } from 'react-native';
import React from 'react';

import { unifiedStyles } from '../../../Styles/styles';

import { styles } from './styles';

export default function SeriesSelectionCreation({ navigation, route }) {
  const { series } = route.params;

  const navigateToExercisesCreation = (serie) => {
    navigation.navigate('ExercisesCreation', { serie: serie });
  };

  return (
    <View style={[unifiedStyles.container, { justifyContent: 'space-around' }]}>
      {series.map((item) => (
        <Pressable
          key={item}
          style={[unifiedStyles.containedView, styles.pressable, { width: '90%', }]}
          onPress={() => navigateToExercisesCreation(item)}
        >
          <Text style={styles.text}>{item}</Text>
        </Pressable>
      ))}
    </View>
  );
}
