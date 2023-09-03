import {
  Text,
  View,
  Pressable,
  FlatList,
  TextInput
} from 'react-native';
import React,
{
  useState,
  useEffect,
  useCallback
} from 'react';

import { SelectList } from 'react-native-dropdown-select-list'

import { storeObjectData, checkInteger } from '../../../Functions';
import { Warning } from '../../../Components';
import { Colors } from '../../../Styles/Colors';
import { unifiedStyles } from '../../../Styles/styles';

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
      <View style={[unifiedStyles.container, { justifyContent: 'space-between' }]}>
        <Warning
          warning={badValue}
          visible={modal}
          onPress={() => setBadValue('')}
          onRequestClose={() => setBadValue('')}
          buttonText='Continue filling'
        />
        <FlatList
          contentContainerStyle={styles.flatListIems}
          data={seriesNames}
          renderItem={renderExercise}
          style={styles.flatListTextInput}
        />
        <Pressable
          style={[unifiedStyles.pressableMainColor, unifiedStyles.pressable]}
          onPress={createSeries}>
          <Text style={styles.textpressable}>Create series</Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={unifiedStyles.container}>
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
          style={[unifiedStyles.pressableMainColor, unifiedStyles.pressable]}
          onPress={() => {
            if (checkInteger(numberOfSeries) && numberOfSeries > 0) {
              defineListOfNames();
            }
          }}
        >
          <Text style={styles.textpressable}>Choose names</Text>
        </Pressable>
      </View>
    );
  }
}
