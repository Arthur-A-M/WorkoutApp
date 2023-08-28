import { StyleSheet } from 'react-native';

import { Colors } from '../Styles/Colors';

export const styles = StyleSheet.create({
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
      imageStartingExercises: {
      width: '30%',  
      height: 90,
      borderRadius: 5,
      },
      textStartingExercises: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.genericColors.clear,
        textAlign: 'center',
      }
});