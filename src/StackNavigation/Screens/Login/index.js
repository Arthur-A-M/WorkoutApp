import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email.trim() !== '' && password.trim() !== '') {
      navigation.navigate('Home', { email });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Feather name="mail" size={24} color="white" />
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="white"
          placeholder="Email"
          autoCapitalize="none"
          autoCompleteType="email"
          maxLength={50}
        />
      </View>
      <View style={styles.inputView}>
        <AntDesign name="lock" size={24} color="white" />
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="white"
          placeholder="Password"
          secureTextEntry={true}
          autoCompleteType="password"
          maxLength={27}
        />
      </View>
      <Pressable onPress={handleLogin} style={styles.pressableLogin}>
        <Text style={styles.textLogin}>Login</Text>
      </Pressable>
    </View>
  );
}
