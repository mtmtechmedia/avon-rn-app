import AsyncStorage from '@react-native-async-storage/async-storage';

export const getMySetting = key => AsyncStorage.getItem(key);
export const setMySetting = (key, value) => AsyncStorage.setItem(key, value);
