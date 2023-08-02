import { FlatList, Text, View, StyleSheet, Alert, SafeAreaView, TouchableOpacity } from 'react-native'
import React, {useState, useEffect,} from 'react'
import axiosInstance from '../intersect/axiosInstance';
import Constants from 'expo-constants'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';


export default function Client() {
  const [clientes, setClientes] = useState([]);
  const url = Constants.expoConfig.extra.API_BASE_URL; 
  const navigation = useNavigation();

  //traer los clientes relacionado con el cobrador logueado
  const getClientes = async () =>{
    try {
      const response = await axiosInstance.get(`${url}api/client/cliente`)
      setClientes(response.data)
      // console.log('el dato: ', response.data)
    } catch (error) {
      console.log(error)
      Alert.alert('error al cargar los datos: ', error)
    }
  }

  useEffect(() => {
    getClientes()
  }, [])

  const cargarClientes = React.useCallback(() => {
    getClientes();
  }, []); // Las dependencias están vacías ya que solo queremos que se cree una instancia de la función
  
  useFocusEffect(cargarClientes);

  // Componente para renderizar cada elemento de la lista (cliente)
  const ClienteItem = ({ item }) => {
    const handleClientePress = () => {
      // Aquí definimos la acción que se realizará al presionar un cliente
      // Por ejemplo, podemos navegar a otra vista pasando algunos datos
      navigation.navigate('UpdateClientes',{clienteId: item.id} );
    };

    return (
      <TouchableOpacity onPress={handleClientePress}>
      <View style={styles.clienteItem}>
        <Text style={styles.clienteNombre}>{item.fullName}</Text>
        <Text style={styles.clienteApellido}>{item.documento}</Text>
        {/* <TouchableOpacity
          style={styles.buttonVer}
          onPress={()=>{console.log('boom')}}
        >
          <Text style={styles.buttonText}>Ver</Text>
        </TouchableOpacity> */}
      </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.contenedorTitulo}>
        <Text style={styles.titulo}>Clientes Activos</Text>
      </View>
      <View style={{width:'100%', }}>
        <TouchableOpacity
          style={styles.buttonVer}
          onPress={()=>{navigation.navigate('Client')}}
        >
          {/* <Text style={styles.buttonText}>Agregar Cliente</Text> */}
          <Entypo name="squared-plus" size={40} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    {/* <View style={styles.contenedor}> */}
            
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={ClienteItem}
      />
    {/* </View> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  clienteItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  clienteNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clienteApellido: {
    fontSize: 16,
  },
  contenedor:{
    flex: 1,
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: '15%',
    marginLeft: '5%'
  },
  buttonVer:{
    // backgroundColor: '#0C2B9D',
    // padding: 10,
    // borderRadius: 10,
    // marginTop: 5,
    marginLeft: '85%',
    
    
    
    // alignItems: 'center',
    // justifyContent: 'center'
    
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contenedorTitulo:{
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0C2B9D',
    borderRadius: 5
  },
  titulo:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
   
  }
});

