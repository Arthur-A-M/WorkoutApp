import { Text, View, Pressable, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons';

import { getExerciseArray, ReturnTime } from '../../../Functions';
import { renderExercise } from '../../../Components';

import { styles } from './styles';


export default function WorkoutScreen({ route }) {
  const [workout, setWorkout] = useState('');
  const [checkedExercises, setCheckedExercises] = useState([]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState([]);

  const { series } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [exercises]);

  const fetchExercises = async (newWorkout) => {
    const newExercises = await getExerciseArray(newWorkout);
    setExercises(newExercises);
  }

  useEffect(() => {
    const checkedTemp = Array(exercises?.length || 0).fill(false);
    setCheckedExercises(checkedTemp);
    fetchExercises(workout);
  }, [workout]);

const renderExercise = ({ item, index }) => {
  const toggleCheck = (index) => {
    const checkedTemp = [...checkedExercises];
    checkedTemp[index] = !checkedTemp[index];
    setCheckedExercises(checkedTemp);
  }
  return (
    <Pressable
      key={item[0]}
      onPress={() => toggleCheck(index)}
      style={styles.pressableExercises}
    >
      <Text style={[styles.text, { marginTop: 10 }]}>{item[0]}</Text>
      {checkedExercises[index] ? (
        <Text style={[styles.text, { fontSize: 50 }]}>{'\u2714'}</Text>
      ) : null}
      <View style={styles.viewData}>
        <View style={styles.viewDataType}>
          <Text style={styles.text}>Reps</Text>
          <Text style={styles.text}>{item[1]}</Text>
        </View>
        <View style={[styles.viewDataType, { borderLeftWidth: 1, borderRightWidth: 1 }]}>
          <Text style={styles.text}>Séries</Text>
          <Text style={styles.text}>{item[2]}</Text>
        </View>
        <View style={styles.viewDataType}>
          <Text style={styles.text}>Carga</Text>
          <Text style={styles.text}>{item[3]}</Text>
        </View>
      </View>
    </Pressable>
  );
};

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    else {
      setTime(0);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  return (
    <View style={styles.container}>
      {workout && !isLoading ? (
        <FlatList
          contentContainerStyle={{ alignItems: 'center' }}
          data={exercises}
          horizontal={true}
          renderItem={renderExercise}
        />
      ) :
        (series.map((serie, index) => (
          <Pressable
            style={styles.pressableSeries}
            key={index}
            onPress={() => setWorkout(`${serie}`)}
          >
            <Text style={[styles.text, { fontSize: 35 }]}>{serie}</Text>
          </Pressable>
        ))
        )}
      {workout && !isLoading ? (
        <Pressable
          style={styles.pressableTimer}
          onPress={() => setTimerRunning(!timerRunning)}
        >
          {timerRunning ?
            <Entypo name="controller-stop" size={30} color="black" />
            : <AntDesign name="play" size={30} color="black" />}
          <Text style={[styles.text, { fontSize: 35 }]}>{timerRunning ? ReturnTime(time) : 'Descansar'}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

