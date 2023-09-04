import {
  Text,
  View,
  Pressable,
  FlatList
} from 'react-native';
import React, { useState, useEffect } from 'react';

import {
  ReturnTime,
  storeObjectData,
  getObjectData,
  hash
} from '../../../Functions';
import { unifiedStyles } from '../../../Styles/styles';
import { renderTimerIcon, Warning } from '../../../Components';

import { styles } from './styles';

import { useKeepAwake, activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";

export default function WorkoutScreen({ route }) {
  const [exercisesCounters, setExercisesCounters] = useState([]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [realtime, setRealTime] = useState([0, 0]);
  const [confirmation, setConfirmation] = useState([false, 0, 0]);
  const [currentRest, setCurrentRest] = useState(0);

  const { exercises } = route.params;

  const storageKey = hash(JSON.stringify(exercises));

  useEffect(() => {
    const enableKeepAwake = async () => {
        await activateKeepAwakeAsync();
    }
    if (timerRunning) {
        enableKeepAwake();
    } else {
        deactivateKeepAwake();
    }
}, [timerRunning]);

  useEffect(() => {
    async function fetchData() {
      const checkedTemp = await getObjectData(storageKey);
      setExercisesCounters(checkedTemp || []);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(exercisesCounters);
  }, [exercisesCounters]);

  const updateCheck = (index, series, rest=0) => {
    const checkedTemp = [...exercisesCounters];
    if (typeof checkedTemp[index] === 'number') {
      if (checkedTemp[index] >= series && !confirmation[0]) {
        setConfirmation([true, index, series]);
      }else if (checkedTemp[index] >= series && confirmation[0]) {
        setConfirmation([false, 0, 0]);
        checkedTemp[index] = 0;
      }
      else {
        checkedTemp[index] = checkedTemp[index] + 1;
        setCurrentRest(rest);
      }
    } else {
      checkedTemp[index] = 1;
    }
    setExercisesCounters(checkedTemp);
    storeObjectData(storageKey, checkedTemp);
  };

  const renderExercise = ({ item, index }) => {
    const { name, series, repetitions, rest, load } = item;
    const chekingCounter = exercisesCounters[index];

    return (
      <View key={item[0]} style={styles.viewExercise}>
        <Text style={[styles.text, { marginTop: 10 }]}>{name}</Text>
        <Pressable
          style={styles.seriesPressable}
          onPress={() => updateCheck(index, Number(item.series), Number(item.rest))}
        >
          {chekingCounter >= Number(item.series) ?
            <Text style={[styles.text, { fontSize: 50 }]}>{'\u2714'}</Text> :
            <Text style={[styles.text, { fontSize: 50 }]}>{chekingCounter}</Text>}
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
      return ReturnTime(time, currentRest);
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
      <Warning 
      warning='You are resetting the exercise counter.'
      visible={confirmation[0]}
      buttonText='Reset counter'
      onPress={() => updateCheck(confirmation[1], confirmation[2])}
      secundaryText='Leave it done'
      onPressSecundary={() => setConfirmation([false, 0, 0])}
      />
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

