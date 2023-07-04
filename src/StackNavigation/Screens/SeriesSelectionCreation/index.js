import { Text, View, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

import { getStringData } from '../../../Functions';

import { styles } from './styles';

export default function SeriesSelectionCreation({ navigation, route }) {
  const [seriesNames, setSeriesNames] = useState([]);

  const { login } = route.params;

  useEffect(() => {
    fetchSeriesNames();
  }, []);

  useEffect(() => {
    console.log('seriesNames is:', seriesNames);
  }, [seriesNames]);

  const fetchSeriesNames = async () => {
    const response = await getStringData(`${login}`);
    setSeriesNames(JSON.parse(response));
  };

  const navigateToExercisesCreation = (serieName) => {
    navigation.navigate('ExercisesCreation', { serieName: serieName });
  };

  const renderSeriesNames = () => {
    if (seriesNames.length === 0) {
      return <ActivityIndicator />;
    }
    return seriesNames.map((item, index) => (
      <Pressable
        key={index}
        style={{ backgroundColor: 'red' }}
        onPress={() => navigateToExercisesCreation(item)}
      >
        <Text>{item}</Text>
      </Pressable>
    ));
  };

  return <View style={styles.container}>{renderSeriesNames()}</View>;
}
