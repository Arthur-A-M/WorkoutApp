import { StyleSheet } from 'react-native';

import { Colors } from '../../../Styles/Colors';

export const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: 360,
    paddingHorizontal: 15,
    borderColor: Colors.genericColors.grayish,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: Colors.coreDirevied.secundaryDirevied.monocromaticLighter,
    marginVertical: 6
  },
  pressablesView: {
    flex: 0.8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textInput: {
    color: Colors.genericColors.clear,
    width: '90%',
    fontSize: 18,
    marginLeft: 5
  },
  pressableClickedLogin:{
    opacity: 0.7,
    width: '65%',
    height: 70,
  },
  pressableLogin: {
    width: '70%',
    height: 75,
    marginVertical: 5,
    borderRadius: 40,
  },
  pressableSignUpClicked: {
    opacity: 0.7,
    width: '45%',
    height: 45,
  },
  pressableSignUp: {
    width: '50%',
    height: 50,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderColor: Colors.genericColors.grayish,
    borderWidth: 1,
    backgroundColor: Colors.coreDirevied.secundaryDirevied.monocromaticLighter,
  },
  checkboxView: {
    flexDirection: 'row',
    width: '80%',
    paddingVertical: 5
  },
  checkboxText: {
    color: Colors.genericColors.clear,
    fontSize: 18
  },
  textLogin: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.genericColors.dark
  },
  textSignUp: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.genericColors.clear,
  }
});