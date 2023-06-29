import { Text, View, Pressable, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

import { styles } from './styles';

export default function WorkoutScreen() {
  const [workout, setWorkout] = useState('');
  const [checked, setChecked] = useState(null);
  const [checked1, setChecked1] = useState([]);

  useEffect(() => {
    const session = sessions.find(sessionElement => sessionElement.sessionName === workout);
    const checkedTemp = Array(session?.exercises.length || 0).fill(false);
    setChecked1(checkedTemp);
  }, [workout]);

  const getSessionExercises = (workout) => {
    const session = sessions.find(sessionElement => sessionElement.sessionName === workout);
    return session?.exercises || [];
  };

  const Check = (index) => {
    const checkedTemp = [...checked1];
    checkedTemp[index] = !checkedTemp[index];
    setChecked1(checkedTemp);
  }

  const session = getSessionExercises(workout);

  const handlePress = (sessionName) => {
    setWorkout(sessionName);
    setChecked(sessionName);
  };

  return (
    <View style={styles.container}>
      {sessions.map((session, index) => (
        <Pressable
          key={index}
          onPress={() => handlePress(session.sessionName)}
          style={{
            backgroundColor: checked === session.sessionName ? 'green' : 'transparent'
          }}
        >
          <Text>{session.sessionName}</Text>
        </Pressable>
      ))}
      {workout ? (
        <FlatList
          data={session}
          renderItem={({ item, index }) => (
            <Pressable
              key={item.name}
              onPress={() => Check(index)}
              style={{
                backgroundColor: checked1[index] ? 'green' : 'transparent'
              }}
            >
              <Text>{item.name}</Text>
              <Text>{item.repetitions}</Text>
              <Text>{item.series}</Text>
              <Text>{item.load}</Text>
            </Pressable>
          )}
        />
      ) : null}
    </View>
  );
}



export const sessions = [
  {
    sessionName: 'Serie A',
    exercises: [
      {
        name: 'Supino máquina',
        repetitions: 12,
        series: 3,
        load: '82.5 kg',
      },
      {
        name: 'Supino 45° com halteres',
        repetitions: 12,
        series: 3,
        load: '22 kg',
      },
      {
        name: 'Supino declinado com halteres',
        repetitions: 12,
        series: 3,
        load: '18 kg',
      },
      {
        name: 'Triceps barra',
        repetitions: 12,
        series: 3,
        load: '31.25 kg',
      },
      {
        name: 'Triceps corda',
        repetitions: 12,
        series: 3,
        load: '23.5 kg',
      },
      {
        name: 'Gemeas maquina',
        repetitions: 12,
        series: 4,
        load: '90 kg',
      },
      {
        name: 'Abdominal infra',
        repetitions: 15,
        series: 4,
        load: '5 kg',
      },
    ],
  },
  {
    sessionName: 'Serie B',
    exercises: [
      {
        name: 'Puxada polia barra aberta',
        repetitions: 12,
        series: 3,
        load: '70 kg',
      },
      {
        name: 'Puxada triângulo',
        repetitions: 12,
        series: 3,
        load: '75 kg',
      },
      {
        name: 'Puxada supinada',
        repetitions: 12,
        series: 3,
        load: '70 kg',
      },
      {
        name: 'Rosca biceps',
        repetitions: 12,
        series: 3,
        load: '14 kg',
      },
      {
        name: 'Rosca alternada neutra',
        repetitions: 12,
        series: 3,
        load: '14 kg',
      },
      {
        name: 'Biceps barra',
        repetitions: 10,
        series: 3,
        load: '23 kg',
      },
      {
        name: 'Abdominal maquina',
        repetitions: 15,
        series: 4,
        load: '70 kg',
      },
    ],
  },
  {
    sessionName: 'Serie C',
    exercises: [
      {
        name: 'Desenvolvimento maquina aberto',
        repetitions: 12,
        series: 3,
        load: '42.5 kg',
      },
      {
        name: 'Desenvolvimento maquina fechado',
        repetitions: 12,
        series: 3,
        load: '42.5 kg',
      },
      {
        name: 'Elevação lateral com halter',
        repetitions: 12,
        series: 3,
        load: '10 kg',
      },
      {
        name: 'Cadeira abdutora',
        repetitions: 12,
        series: 3,
        load: '127.5 kg',
      },
      {
        name: 'Maquina abdômimen e lombar',
        repetitions: 12,
        series: 3,
        load: '47.5 kg',
      },
      {
        name: 'Elevação pelvica',
        repetitions: 12,
        series: 3,
        load: '50 kg',
      },
      {
        name: 'Cadeira flexora',
        repetitions: 12,
        series: 4,
        load: '55 kg',
      },
      {
        name: 'Leg horizontal',
        repetitions: 12,
        series: 4,
        load: '115 kg',
      },
    ],
  },
];