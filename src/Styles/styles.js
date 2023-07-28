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
});