import { 
  View, 
  Text, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  SectionList, 
  Alert
} from 'react-native'
import React, {useState, useEffect} from 'react'
import { useRoute } from '@react-navigation/native';
import SelectBox from 'react-native-multi-selectbox'
import axiosInstance from '../intersect/axiosInstance'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native';

export default function Client() {
  // const route = useRoute();
  // const { clienteId } = route.params;
  const navigation = useNavigation()

  const [nombre, setNombre] = useState('');
  const [documento, setDocumento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefonoFamiliar, setTelefonoFamiliar] = useState('');
  const [selectedTeam, setSelectedTeam] = useState({})
  const [rutas, setRutas] = useState([])
  
  const url = Constants.expoConfig.extra.API_BASE_URL;
  
  let options = [];

  // obtener la liata de rutas
  const obtenerRutas = async () => {
    try {
      const response = await axiosInstance.get(`${url}api/rutas`);
      // console.log('Datos recibidos:', response.data);
      setRutas(response.data);
      //setLoading(false); // Indicar que ya se han cargado los datos
    } catch (error) {
      console.log(error);
      //setLoading(false); // Incluso en caso de error, se debe detener la carga
    }
  }

  useEffect(()=>{
    obtenerRutas();
  },[])

  const createCliente = async ()=>{
    try {
      console.log(`${url}api/client`,
        {
          fullName: nombre,
          documento: documento,
          telefono: telefono,
          email: correo,
          direccion: direccion,
          telefonoFamiliar: telefonoFamiliar,
          ruta: selectedTeam.id,
        }
      )
      const response = await axiosInstance.post(`${url}api/client`,JSON.stringify({
          fullName: nombre,
          documento: documento,
          telefono: telefono,
          email: correo,
          direccion: direccion,
          telefonoFamiliar: telefonoFamiliar,
          ruta: selectedTeam.id,
      }));
      console.log('Datos recibidos:', response.data);
      Alert.alert('Cliente creado exitosamente');
      navigation.navigate('HomeScreen');
      //setLoading(false); // Indicar que ya se han cargado los datos
    } catch (error) {
      console.log(error);
      //setLoading(false); // Incluso en caso de error, se debe detener la carga
    }
  }

  // Función para transformar el array de barrios a un formato compatible con SelectBox
  function transformRutas(rutas) {
    return rutas.map((ruta) => ({
      item: ruta.nombre,
      id: ruta.id,
    }));
  }

  // Función onChange dentro del componente Ruta
  function onChange(val) {
    setSelectedTeam(val);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // Controla el desplazamiento vertical del contenido
    >
    <SafeAreaView style={{ margin: 30 }}>
      
      <View>
        <Text>Crear Cliente</Text>
        {/* <Text>{clienteId}</Text> */}
      </View>
      <View style={styles.container}>

        <SelectBox 
          label="Selecionar Ruta"
          options={transformRutas(rutas)}
          value={selectedTeam}
          onChange={onChange}
          hideInputFilter={false}
        /> 

        <TextInput
          style={styles.textInput}
          placeholder="Nombre Completo"
          onChangeText={text => setNombre(text)}
          // defaultValue={nombre}
          placeholderTextColor="rgba(0,0,0,0.5)"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Documento"
          onChangeText={text => setDocumento(text)}
          // defaultValue={documento}
          placeholderTextColor="rgba(0,0,0,0.5)"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Telefono"
          onChangeText={text => setTelefono(text)}
          // defaultValue={telefono}
          placeholderTextColor="rgba(0,0,0,0.5)"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Correo"
          onChangeText={text => setCorreo(text)}
          // defaultValue={correo}
          placeholderTextColor="rgba(0,0,0,0.5)"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Direccion"
          onChangeText={text => setDireccion(text)}
          // defaultValue={direccion}
          placeholderTextColor="rgba(0,0,0,0.5)"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Telefono Familiar"
          onChangeText={text => setTelefonoFamiliar(text)}
          // defaultValue={telefonoFamiliar}
          placeholderTextColor="rgba(0,0,0,0.5)"
          keyboardType="numeric"
        />        

        <TouchableOpacity
          style={styles.button}
          onPress={createCliente}
        >
          <Text style={styles.buttonText}>Crear Cliente</Text>
        </TouchableOpacity>


        
      </View>
      
    </SafeAreaView>
   </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 30,
    width: '100%', 
    // backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  
  textInput:{
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 18,
    borderRadius: 5,
    // paddingBottom:20,
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
  buttonVer:{
    backgroundColor: '#0C2B9D',
    padding: 10,
    borderRadius: 10,
    // marginTop: 5,
    marginLeft: '60%',
    width: 120,
    alignItems: 'center',
  
  }
})