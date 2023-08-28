import { StyleSheet } from 'react-native';

import { Colors } from '../../../Styles/Colors';

export const styles = StyleSheet.create({
  viewCreatingExercises: {
    flex: 0.2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 20
  },
  pressableCreatingClicked: {
    opacity: 0.7,
    width: '37%',
    height: 37, 
  },
  pressableCreatingExercises: {
    width: '40%',
    height: 40,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderColor: Colors.genericColors.grayish,
    borderWidth: 1,
  },
  textExercises: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.genericColors.clear,
  },
});