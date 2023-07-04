import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 80,
  },
  viewDataType: {
    flex: 1,
    justifyContent: 'space-around',
    borderColor: 'black',
    borderTopWidth: 1,
  },
  pressableExercises: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').height * 0.7,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 25,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pressableTimer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.6,
    height: 50,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
