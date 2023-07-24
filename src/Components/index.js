import { Text, View, Pressable, Image } from 'react-native';
import React, {useState} from 'react';
import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';

export default function PressableStarting({ textString = 'text', onPress = null }) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressableStartingExercises,
        pressed && styles.pressableStartingClicked,
      ]}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}>
      <View style={styles.viewStartingExercise}>
        <Image
          source={require('../../assets/HIIT.jpg')}
          style={styles.imageStartingExercises}
        />
        <Text style={styles.textStartingExercises}>{textString}</Text>
        <AntDesign name="rightcircle" size={45} color="#e0fe10" />
      </View>
    </Pressable>
  );
}
