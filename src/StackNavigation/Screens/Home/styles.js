import { StyleSheet } from 'react-native';

import { Colors } from '../../../Styles/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.coreColors.secundary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStartingExercises: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  viewCreatingExercises: {
    flex: 0.2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 20
  },
  viewStartingExercise: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  pressableStartingClicked: {
    opacity: 0.7,
    width: '85%',
    height: 100,
  },
  pressableStartingExercises: {
    width: '90%',
    height: 110,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: Colors.coreDirevied.secundaryDirevied.monocromaticLighter,
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
  imageStartingExercises: {
  width: '30%',  
  height: 90,
  borderRadius: 5,
  },
  textExercises: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.genericColors.clear,
  },
  textStartingExercises: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.genericColors.clear,
    textAlign: 'center',
  }
});