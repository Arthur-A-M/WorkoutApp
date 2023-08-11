import AsyncStorage from '@react-native-async-storage/async-storage';

  export const storeString = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  export const getStringData = async (key) => {
    try {
      console.log('the key is:', key);
      const value = await AsyncStorage.getItem(`${key}`);
      console.log('the value is:', value);
      if (value !== null) {
        return value;
      } else if (value === null || value === []) {
        console.log('No session found!');
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  export const getObjectData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`${key}`);
      console.log('the object retrived is:', jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  export const storeObjectData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(e);
    }
  }

  export const ReturnTime = (time) => {
    const timeInSeconds = time;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedMinutes = minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 });
    const formattedSeconds = seconds.toLocaleString('en-US', { minimumIntegerDigits: 2 });
    const formattedTime = `${formattedMinutes}:${formattedSeconds}`;
    return formattedTime;
  }

  export const checkInteger = (value) => {
    if (isNaN(parseInt(value))) {
      return false;
    } else {
      return true;
    }
  };