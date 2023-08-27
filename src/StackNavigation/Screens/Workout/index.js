import { Text, View, Pressable, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons';

import { ReturnTime, storeObjectData, getObjectData } from '../../../Functions';
import { Colors } from '../../../Styles/Colors';
import { unifiedStyles } from '../../../Styles/styles';

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

  function hash(str) {
    let hashValue = 0;
    for (let i = 0; i < str.length; i++) {
      hashValue = (hashValue << 5) - hashValue + str.charCodeAt(i);
      hashValue &= hashValue; // Convert to 32-bit integer
    }
    return String(hashValue);
  }

  const toggleCheck = (index) => {
    const checkedTemp = [...checkedExercises];
    checkedTemp[index] = !checkedTemp[index];
    setCheckedExercises(checkedTemp);
    storeObjectData(storageKey, checkedTemp);
  };

  const renderExercise = ({ item, index }) => (
    <View
      key={item[0]}
      style={styles.pressableExercises}
    >
      <Text style={[styles.text, { marginTop: 10 }]}>{item.name}</Text>
      <Pressable
      style={{width: 70, height: 70, borderColor: Colors.genericColors.clear, borderWidth: 1, marginHorizontal: 25}}
        onLongPress={() => toggleCheck(index)}
        delayLongPress={200}
      >
        {checkedExercises[index] ? (

          <Text style={[styles.text, { fontSize: 50 }]}>{'\u2714'}</Text>

        ) : null}
      </Pressable>
      <View style={styles.viewData}>
        <View style={styles.viewDataType}>
          <Text style={styles.text}>Reps</Text>
          <Text style={styles.text}>{item.repetitions}</Text>
        </View>
        <View style={[styles.viewDataType, { borderLeftWidth: 1, borderRightWidth: 1 }]}>
          <Text style={styles.text}>Series</Text>
          <Text style={styles.text}>{item.series}</Text>
        </View>
        <View style={styles.viewDataType}>
          <Text style={styles.text}>Load</Text>
          <Text style={styles.text}>{item.load}Kg</Text>
        </View>
      </View>
    </View>
  );

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

  const renderTimerIcon = () => {
    if (timerRunning) {
      return <Entypo name="controller-stop" size={30} color={Colors.coreColors.main} />;
    } else {
      return <AntDesign name="play" size={30} color={Colors.coreColors.main} />;
    }
  };

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
        {renderTimerIcon()}
        <Text style={[styles.text, { fontSize: 35, marginRight: 10 }]}>{renderTimerText()}</Text>
      </Pressable>
    </View>
  );
}

