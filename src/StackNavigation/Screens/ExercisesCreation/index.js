import { Keyboard, Text, View, Pressable, TextInput, FlatList, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';

import { SelectList } from 'react-native-dropdown-select-list';

import { storeObjectData, getStringData } from '../../../Functions';
import { Colors } from '../../../Styles/Colors';
import { unifiedStyles } from '../../../Styles/styles';

import { styles } from './styles';

export default function ExercisesCreationScreen({ navigation, route }) {
  const [numberOfExercises, setNumberOfExercises] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [created, setCreated] = useState(false);
  const [empityValue, setEmpityValue] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  const { serie } = route.params;

  useEffect(() => {
    initialRender();
  }, []);

  const initialRender = async () => {
    const value = await getStringData(serie);
    if (value) {
      setExercises(JSON.parse(value));
    }
  }

  const handleInputChange = (index, key, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][key] = value;
    setExercises(updatedExercises);
  };

  const renderExercise = ({ item, index }) => {
    return (
      <View style={styles.viewTextInput}>
        {Object.keys(item).map((key) => (
          <TextInput
            style={[
              styles.textInput,
              {
                borderBottomLeftRadius: key === 'load' ? 10 : 0,
                borderBottomRightRadius: key === 'load' ? 10 : 0,
                borderTopLeftRadius: key === 'name' ? 10 : 0,
                borderTopRightRadius: key === 'name' ? 10 : 0
              }
            ]}
            key={`${index} ${key}`}
            value={String(item[key])}
            onChangeText={(value) => handleInputChange(index, key, value)}
            placeholder={key === 'load' ? 'load in kg' : key}
            placeholderTextColor={Colors.genericColors.clear}
            keyboardType={key === 'name' ? 'default' : 'numeric'}
            onSubmitEditing={Keyboard.dismiss}
          />
        ))}
      </View>
    );
  };

  const defineListOfexercises = () => {
    const updatedExercises = Array.from({ length: numberOfExercises }, () => ({
      name: '',
      repetitions: '',
      series: '',
      load: '',
    }));
    setExercises(updatedExercises);
  };


  const handleExerciseCreation = async () => {
    const hasEmptyValue = exercises.some(obj => Object.values(obj).some(value => value === ''));
    if (hasEmptyValue) {
      return setEmpityValue(true);
    }

    await storeObjectData(serie, exercises);
    const value = await getStringData(serie);
    if (value) {
      setCreated(true);
    }
  };

  if (exercises.length > 0 && !created) {
    return (
      <View style={unifiedStyles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={empityValue}
          onRequestClose={() => setEmpityValue(!empityValue)}
        >
          <View style={unifiedStyles.containedView}>
            <View style={styles.modalView}>
              <Text style={styles.text}>Some values are empity</Text>
              <Pressable
                style={[unifiedStyles.pressableMainColor, styles.pressable]}
                onPress={() => setEmpityValue(!empityValue)}>
                <Text>Continue Filling</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <FlatList
          data={exercises}
          renderItem={renderExercise} />
        {keyboardStatus ? null
          : <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable
              style={[[unifiedStyles.pressableMainColor, styles.pressable], { marginVertical: 20 }]}
              onPress={handleExerciseCreation}>
              <Text>Create exercises</Text>
            </Pressable>
            <Pressable
              style={[[unifiedStyles.pressableMainColor, styles.pressable], { width: 100, marginLeft: 8, height: 40 }]}
              onPress={() => { setNumberOfExercises(0); setExercises([]); }}>
              <Text>Redefine exercises</Text>
            </Pressable>
          </View>}
      </View>
    );
  } else if (!created) {
    return (
      <View style={unifiedStyles.container}>
        <Text style={styles.text}>{serie}</Text>
        <SelectList
          boxStyles={{ backgroundColor: Colors.genericColors.grayish }}
          inputStyles={{ color: Colors.genericColors.clear }}
          dropdownStyles={{ alignItems: 'center' }}
          dropdownTextStyles={{ color: Colors.genericColors.clear }}
          setSelected={(val) => setNumberOfExercises(val)}
          maxHeight={450}
          data={data}
          save="value"
          search={false}
          placeholder="N° of series"
        />
        <Pressable
          style={[unifiedStyles.pressableMainColor, styles.pressable]}
          onPress={defineListOfexercises}>
          <Text>Define exercises</Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={unifiedStyles.container}>
        <View style={styles.viewCreated}>
          <Text style={[styles.text, { marginTop: 25 }]}>{serie}{'\n'}Created</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable
              style={[unifiedStyles.containedView, styles.pressableCreated, { borderBottomLeftRadius: 20 }]}
              onPress={navigation.goBack}>
              <Text>Finish</Text>
            </Pressable>
            <Pressable
              style={[unifiedStyles.containedView, styles.pressableCreated, { borderBottomRightRadius: 20 }]}
              onPress={() => setCreated(false)}>
              <Text>Edit more</Text>
            </Pressable>
          </View>
        </View>
      </View>
    )
  }
}

