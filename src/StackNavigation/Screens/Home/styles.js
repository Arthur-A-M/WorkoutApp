import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2227',
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
  pressableStartingExercises: {
    width: '90%',
    height: 120,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#2a2f37',
  },
  pressableCreatingExercises: {
    width: '40%',
    height: 40,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderColor: 'gray',
    borderWidth: 1,
  },
  textExercises: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  textStartingExercises: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  }
});