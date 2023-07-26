import { FlatList, Text, View, StyleSheet, Alert, SafeAreaView, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import axiosInstance from '../intersect/axiosInstance';
import Constants from 'expo-constants'


export default function Client() {
  const [clientes, setClientes] = useState([]);
  const url = Constants.expoConfig.extra.API_BASE_URL; 
  // const clientes = [
  //   {"fullName": "poo", "documento": "polo"},
  //   {"fullName": "rita", "documento": "pantalon"},
  //   {"fullName": "paco", "documento": "perez"},
  //   {"fullName": "poo", "documento": "polo"},
  //   {"fullName": "rita", "documento": "pantalon"},
  //   {"fullName": "paco", "documento": "perez"},
  //   {"fullName": "poo", "documento": "polo"},
  //   {"fullName": "rita", "documento": "pantalon"},
  //   {"fullName": "paco", "documento": "perez"},
  //   {"fullName": "poo", "documento": "polo"},
  //   {"fullName": "rita", "documento": "pantalon"},
  //   {"fullName": "paco", "documento": "perez"},
  //   {"fullName": "poo", "documento": "polo"},
  //   {"fullName": "rita", "documento": "pantalon"},
  //   {"fullName": "paco", "documento": "perez"},
  //   {"fullName": "poo", "documento": "polo"},
  //   {"fullName": "rita", "documento": "pantalon"},
  //   {"fullName": "paco", "documento": "perez"},
  //   {"fullName": "poo", "documento": "polo"},
  //   {"fullName": "rita", "documento": "pantalon"},
  //   {"fullName": "paco", "documento": "perez"},
  //   {"fullName": "poo", "documento": "polo"},
  //   {"fullName": "rita", "documento": "pantalon"},
  //   {"fullName": "paco", "documento": "perez"},
  //   {"fullName": "poo", "documento": "polo"},
  //   {"fullName": "rita", "documento": "pantalon"},
  //   {"fullName": "paco", "documento": "perez"},
  //   {"fullName": "poo", "documento": "polo"},
  //   {"fullName": "rita", "documento": "pantalon"},
  //   {"fullName": "paco", "documento": "perez"},
  //   {"fullName": "rita", "documento": "pantalon"},
  //   {"fullName": "paco", "documento": "perez"},
  //   {"fullName": "poo", "documento": "polo"},
  //   {"fullName": "rita", "documento": "pantalon"},
  //   {"fullName": "paco", "documento": "perez"},
  // ];

  //traer los clientes relacionado con el cobrador logueado
  const getClientes = async () =>{
    try {
      const response = await axiosInstance.get(`${url}api/client/cliente`)
      setClientes(response.data)
      console.log('el dato: ', response.data)
    } catch (error) {
      console.log(error)
      Alert.alert('error al cargar los datos: ', error)
    }
  }

  useEffect(() => {
    getClientes()
  }, [])

  // Componente para renderizar cada elemento de la lista (cliente)
  const ClienteItem = ({ item }) => {
    return (
      <View style={styles.clienteItem}>
        <Text style={styles.clienteNombre}>{item.fullName}</Text>
        <Text style={styles.clienteApellido}>{item.documento}</Text>
        <TouchableOpacity
          style={styles.buttonVer}
          onPress={console.log('boom')}
        >
          <Text style={styles.buttonText}>Ver</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.contenedor}>
    {/* <View style={styles.contenedor}> */}
      <View style={styles.contenedorTitulo}>
        <Text style={styles.titulo}>Clientes ACtivos</Text>
      </View>
      
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
    backgroundColor: '#0C2B9D',
    padding: 10,
    borderRadius: 10,
    // marginTop: 5,
    marginLeft: '60%',
    width: 120,
    alignItems: 'center',
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
    // marginTop: 10,
    // marginBottom: 10,
    // marginLeft: 10,
    // margin: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#0C2B9D'
  }
});

