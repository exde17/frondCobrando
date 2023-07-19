import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants'
import axiosInstance from '../intersect/axiosInstance'
// import { useToast } from 'react-native-toast-message';
// import { Toast } from 'react-native-toast-message/lib/src/Toast'


export default function Barrio() {
    const navigation = useNavigation();
    const url = Constants.expoConfig.extra.API_BASE_URL;
    const [nombre, setNombre]= useState('')

    //funcion para crear barrio
    const createBarrio = async () => {
        const full ={
            nombre_barrio: nombre
        }
        console.log(full)
        try {
            const response = await axiosInstance.post(`${url}api/barrio`,JSON.stringify({
                nombre_barrio: nombre,
            }));
            console.log(response.data);
            Alert.alert('Éxito', 'El barrio se ha creado correctamente.');
            // Toast.show({
            //     type: 'success',
            //     text1: 'Éxito',
            //     text2: 'El barrio se ha creado correctamente.',
            // });
            navigation.navigate('SettingsScreen');
        } catch (error) {
            console.log(error);
            Toast.show('exitoooooo')
           
            // Alert.alert('Error', 'Ha ocurrido un error al crear el barrio. Por favor, inténtalo nuevamente.');
        }
    }
            
  return (
    
    <View
        style={styles.container}
    >
      <TextInput
        style={styles.textInput}
        placeholder='Nombre del Barrio'
        placeholderTextColor="rgba(0,0,0,0.5)"
        onChangeText={text => setNombre(text)}
      />

<TouchableOpacity
        style={styles.button}
        onPress={createBarrio}
      > 
        <Text style={styles.buttonText}>Crear</Text>

      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

    container:{
      paddingHorizontal: 40,
      paddingVertical: 30,
      alignItems: 'center',
    },
  
    textInput:{
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
    }
  })