import { StyleSheet } from 'react-native';

import { Colors } from '../../../Styles/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.coreColors.secundary,
    alignItems: 'center',
    justifyContent: 'space-between',
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
  flatListTextInput: {
   width: '100%',
  },
  flatListIems: {
    alignItems: 'center', 
    width: '100%',
    paddingTop: 20
  },
  textInput: {
    color: Colors.genericColors.clear,
    width: 300,
    fontSize: 22,
    marginLeft: 5,
    height: 60,
    paddingHorizontal: 15,
    borderColor: Colors.genericColors.grayish,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: Colors.coreDirevied.secundaryDirevied.monocromaticLighter,
    marginVertical: 15
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
  textpressable: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: Colors.genericColors.clear,
    fontSize: 22,
    textAlign: 'center',
  },
});