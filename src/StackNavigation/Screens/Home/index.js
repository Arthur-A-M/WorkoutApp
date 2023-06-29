import { Text, View, Pressable } from 'react-native';
import React from 'react';

import { styles } from './styles';

export default function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate('Workout')}>
          <Text>Go to Workout Screen</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('HIIT')}>
          <Text>Go to HIIT Screen</Text>
        </Pressable>
      </View>
    );
  }

