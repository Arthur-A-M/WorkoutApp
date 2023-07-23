import { StyleSheet } from 'react-native';

import { Colors } from '../../../Styles/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.coreColors.secundary,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  pressable: {
    flex: 1,
    width: '90%',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
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