import { Text, View, Pressable, Image, TextInput } from 'react-native';
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

export const renderExercise = ({ item, index, onChangeText, keyboard }) => {
  const renderTextInput = (key) => {
    const borderRadius = {
      borderBottomLeftRadius: key === 'rest' ? 10 : 0,
      borderBottomRightRadius: key === 'rest' ? 10 : 0,
      borderTopLeftRadius: key === 'name' ? 10 : 0,
      borderTopRightRadius: key === 'name' ? 10 : 0,
    };

    const placeholder =
      key === 'load' ? 'load in kg' : key === 'rest' ? 'rest in seconds' : key;
    const keyboardType = key === 'name' ? 'default' : 'numeric';

    return (
      <TextInput
        style={[styles.textInput, borderRadius]}
        key={`${index} ${key}`}
        value={String(item[key])}
        onChangeText={(value) => onChangeText(index, key, value)}
        placeholder={placeholder}
        placeholderTextColor={Colors.genericColors.clear}
        keyboardType={keyboardType}
        onSubmitEditing={keyboard}
      />
    );
  };

  return (
    <View style={styles.viewTextInput}>
      {Object.keys(item).map((key) => renderTextInput(key))}
    </View>
  );
};
