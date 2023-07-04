import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { styles } from './styles';

export default function LoginScreen({ navigation }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (login.trim() !== '' && password.trim() !== '') {
      navigation.navigate('Home', { login: login });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <TextInput
        value={login}
        onChangeText={setLogin}
        placeholder="The login test is 'logintest2'"
        autoCapitalize="none"
      />
      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      <Pressable onPress={handleLogin}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
}
