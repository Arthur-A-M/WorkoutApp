import { StyleSheet } from 'react-native';

import { Colors } from '../../../Styles/Colors';

export const styles = StyleSheet.create({
  pressable: {
    marginVertical: 10,
    borderRadius: 30,
    backgroundColor: Colors.coreDirevied.secundaryDirevied.monocromaticLighter,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.genericColors.clear,
    textAlign: 'center',
  }
});