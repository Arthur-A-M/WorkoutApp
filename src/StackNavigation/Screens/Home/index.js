import { Text, View, Pressable } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';
import { sessions } from '../Workout/data';

export default function HomeScreen({ navigation }) {

  const Series = ['Serie A', 'Serie B', 'Serie C'];
  const storeData = async () => {
    try {
      for (let i = 0; i < Series.length; i++) {
        const jsonGetValue = await AsyncStorage.getItem(`${Series[i]}`);
        if (!jsonGetValue) {
          const jsonValue = JSON.stringify(sessions[i].exercises);
          await AsyncStorage.setItem(Series[i], jsonValue);
          alert('Session saved!');
        }
      }
      return navigation.navigate('Workout');
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <View style={styles.container}>
      <Pressable onPress={storeData}>
        <Text>Go to Workout Screen</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('HIIT')}>
        <Text>Go to HIIT Screen</Text>
      </Pressable>
    </View>
  );
}

