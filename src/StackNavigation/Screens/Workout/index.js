import { Text, View, Pressable, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons';

import { ReturnTime } from '../../../Functions';
import { Colors } from '../../../Styles/Colors';

import { styles } from './styles';


export default function WorkoutScreen({ route }) {
  const [checkedExercises, setCheckedExercises] = useState([]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [time, setTime] = useState(0);

  const { exercises } = route.params;

  useEffect(() => {
    const checkedTemp = Array(exercises?.length || 0).fill(false);
    setCheckedExercises(checkedTemp);
  }, []);

  const toggleCheck = (index) => {
    const checkedTemp = [...checkedExercises];
    checkedTemp[index] = !checkedTemp[index];
    setCheckedExercises(checkedTemp);
  };

  const renderExercise = ({ item, index }) => (
    <Pressable
      key={item[0]}
      onLongPress={() => toggleCheck(index)}
      delayLongPress={300}
      style={styles.pressableExercises}
    >
      <Text style={[styles.text, { marginTop: 10 }]}>{item.name}</Text>
      {checkedExercises[index] ? (
        <Text style={[styles.text, { fontSize: 50 }]}>{'\u2714'}</Text>
      ) : null}
      <View style={styles.viewData}>
        <View style={styles.viewDataType}>
          <Text style={styles.text}>Reps</Text>
          <Text style={styles.text}>{item.repetitions}</Text>
        </View>
        <View style={[styles.viewDataType, { borderLeftWidth: 1, borderRightWidth: 1 }]}>
          <Text style={styles.text}>Séries</Text>
          <Text style={styles.text}>{item.series}</Text>
        </View>
        <View style={styles.viewDataType}>
          <Text style={styles.text}>Carga</Text>
          <Text style={styles.text}>{item.load}</Text>
        </View>
      </View>
    </Pressable>
  );

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
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
      return 'Descansar';
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ alignItems: 'center' }}
        data={exercises}
        horizontal
        renderItem={renderExercise}
      />
      <Pressable style={styles.pressableTimer} onPress={() => setTimerRunning(!timerRunning)}>
        {renderTimerIcon()}
        <Text style={[styles.text, { fontSize: 35 }]}>{renderTimerText()}</Text>
      </Pressable>
    </View>
  );
}

