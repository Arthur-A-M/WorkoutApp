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

  const Series = ['Serie A', 'Serie B', 'Serie C']


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
      key={item.name}
      onPress={() => Check(index)}
      style={styles.pressableExercises}
    >
      <Text style={[styles.text, { marginTop: 10 }]}>{item.name}</Text>
      {checkedExercise[index] ?
        <Text style={[styles.text, { fontSize: 50 }]}>{'\u2714'}</Text>
        : null}
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

  const setUpExercises = async () => {
    try {
        const value = await AsyncStorage.getItem(`${workout}`);
        if (value !== null) {
          const serie = JSON.parse(value);
          setExercise(serie.exercises);
          return setIsLoading(false);
        } else { 
          sessions.forEach( async element => {
            const jsonValue = element.exercises;
            await AsyncStorage.setItem(`${element.sessionName}`, JSON.stringify(element));
            console.log(jsonValue);
            alert('Serie criada');
          });
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
            onPress={() => {setWorkout(serie); setUpExercises();}}
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
