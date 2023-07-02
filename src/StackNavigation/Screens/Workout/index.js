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


  useEffect(() => {
    const session = sessions.find(sessionElement => sessionElement.sessionName === workout);
    const checkedTemp = Array(session?.exercises.length || 0).fill(false);
    setCheckedExercise(checkedTemp);
  }, [workout]);

  const getSessionExercises = (workout) => {
    const session = sessions.find(sessionElement => sessionElement.sessionName === workout);
    return session?.exercises || [];
  };

  const Check = (index) => {
    const checkedTemp = [...checkedExercise];
    checkedTemp[index] = !checkedTemp[index];
    setCheckedExercise(checkedTemp);
  }

  const session = getSessionExercises(workout);

  const handlePress = (sessionName) => {
    setWorkout(sessionName);
  };

  const renderItem = ({ item, index }) => (
    <Pressable
      key={item.name}
      onPress={() => Check(index)}
      style={[styles.pressableExercises, {
        backgroundColor: checkedExercise[index] ? 'transparent' : 'beige',
        transform: [{ scale: checkedExercise[index] ? 1 : 1.2 }]
      }]}
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
      const value = await AsyncStorage.getItem('my-key');
      if (value !== null) {
        console.log(JSON.parse(value));
      } else {
        const jsonValue = JSON.stringify(sessions);
        await AsyncStorage.setItem(`my-key`, jsonValue);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setUpExercises();
  }, []);

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

  const getStored = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-key');
      return console.log(JSON.parse(jsonValue));
    } catch (e) {
      // error reading value
    }
  }

  return (
    <View style={styles.container}>
      {/*isLoading ?
                <ActivityIndicator size="large" color="#0000ff" />
  :null*/}
      {workout ? (
        <FlatList
          contentContainerStyle={{ alignItems: 'center' }}
          data={session}
          horizontal={true}
          renderItem={renderItem}
        />
      ) :
        (
          sessions.map((session, index) => (
            <Pressable
              style={styles.pressableSeries}
              key={index}
              onPress={() => handlePress(session.sessionName)}
            >
              <Text style={[styles.text, { fontSize: 35 }]}>{session.sessionName}</Text>
            </Pressable>
          ))
        )}
      {workout ? (
        <Pressable
          style={styles.pressableTimer}
          onPress={() => { setTimer(!timer); getStored(); }}
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
