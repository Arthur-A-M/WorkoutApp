import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2227',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputsView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  pressablesView: {
    flex: 0.8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
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
  pressableSignUp: {
    width: '50%',
    height: 50,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#2a2f37',
  },
  checkboxView: {
    flexDirection: 'row',
    width: '80%',
    paddingVertical: 5
  },
  checkboxText: {
    color: 'white',
    fontSize: 18
  },
  textLogin: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  textSignUp: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  }
});