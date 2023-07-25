import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const url = Constants.expoConfig.extra.API_BASE_URL;

    try {
      
      const response = await fetch(`${url}api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      const { token } = data;

      if(token){
      try {
        await AsyncStorage.setItem('token', token);
        console.log('Token guardado correctamente');

        // Redireccionar al usuario al componente "Home"
        navigation.navigate('HomeScreen');
      } catch (error) {
        console.log('Error al guardar el token:', error);
      }
    }else{
      console.log('Inicio de sesion fallido:', data.message);
      Alert.alert(data.message)
    }

      console.log(token);
    } catch (error) {
      console.log(error);
      Alert.alert('solicitud fallida, comunicate con admin del servidor')
    }
  
  };
  const navigation = useNavigation();

  //para ver y ocultar la contraseña
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    
    <View style={styles.container}>
      <TextInput
        style={styles.TextInput}
        placeholder="correo"
        placeholderTextColor="rgba(0,0,0,0.5)"
        onChangeText={text => setEmail(text)}
      />
      <View style={styles.passwordContainer}>
      <TextInput
        style={styles.TextInput}
        placeholder="contraseña"
        placeholderTextColor="rgba(0,0,0,0.5)"
        onChangeText={text => setPassword(text)}
        secureTextEntry={!showPassword} // Oculta los caracteres de contraseña
      />
      <TouchableOpacity style={styles.eyeIcon} onPress={toggleShowPassword}>
          <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        <Text style={styles.buttonText}>Ver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 30,
    alignItems: 'center',
  },
  TextInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  eyeIcon: {
    padding: 10,
  },
});

