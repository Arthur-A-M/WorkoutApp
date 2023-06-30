import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable: {
    width: Dimensions.get('window').width - 20,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});