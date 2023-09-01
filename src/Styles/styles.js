import { StyleSheet } from 'react-native';

import { Colors } from './Colors';

export const unifiedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.coreColors.secundary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containedView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  pressableMainColor: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.genericColors.dark,
    borderWidth: 1,
    backgroundColor: Colors.coreColors.main,
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 350,
    borderColor: Colors.genericColors.calling,
    borderWidth: 1,
    backgroundColor: Colors.coreDirevied.secundaryDirevied.monocromaticLighter, 
  },
  pressable: {
    width: '65%',
    height: 70,
    marginVertical: 25,
    borderRadius: 40,
  },
  bigText: {
    color: Colors.genericColors.clear,
    fontSize: 22,
    textAlign: 'center',
  },
});