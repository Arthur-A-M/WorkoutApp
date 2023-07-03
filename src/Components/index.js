import { Text, View, Pressable, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons';


import { styles } from './styles';



const renderExercise1 = ({ item, index, onPress }) => (
    <Pressable
      key={item[0]}
      onPress={() => toggleCheck(index)}
      style={styles.pressableExercises}
    >
      <Text style={[styles.text, { marginTop: 10 }]}>{item[0]}</Text>
      {checkedExercises[index] ?
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