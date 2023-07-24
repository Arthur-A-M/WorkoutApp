import { Text, View, Pressable, FlatList, TextInput, Modal } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';

import { SelectList } from 'react-native-dropdown-select-list'

import { storeObjectData, checkInteger } from '../../../Functions';
import { Colors } from '../../../Styles/Colors';

import { styles } from './styles';

export default function SeriesNamesCreationScreen({ navigation, route }) {
  const [numberOfSeries, setNumberOfSeries] = useState(0);
  const [namesConfirmed, setNamesConfirmed] = useState(false);
  const [seriesNames, setSeriesNames] = useState([]);
  const [badValue, setBadValue] = useState('');
  const [modal, setModal] = useState(false);


  const data = [1, 2, 3, 4, 5];

  const { email } = route.params;

  const defineListOfNames = useCallback(() => {
    const updatedSeriesNames = Array.from({ length: numberOfSeries }, () => '');
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

  const renderExercise = useCallback(({ item, index }) => (
    <TextInput
      style={styles.textInput}
      key={index}
      value={item}
      onChangeText={(value) => handleInputChange(index, value)}
      placeholder="Serie name"
      maxLength={20}
      placeholderTextColor={Colors.genericColors.clear}
    />
  ), [handleInputChange]);

  const createSeries = useCallback(async () => {
    try {
      const isValid = seriesNames.every(name => name !== '');
      if (!isValid) {
        setBadValue('Please enter a name for each series.');
        return;
      }
      const uniqueNames = [...new Set(seriesNames)];
      if (uniqueNames.length !== seriesNames.length) {
        setBadValue('Please enter unique names for each series.');
        return;
      }
      await storeObjectData(email, seriesNames);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  }, [email, seriesNames, navigation]);

  useEffect(() => {
    return () => {
      setNumberOfSeries(0);
    };
  }, []);

  useEffect(() => {
    if (badValue) {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [badValue]);

  if (namesConfirmed) {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => setBadValue('')}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.text}>{badValue}</Text>
              <Pressable
                style={styles.pressable}
                onPress={() => setBadValue('')}>
                <Text>Continue Filling</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <FlatList
          contentContainerStyle={styles.flatListIems}
          data={seriesNames}
          renderItem={renderExercise}
          style={styles.flatListTextInput}
        />
        <Pressable
          style={styles.pressable}
          onPress={createSeries}>
          <Text style={styles.textpressable}>Create series</Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <SelectList
          boxStyles={{ backgroundColor: Colors.genericColors.grayish }}
          inputStyles={{ color: Colors.genericColors.clear }}
          dropdownStyles={{ alignItems: 'center' }}
          dropdownTextStyles={{ color: Colors.genericColors.clear }}
          setSelected={(val) => setNumberOfSeries(val)}
          maxHeight={300}
          data={data}
          save="value"
          search={false}
          placeholder="N° of series"
        />
        <Pressable
          style={styles.pressable}
          onPress={() => {
            if (checkInteger(numberOfSeries) && numberOfSeries > 0) {
              defineListOfNames();
            } else {
              alert('Please enter a valid number of series.');
            }
          }}
        >
          <Text style={styles.textpressable}>Choose names</Text>
        </Pressable>
      </View>
    );
  }
}
