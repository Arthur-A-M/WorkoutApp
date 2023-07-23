import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import BouncyCheckbox from "react-native-bouncy-checkbox";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { storeObjectData, getObjectData } from '../../../Functions';
import { Colors } from '../../../Styles/Colors'

import { styles } from './styles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkboxState, setCheckboxState] = useState(false);

  const rememberKey = 'rememberWorkouApp';

  useEffect(() => {
    const fetchData = async () => {
      const value = await getObjectData(rememberKey);
      if (value !== null) {
        setEmail(value.email);
        setPassword(value.password);
        setCheckboxState(true);
      }
    };

    fetchData();
  }, []);

  const handleLogin = () => {
    if (email.trim() !== '' && password.trim() !== '') {
      const data = checkboxState ? { email, password } : null;
      storeObjectData(rememberKey, data);
      navigation.navigate('Home', { email });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsView}>
        <View style={styles.inputView}>
          <Feather name="mail" size={24} color={Colors.genericColors.clear} />
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={Colors.genericColors.clear}
            placeholder="Email"
            autoCapitalize="none"
            autoCompleteType="email"
            maxLength={50}
          />
        </View>
        <View style={styles.inputView}>
          <AntDesign name="lock" size={24} color={Colors.genericColors.clear} />
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={Colors.genericColors.clear}
            placeholder="Password"
            secureTextEntry={true}
            autoCompleteType="password"
            maxLength={27}
          />
        </View>
        <View style={styles.checkboxView}>
          <BouncyCheckbox
            isChecked={checkboxState}
            onPress={() => setCheckboxState(!checkboxState)}
            fillColor={Colors.coreColors.main}
            disableBuiltInState={true}
          />
          <Text style={styles.checkboxText}>Remember me</Text>
        </View>
      </View>
      <View style={styles.pressablesView}>
        <Pressable
          onPress={handleLogin}
          style={({ pressed }) => [
            styles.pressableLogin,
            pressed && {
              opacity: 0.7,
              width: '65%', // Dynamic styles isn't working
              height: 70,
            },
          ]}
        >
          <Text style={styles.textLogin}>Login</Text>
        </Pressable>
        <Pressable
          onPress={() => alert('Not implemented yet!')}
          style={({ pressed }) => [
            styles.pressableSignUp,
            pressed && {
              opacity: 0.7,
              width: '45%', // Dynamic styles isn't working
              height: 45,
            },
          ]}
        >
          <Text style={styles.textSignUp}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}
