import { Text, 
  View, 
  Pressable, 
  Image, 
  TextInput, 
  Modal } from 'react-native';
import React from 'react';
import { Colors } from '../Styles/Colors';
import { AntDesign, Entypo } from '@expo/vector-icons';

import { styles } from './styles';

import { unifiedStyles } from '../Styles/styles';

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
    const maxLength = key === 'name' ? 30 : 3;

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
        maxLength={maxLength}
      />
    );
  };

  return (
    <View style={styles.viewTextInput}>
      {Object.keys(item).map((key) => renderTextInput(key))}
    </View>
  );
};


export const renderTimerIcon = (timerRunning) => {
  if (timerRunning) {
    return <Entypo name="controller-stop" size={30} color={Colors.coreColors.main} />;
  } else {
    return <AntDesign name="play" size={30} color={Colors.coreColors.main} />;
  }
};

export const Warning = ({ visible, onPress, onRequestClose }) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onRequestClose}
  >
    <View style={unifiedStyles.containedView}>
      <View style={unifiedStyles.modalView}>
        <Text style={unifiedStyles.bigText}>Some values are empity</Text>
        <Pressable
          style={[unifiedStyles.pressableMainColor, unifiedStyles.pressable]}
          onPress={onPress}>
          <Text>Continue Filling</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
  );
}