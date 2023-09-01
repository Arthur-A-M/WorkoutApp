import { StyleSheet } from 'react-native';

import { Colors } from '../../../Styles/Colors';

export const styles = StyleSheet.create({
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
  textpressable: {
    fontSize: 20,
    fontWeight: 'bold',
  },

});