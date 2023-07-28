import { StyleSheet } from 'react-native';

import { Colors } from '../../../Styles/Colors';


export const styles = StyleSheet.create({
  viewTextInput: {
    paddingVertical: 20
  },
  viewCreated: {
    height: 200,
    width: 300,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Colors.genericColors.dark,
    borderWidth: 1,
    backgroundColor: Colors.coreDirevied.secundaryDirevied.monocromaticLighter,
    borderRadius: 20
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
  text: {
    color: Colors.genericColors.clear,
    fontSize: 22,
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    width: 240,
    paddingHorizontal: 5,
    borderColor: Colors.genericColors.grayish,
    borderWidth: 1,
    color: Colors.genericColors.clear,
    backgroundColor: Colors.coreDirevied.secundaryDirevied.monocromaticLighter,
    textAlign: 'center',
  },
  pressable: {
    width: '65%',
    height: 70,
    marginVertical: 25,
    borderRadius: 40,
  },
  pressableCreated: {
    height: 70,
    borderColor: Colors.genericColors.dark,
    borderWidth: 1,
    backgroundColor: Colors.coreColors.main,
  }
});