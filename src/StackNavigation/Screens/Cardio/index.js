import { Text, View, Pressable, TextInput } from 'react-native';
import React, { useEffect, useState, useCallback, useMemo } from 'react';

import { SelectList } from 'react-native-dropdown-select-list';

import { unifiedStyles } from '../../../Styles/styles';
import { storeObjectData, getObjectData } from '../../../Functions';
import { Colors } from '../../../Styles/Colors';

import { styles } from './styles';

export default function CardioScreen({ navigation, route }) {
  const { email } = route.params;
  const key = `cardio_${email}`;

  const [distances, setDistances] = useState([0, 0, 0]);
  const [isLoading, setIsLoading] = useState(false);
  const [settingGoal, setSettingGoal] = useState(false);
  const [selected, setSelected] = useState('');
  const [distance, setDistance] = useState('0');

  const data = ['Treadmill', 'Rowing', 'Escalator'];

  const settingNewDistance = useCallback(() => {
    let newDistances = [...distances];
    if (selected === 'Treadmill') {
      newDistances[0] = Number(distance);
    }
    if (selected === 'Rowing') {
      newDistances[1] = Number(distance);
    }
    if (selected === 'Escalator') {
      newDistances[2] = Number(distance);
    }
    setDistances(newDistances);
  }, [selected, distance, distances]);

  useEffect(() => {
    const storeData = async () => {
      await storeObjectData(key, distances);
    };
    storeData();
  }, [key, distances]);

  useEffect(() => {
    const fetchData = async () => {
      const newDistances = await getObjectData(key);
      setDistances(newDistances);
    };
    fetchData();
  }, [key]);

  return (
    <View style={unifiedStyles.container}>
      {isLoading ? null : (
        <View>
          <Text style={styles.text}>Treadmill {distances[0]}</Text>
          <Text style={styles.text}>Rowing {distances[1]}</Text>
          <Text style={styles.text}>Escalator {distances[2]}</Text>
        </View>
      )}
      <Pressable onPress={() => setSettingGoal(true)}>
        <Text style={styles.text}>Set goal</Text>
      </Pressable>
      {settingGoal ? (
        <View>
          <SelectList setSelected={setSelected} data={data} save="value" />
          <TextInput
            style={styles.text}
            value={distance}
            onChangeText={setDistance}
            placeholderTextColor={Colors.genericColors.clear}
            placeholder="Distance"
            keyboardType="numeric"
            maxLength={6}
          />
          <Pressable onPress={settingNewDistance}>
            <Text style={styles.text}>Save</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

