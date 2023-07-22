import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2227',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    color: 'white',
    width: 300,
    fontSize: 22,
    marginLeft: 5,
    height: 60,
    paddingHorizontal: 15,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#2a2f37',
    marginVertical: 15
  },
  pressable: {
    width: '65%',
    height: 70,
    marginVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#e0fe10',
  },
  textpressable: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});