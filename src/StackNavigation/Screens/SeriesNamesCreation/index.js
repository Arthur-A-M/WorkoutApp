import { Text, View, Pressable, FlatList, TextInput } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';

import { storeObjectData } from '../../../Functions';

import { styles } from './styles';

export default function SeriesNamesCreationScreen({ navigation, route }) {
  const [numberOfSeries, setNumberOfSeries] = useState(0);
  const [namesConfirmed, setNamesConfirmed] = useState(false);
  const [seriesNames, setSeriesNames] = useState([]);

  const { email } = route.params;

  const defineListOfNames = useCallback(() => {
    const updatedSeriesNames = Array.from({ length: numberOfSeries }, () => '');
      alert('Please enter a name for each series.');
      setSeriesNames(updatedSeriesNames);
      setNamesConfirmed(true);
  }, [numberOfSeries]);

  const handleInputChange = useCallback((index, value) => {
    setSeriesNames((prevState) => {
      const updatedSeriesNames = [...prevState];
      updatedSeriesNames[index] = value;
      return updatedSeriesNames;
    });
  }, []);

  const checkInteger = (value) => {
    if (isNaN(parseInt(value))) {
      return false;
    } else {
      setNumberOfSeries(parseInt(value));
      return true;
    }
  };

  const renderExercise = useCallback(({ item, index }) => (
    <TextInput
      style={styles.textInput}
      key={index}
      value={item}
      onChangeText={(value) => handleInputChange(index, value)}
    />
  ), [handleInputChange]);

  const createSeries = useCallback(async () => {
    try {
      const isValid = seriesNames.every(name => name !== ''); // Check if no empty strings in seriesNames
      if (!isValid) {
        alert('Please enter a name for each series.');
        return;
      }
      const uniqueNames = [...new Set(seriesNames)]; // Create a new Set to remove duplicates
      if (uniqueNames.length !== seriesNames.length) {
        alert('Please enter unique names for each series.');
        return;
      }
      await storeObjectData(email, seriesNames);
      alert(`Serie: created, under the login ${email} !`);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  }, [email, seriesNames, navigation]);
  
  

  useEffect(() => {
    console.log(seriesNames);
  }, [seriesNames]);

  useEffect(() => {
    console.log('email is:', email);
  }, []);

  if (namesConfirmed) {
    console.log('numberOfSeries is:', numberOfSeries);
    return (
      <View style={styles.container}>
        <Pressable onPress={createSeries}>
          <Text>Create series</Text>
        </Pressable>
        <FlatList data={seriesNames} renderItem={renderExercise} />
      </View>
    );
  } else {
    console.log('numberOfSeries is:', numberOfSeries);
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(value) => checkInteger(value)}
          keyboardType="numeric"
          maxLength={1}
        />
        <Pressable
          onPress={() => {
            if (checkInteger(numberOfSeries)) {
              defineListOfNames();
            } else {
              alert('Please enter a valid number of series.');
            }
          }}
        >
          <Text>Create name inputs</Text>
        </Pressable>
      </View>
    );
  }
}
