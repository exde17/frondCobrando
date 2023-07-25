import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native'
import React,{useState, useEffect} from 'react'
import { useRoute } from '@react-navigation/native'
import { xorBy } from 'lodash'
import SelectBox from 'react-native-multi-selectbox'
import axiosInstance from '../../intersect/axiosInstance'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'

export default function EditarRutas() {
    const route = useRoute()
    const { rutaId } = route.params
    const navigation = useNavigation();
    const [nombre, setNombre] = useState('');
    const [selectedTeam, setSelectedTeam] = useState({});
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [cobrador, setCobrador] = useState([])
    const [barrios, setBarrios] = useState([]);
    const url = Constants.expoConfig.extra.API_BASE_URL; 

    //obtener usuarios con roles cobrador
    const obtenerCobradores = async () => {
        try {
        const response = await axiosInstance.get(`${url}api/auth/cobradores`);
        // console.log('Datos recibidos:', response.data);
        setCobrador(response.data);
        
        } catch (error) {
        console.log(error);
        
        }
    };

    // Obtener la lista de barrios desde la API
    const obtenerBarrios = async () => {
        try {
        const response = await axiosInstance.get(`${url}api/barrio`);
        // console.log('Datos recibidos:', response.data);
        setBarrios(response.data);
        //setLoading(false); // Indicar que ya se han cargado los datos
        } catch (error) {
        console.log(error);
        //setLoading(false); // Incluso en caso de error, se debe detener la carga
        }
    };

    useEffect(
        () => {
            obtenerCobradores();
            obtenerBarrios();
        },[]
    );

    // Función onChange dentro del componente Ruta
    function onChange(val) {
        setSelectedTeam(val);
    }

    // Función onMultiChange dentro del componente Ruta
    function onMultiChange() {
        return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
    }

     // Función para transformar el array de barrios a un formato compatible con SelectBox
    function transformBarriosToOptions(barrios) {
        return barrios.map((barrio) => ({
        item: barrio.nombre_barrio,
        id: barrio.id,
        }));
    }

    // Función para transformar el array de cobradores a un formato compatible con SelectBox
    function transformCobradoresToOptions(cobrador) {
        return cobrador.map((cobrado) => ({
        item: cobrado.fullName,
        id: cobrado.id,
        }));
    }

    //update rutas
    const updateRuta = async ()=>{
        try {
            // Obtener los datos actuales de la ruta desde el servidor
            const response = await axiosInstance.get(`${url}api/rutas/${rutaId}`);
            const rutaActual = response.data;

            // Combinar los datos actuales con los datos que deseas actualizar
            const datosActualizados = {
                nombre: nombre !== '' ? nombre : rutaActual.nombre,
                user: selectedTeam.id || rutaActual.user,
                barrio: selectedTeams.length > 0 ? selectedTeams.map(item => item.item) : rutaActual.barrio,
            };
            await axiosInstance.patch(`${url}api/rutas/update/${rutaId}`,datosActualizados)
            .then(response => {
            // console.log(response);
            console.log(response.data);
            Alert.alert(response.data)

            })
            navigation.navigate('ListRutas')

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <SafeAreaView style={{ margin: 30 }} >
    
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Nombre Ruta'
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    onChangeText={text => setNombre(text)}
                />
                
              <SelectBox
                
                label="Selecionar Cobrador"
                options={transformCobradoresToOptions(cobrador)}
                value={selectedTeam}
                onChange={onChange}
                hideInputFilter={false}
              />
    
          
            </View>
        
            <View style={styles.container}>
              <SelectBox
                label="Selecionar Barrios"
                options={transformBarriosToOptions(barrios)}
                selectedValues={selectedTeams}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                isMulti
              />
            </View>
          
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.button}
                onPress={updateRuta}  
              >
                <Text style={styles.buttonText}>Crear</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
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