import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import React, {useState, useEffect} from 'react'
import axiosInstance from '../intersect/axiosInstance';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [documento, setDocumento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [edad, setEdad] = useState('');
  const [telefonoFamiliar, setTelefonoFamiliar] = useState('');
  const [rol, setRol] = useState([]);
  // const [datat,setDatat] = React.useState([]);
  // const [selectedRoles, setSelectedRoles] = useState([]);

  const navigation = useNavigation();
  const url = Constants.expoConfig.extra.API_BASE_URL;

//////////////////////////////////////////////////

const data = [
  {key:'1', value:'admin'},
  {key:'2', value:'cobrador'},
  {key:'3', value:'superUser'},
  {key:'4', value:'user'},
  // {key:'5', value:'Vegetables', disabled:true},
  // {key:'6', value:'Diary Products', disabled:true},
  
]

/////////////////////////////////////////////////

  //funcion para el registro
  const handleRegister = async () => {
    
    
    console.log('url: ', url)
    try {
      const response = await axiosInstance.post(`${url}api/auth/register`, JSON.stringify({
        email: email,
        password: password,
        fullName: fullName,
        documento: documento,
        telefono: telefono,
        edad: edad,
        direccion: direccion,
        telefonoFamiliar: telefonoFamiliar,
        roles: rol
      }));
      console.log('Registro exitoso:', response.data);

      // Redireccionar al usuario a la pantalla de inicio de sesión
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.log('Error en el registro:', error);
    }
  };

  //get de roles
//   React.useEffect(() => 
//   //Get Values from database
//   axiosInstance.get(`${url}api/auth/roles`)
//     .then((response) => {
//       // Store Values in Temporary Array
//       let newArray = response.data.map((item) => {
//         return {key: item.key, value: item.value}
//       })
//       //Set Data Variable
//       setDatat(newArray)
//     })
//     .catch((e) => {
//       console.log(e)
//     })
// ,[])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
    >
    <View
      style={styles.container}
    >
      <TextInput
        style={styles.textInput}
        placeholder='Nombre Completo'
        placeholderTextColor="rgba(0,0,0,0.5)"
        onChangeText={text => setFullName(text)}
      />

      <TextInput
        style={styles.textInput}
        placeholder='Documento'
        placeholderTextColor="rgba(0,0,0,0.5)"
        onChangeText={text => setDocumento(text)}
      />

      <TextInput
        style={styles.textInput}
        placeholder='Direccion'
        placeholderTextColor="rgba(0,0,0,0.5)"
        onChangeText={text => setDireccion(text)}
      />

      <TextInput
        style={styles.textInput}
        placeholder='Edad'
        placeholderTextColor="rgba(0,0,0,0.5)"
        onChangeText={text => setEdad(text)}
      />

      <TextInput
        style={styles.textInput}
        placeholder='Telefono'
        placeholderTextColor="rgba(0,0,0,0.5)"
        onChangeText={text => setTelefono(text)}
      />

      <TextInput
        style={styles.textInput}
        placeholder='Telefono Familiar'
        placeholderTextColor="rgba(0,0,0,0.5)"
        onChangeText={text => setTelefonoFamiliar(text)}
      />

      {/* <TextInput
        style={styles.textInput}
        placeholder='Rol'
        placeholderTextColor="rgba(0,0,0,0.5)"
        onChangeText={text => setRol([text])}
      /> */}

      <MultipleSelectList 
        setSelected={(val) => setRol(val)} 
        data={data} 
        save="value"
        onSelect={() => alert(rol)} 
        label="Categories"
      />
      {/* <SelectList setSelected={setRol} data={datat} onSelect={() => alert(rol)} /> */}

      <TextInput
        style={styles.textInput}
        placeholder='Correo'
        placeholderTextColor="rgba(0,0,0,0.5)"
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        style={styles.textInput}
        placeholder='Contraseña'
        placeholderTextColor="rgba(0,0,0,0.5)"
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      > 
        <Text style={styles.buttonText}>Registrarse</Text>

      </TouchableOpacity>


    </View>
    </KeyboardAvoidingView>
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