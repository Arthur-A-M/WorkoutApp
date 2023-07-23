import { Text, View, Pressable,  Image } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';

export function pressableStarting (imgaString, textString, onPress){
    return (
        <Pressable
            style={({ pressed }) => [
                styles.pressableStartingExercises,
                pressed && styles.pressableStartingClicked,
            ]}
            onPress={onPress}>
            <View style={styles.viewStartingExercise}>
                <Image
                    source={require(`../../assets/${imgaString}`)}
                    style={styles.imageStartingExercises}
                />
                <Text style={styles.textStartingExercises}>{textString}</Text>
                <AntDesign name="rightcircle" size={45} color="#e0fe10" />
            </View>
        </Pressable>
    )
}