import { 
    View, 
    Text, 
    StyleSheet, 
    KeyboardAvoidingView,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Alert,
    Platform,
} from 'react-native'
import React,{ useState, useEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import axiosInstance from '../../intersect/axiosInstance'
import Constants from 'expo-constants'
import SelectBox from 'react-native-multi-selectbox'


export default function UpdateClientes() {
    const route = useRoute();
    const { clienteId } = route.params;
    const [nombre, setNombre] = useState('');
    const [documento, setDocumento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefonoFamiliar, setTelefonoFamiliar] = useState('');
    const [selectedTeam, setSelectedTeam] = useState({});
    const [rutas, setRutas] = useState([]);
    const [ruta2, setRutas2] = useState('')
    const [valselect, setValselect] = useState('')
    const url = Constants.expoConfig.extra.API_BASE_URL;
    const navigation = useNavigation()

    //llamar informacion de cliente escogido
    const getCliente= async()=>{
        try {
            const response = await axiosInstance.get(`${url}api/client/${clienteId}`);
            console.log('Datos recibidos:', response.data.ruta.nombre);
            setNombre(response.data.fullName);
            setDocumento(response.data.documento);
            setTelefono(response.data.telefono);
            setCorreo(response.data.email);
            setDireccion(response.data.direccion);
            setTelefonoFamiliar(response.data.telefonoFamiliar);
            setValselect(response.data.ruta.nombre)
            setSelectedTeam({"id":"1","nombre": {valselect}});
            setRutas2(response.data.ruta)
            //setLoading(false); // Indicar que ya se han cargado los datos
          }
            catch (error) {
            console.log(error);
            //setLoading(false); // Incluso en caso de error, se debe detener la carga
            };
    }
    
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
        console.log('barita: ', clienteId)
        getCliente();
        console.log('barbita: ', nombre)
        obtenerRutas();
        
    },[])


    const updateCliente = async ()=>{
        try {
           
            const dataToUpdate = {
              fullName: nombre,
              documento: documento,
              telefono: telefono,
              email: correo,
              direccion: direccion,
              telefonoFamiliar: telefonoFamiliar
          };
  
          if (selectedTeam.id !== "1") {
              dataToUpdate.ruta = selectedTeam.id;
          }
            
            const response = await axiosInstance.patch(`${url}api/client/updateClient/${clienteId}`,dataToUpdate

            );
            console.log('Datos recibidos:', response.data);
            Alert.alert('Cliente creado exitosamente', selectedTeam.id );
            navigation.navigate('HomeScreen');
            //setLoading(false); // Indicar que ya se han cargado los datos
            } catch (error) {
            console.log(error);
            //setLoading(false); // Incluso en caso de error, se debe detener la carga
            };
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
    <View>
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
                label="Selecciona una ruta"
                options={transformRutas(rutas)}
                value={selectedTeam}
                onChange={onChange}
                hideInputFilter={false}
                /> 

                <TextInput
                style={styles.textInput}
                placeholder="Nombre Completo"
                onChangeText={text => setNombre(text)}
                defaultValue={nombre}
                placeholderTextColor="rgba(0,0,0,0.5)"
                />

                <TextInput
                style={styles.textInput}
                placeholder="Documento"
                onChangeText={text => setDocumento(text)}
                defaultValue={documento}
                placeholderTextColor="rgba(0,0,0,0.5)"
                keyboardType="numeric"
                />

                <TextInput
                style={styles.textInput}
                placeholder="Telefono"
                onChangeText={text => setTelefono(text)}
                defaultValue={telefono}
                placeholderTextColor="rgba(0,0,0,0.5)"
                keyboardType="numeric"
                />

                <TextInput
                style={styles.textInput}
                placeholder="Correo"
                onChangeText={text => setCorreo(text)}
                defaultValue={correo}
                placeholderTextColor="rgba(0,0,0,0.5)"
                />

                <TextInput
                style={styles.textInput}
                placeholder="Direccion"
                onChangeText={text => setDireccion(text)}
                defaultValue={direccion}
                placeholderTextColor="rgba(0,0,0,0.5)"
                />

                <TextInput
                style={styles.textInput}
                placeholder="Telefono Familiar"
                onChangeText={text => setTelefonoFamiliar(text)}
                defaultValue={telefonoFamiliar}
                placeholderTextColor="rgba(0,0,0,0.5)"
                keyboardType="numeric"
                />        

                <TouchableOpacity
                style={styles.button}
                onPress={updateCliente}
                >
                <Text style={styles.buttonText}>Editar Cliente</Text>
                </TouchableOpacity>


                
            </View>
            
            </SafeAreaView>
        </KeyboardAvoidingView>
    </View>
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