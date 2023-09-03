import {
  Keyboard,
  Text,
  View,
  Pressable,
  FlatList
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { SelectList } from 'react-native-dropdown-select-list';

import { storeObjectData, getStringData } from '../../../Functions';
import { renderExercise, Warning } from '../../../Components';
import { Colors } from '../../../Styles/Colors';
import { unifiedStyles } from '../../../Styles/styles';


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

  const defineListOfexercises = () => {
    const updatedExercises = Array.from({ length: numberOfExercises }, () => ({
      name: '',
      repetitions: '',
      series: '',
      load: '',
      rest: '',
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
        <Warning
          warning='Some values are empity'
          visible={empityValue}
          onPress={() => setEmpityValue(!empityValue)}
          onRequestClose={() => setEmpityValue(!empityValue)}
          buttonText='Continue filling'
          confirmation={false}
          secundaryText='Eu estou aqui'
          onPressSecundary={() => setEmpityValue(!empityValue)}
        />
        <FlatList
          data={exercises}
          renderItem={({ item, index }) => renderExercise({ item, index, onChangeText: handleInputChange, Keyboard: Keyboard.dismiss })}
        />
        {keyboardStatus ? null
          : <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable
              style={[[unifiedStyles.pressableMainColor, unifiedStyles.pressable], { marginVertical: 20 }]}
              onPress={handleExerciseCreation}>
              <Text>Create exercises</Text>
            </Pressable>
            <Pressable
              style={[[unifiedStyles.pressableMainColor, unifiedStyles.pressable], { width: 100, marginLeft: 8, height: 40 }]}
              onPress={() => { setNumberOfExercises(0); setExercises([]); }}>
              <Text>Redefine exercises</Text>
            </Pressable>
          </View>}
      </View>
    );
  } else if (!created) {
    return (
      <View style={unifiedStyles.container}>
        <Text style={unifiedStyles.bigText}>{serie}</Text>
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
          style={[unifiedStyles.pressableMainColor, unifiedStyles.pressable]}
          onPress={defineListOfexercises}>
          <Text>Define exercises</Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={unifiedStyles.container}>
        <Warning
          warning={serie + '\nCreated'}
          visible={true}
          onPress={navigation.goBack}
          onRequestClose={() => setCreated(false)}
          buttonText='Finish'
          confirmation={true}
          secundaryText='Edit more'
          onPressSecundary={() => setCreated(false)}
        />
      </View>
    )
  }
}

