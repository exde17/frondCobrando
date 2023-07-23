import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import axiosInstance from '../intersect/axiosInstance'
import SelectBox from 'react-native-multi-selectbox'
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants'
import { xorBy } from 'lodash'


export default function Ruta() {
    const navigation = useNavigation();
    const url = Constants.expoConfig.extra.API_BASE_URL;
    const [nombre, setNombre] = useState('');
    const [barrios, setBarrios] = useState([]);
    const [selectedBarrio, setSelectedBarrio] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState({})
    const [selectedTeams, setSelectedTeams] = useState([])
    const [cobrador, setCobrador] = useState([])
    

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

// Llamar a obtenerBarrios y obtenerCobradores cuando el componente se monta
useEffect(() => {
    obtenerBarrios();
    obtenerCobradores();
    // console.log('loading:', loading);
  }, []);

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

//funcion para crear rutas
const crearRuta = async () => {
  
  try {
    const response = await axiosInstance.post(`${url}api/rutas`, {
      nombre: nombre,
      barrio: selectedTeams.map(item=>{
      return item.id
    }),
    user: selectedTeam.id,
    });
    console.log('Datos recibidos:', response.data);
    // setCobrador(response.data);
    alert("Se ha creado la ruta correctamente");
  } catch (error) {
    console.log(error);
    alert("No se ha podido crear la ruta");
  }}

// Función para transformar el array de cobradores a un formato compatible con SelectBox
function transformCobradoresToOptions(cobrador) {
  return cobrador.map((cobrado) => ({
    item: cobrado.fullName,
    id: cobrado.id,
  }));
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

{/* <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, paddingBottom: 20 }}>Demos</Text>
      </View> */}
      {/* <Text style={{ fontSize: 20, paddingBottom: 10 }}>Select Demo</Text> */}
      
      <SelectBox
        
        label="Selecionar Cobrador"
        options={transformCobradoresToOptions(cobrador)}
        value={selectedTeam}
        onChange={onChange}
        hideInputFilter={false}
      />

      
    </View>
    {/* ////////////////select multiple//////////////////// */}
      {/* <View style={{ height: 40 }} /> */}
      {/* <Text style={{ fontSize: 20, paddingBottom: 10 }}>MultiSelect Demo</Text> */}
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
          onPress={crearRuta}  
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
  })

