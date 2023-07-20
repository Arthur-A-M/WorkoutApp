import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2227',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
   flexDirection: 'row', 
   alignItems: 'center',
   height: 50,
   width: 360,
   paddingHorizontal: 15,
   borderColor: 'gray',
   borderWidth: 1,
   borderRadius: 25,
   backgroundColor: '#2a2f37',
   marginVertical: 6
  },
  textInput: {
    color: 'white',
    width: '90%',
    fontSize: 18,
    marginLeft: 5
  },
  pressableLogin: {
    width: '70%',
    height: 75,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#e0fe10',
  },
  textLogin: {
    fontSize: 25,
    fontWeight: 'bold',
  }
});