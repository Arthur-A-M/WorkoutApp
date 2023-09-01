import { Text, View, Pressable, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

import { ReturnTime, storeObjectData, getObjectData, hash } from '../../../Functions';
import { Colors } from '../../../Styles/Colors';
import { unifiedStyles } from '../../../Styles/styles';
import { renderTimerIcon } from '../../../Components';

import { styles } from './styles';

export default function WorkoutScreen({ route }) {
  const [checkedExercises, setCheckedExercises] = useState([]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [realtime, setRealTime] = useState([0, 0]);

  const { exercises } = route.params;

  const storageKey = hash(JSON.stringify(exercises));

  useEffect(() => {
    async function fetchData() {
      const checkedTemp = await getObjectData(storageKey);
      setCheckedExercises(checkedTemp || []);
    }
    fetchData();
  }, []);

  const toggleCheck = (index) => {
    const checkedTemp = [...checkedExercises];
    checkedTemp[index] = !checkedTemp[index];
    setCheckedExercises(checkedTemp);
    storeObjectData(storageKey, checkedTemp);
  };

const renderExercise = ({ item, index }) => {
  const { name, series, repetitions, rest, load } = item;
  const isChecked = checkedExercises[index];

  return (
    <View key={item[0]} style={styles.viewExercise}>
      <Text style={[styles.text, { marginTop: 10 }]}>{name}</Text>
      <Pressable
        style={styles.seriesPressable}
        onLongPress={() => toggleCheck(index)}
        delayLongPress={200}
      >
        {isChecked && <Text style={[styles.text, { fontSize: 50 }]}>{'\u2714'}</Text>}
      </Pressable>
      <View>
        <Text style={styles.text}>Series</Text>
        <Text style={styles.text}>{series}</Text>
      </View>
      <View style={styles.viewData}>
        {['Reps', 'Rest', 'Load'].map((label) => (
          <View key={label} style={styles.viewDataType}>
            <Text style={styles.text}>{label}</Text>
            <Text style={styles.text}>
              {label === 'Reps' ? repetitions : label === 'Rest' ? `${rest}s` : `${load}Kg`}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        const dateObj = new Date();
        newTime = ((dateObj.getMinutes() - realtime[0]) * 60) + (dateObj.getSeconds() - realtime[1])
        setTime(newTime);
      }, 1000);
    } else {
      setTime(0);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const renderTimerText = () => {
    if (timerRunning) {
      return ReturnTime(time);
    } else {
      return 'Resting';
    }
  };

  const operateTimer = () => {
    const dateObj = new Date();

    if (!timerRunning) {
      setTimerRunning(true);
      setRealTime([dateObj.getMinutes(), dateObj.getSeconds()]);
    } else {
      setTimerRunning(false);
      setRealTime([0, 0]);
    }
  }

  return (
    <View style={unifiedStyles.container}>
      <FlatList
        contentContainerStyle={{ alignItems: 'center' }}
        data={exercises}
        horizontal
        renderItem={renderExercise}
      />
      <Pressable style={styles.pressableTimer} onPress={() => operateTimer()}>
        {renderTimerIcon(timerRunning)}
        <Text style={[styles.text, { fontSize: 35, marginRight: 10 }]}>{renderTimerText()}</Text>
      </Pressable>
    </View>
  );
}

