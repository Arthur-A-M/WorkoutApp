import { Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import { Colors } from '../Styles/Colors';
import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';

export const ExerciseButton = ({ type, onPress }) => {
    const imageSource = type === "ResistenceTrainning" 
        ? require("../../assets/ResistenceTrainning.jpg")
        : require("../../assets/HIIT.jpg");

    return (
        <Pressable
            style={({ pressed }) => [
                styles.pressableStartingExercises,
                pressed && styles.pressableStartingClicked,
            ]}
            onPress={onPress}
        >
            <View style={styles.viewStartingExercise}>
                <Image source={imageSource} style={styles.imageStartingExercises} />
                <Text style={styles.textStartingExercises}>
                    {type === "ResistenceTrainning" ? "Resistence" : "Cardio"}
                </Text>
                <AntDesign name="rightcircle" size={45} color={Colors.coreColors.main} />
            </View>
        </Pressable>
    );
};
