import { Text, View, Pressable, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';
import { sessions } from './data';

export default function WorkoutScreen() {
  const [workout, setWorkout] = useState('');
  const [checkedExercise, setCheckedExercise] = useState([]);
  const [timer, setTimer] = useState(false);
  const [time, setTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [exercise, setExercise] = useState([]);

  const Series = ['Serie A', 'Serie B', 'Serie C'];


  useEffect(() => {
    const checkedTemp = Array(exercise?.length || 0).fill(false);
    setCheckedExercise(checkedTemp);
  }, [workout]);

  const Check = (index) => {
    const checkedTemp = [...checkedExercise];
    checkedTemp[index] = !checkedTemp[index];
    setCheckedExercise(checkedTemp);
  }


  const renderItem = ({ item, index }) => (
    <Pressable
      key={item[0]}
      onPress={() => Check(index)}
      style={styles.pressableExercises}
    >
      <Text style={[styles.text, { marginTop: 10 }]}>{item[0]}</Text>
      {checkedExercise[index] ?
        <Text style={[styles.text, { fontSize: 50 }]}>{'\u2714'}</Text>
        : null}
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

const getData = async (i) => {
  let array = [];
  console.log(Array.isArray(Series));
  try {
    const jsonValue = await AsyncStorage.getItem(`${Series[i]}`);
    if (jsonValue != null) {
      const parsedValue = JSON.parse(jsonValue);
        parsedValue.map(element => {
        console.log(typeof element.load);
        array.push([
          element.name,
          JSON.stringify(element.repetitions),
          JSON.stringify(element.series),
          element.load
        ]);
      });
      setExercise(array);
      setIsLoading(false);
      setWorkout(`${Series[2]}`);
      console.log(array, Array.isArray(array));
      console.log(exercise ,Array.isArray(exercise[0]));
    }
  } catch (e) {
    console.log(e);
  }
};

  useEffect(() => {
    let interval;
    if (timer) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    else {
      setTime(0);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const ReturnTime = (time) => {
    const timeInSeconds = time;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedMinutes = minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 });
    const formattedSeconds = seconds.toLocaleString('en-US', { minimumIntegerDigits: 2 });
    const formattedTime = `${formattedMinutes}:${formattedSeconds}`;
    return formattedTime;
  }

  return (
    <View style={styles.container}>
      {workout && (!isLoading) ? (
        <FlatList
          contentContainerStyle={{ alignItems: 'center' }}
          data={exercise}
          horizontal={true}
          renderItem={renderItem}
        />
      ) :
        (Series.map((serie, index) => (
          <Pressable
            style={styles.pressableSeries}
            key={index}
            onPress={() => getData(index)}
          >
            <Text style={[styles.text, { fontSize: 35 }]}>{serie}</Text>
          </Pressable>
        ))
        )}
      {workout && (!isLoading) ? (
        <Pressable
          style={styles.pressableTimer}
          onPress={() => setTimer(!timer)}
        >
          {timer ?
            <Entypo name="controller-stop" size={30} color="black" />
            : <AntDesign name="play" size={30} color="black" />}
          <Text style={[styles.text, { fontSize: 35 }]}>{timer ? ReturnTime(time) : 'Descansar'}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
