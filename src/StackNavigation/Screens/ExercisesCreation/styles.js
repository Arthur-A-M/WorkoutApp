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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    borderColor: Colors.genericColors.dark,
    borderWidth: 1,
    backgroundColor: Colors.coreColors.main,
  },
  pressableCreated: {
    flex: 1,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.genericColors.dark,
    borderWidth: 1,
    backgroundColor: Colors.coreColors.main,
  }
});