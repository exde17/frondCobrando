import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('el token: ', token)
    return token;
    
  } catch (error) {
    console.log('Error al obtener el token:', error);
    return null;
  }
};
