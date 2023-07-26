import { FlatList, Text, View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function Client() {

  const clientes =[
    {"nombre": "poo",
    "apellido": "polo"},
    {
      "nombre": "rita",
      "apellido": "pantalon"
    },
    {
      "nombre": "paco",
      "apellido": "perez"
    }
  ]

  // Cargar la lista de clientes al montar el componente
  // useEffect(() => {
  //   obtenerClientes();
  // }, []);

  // Componente para renderizar cada elemento de la lista (cliente)
  const ClienteItem = ({ item }) => {
    return (
      <View style={styles.clienteItem}>
        <Text style={styles.clienteNombre}>{item.nombre}</Text>
        <Text style={styles.clienteApellido}>{item.apellido}</Text>
      </View>
    );
  };


  return (
    <View>
      <FlatList
      data={clientes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={ClienteItem}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  clienteItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  clienteNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clienteApellido: {
    fontSize: 16,
  },
});