import { StyleSheet } from 'react-native';

import { Colors } from '../../../Styles/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.coreColors.secundary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewTextInput: {
    paddingVertical: 5
  },
  flatListIems: {

  },
  text: {
   color: Colors.genericColors.clear,
   fontSize: 22, 
  },
  textInput: { 
    height: 40,
    width: 200, 
    paddingHorizontal: 5,
    borderColor: Colors.genericColors.grayish, 
    borderWidth: 1,
    color: Colors.genericColors.clear,
    backgroundColor: Colors.coreDirevied.secundaryDirevied.monocromaticLighter,
  },
  pressable: {
    width: '65%',
    height: 70,
    marginVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    borderColor: Colors.genericColors.dark,
    borderWidth: 1,
    backgroundColor: Colors.coreColors.main,
  },
});