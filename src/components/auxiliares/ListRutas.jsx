import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import axiosInstance from '../../intersect/axiosInstance'
import Constants from 'expo-constants'
import { Table, Row, Rows, Cell } from 'react-native-table-component';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { Alert } from 'react-native';


export default function ListRutas() {

  // Definir los encabezados de la tabla  
  const navigation = useNavigation();
  const tableHead = ['Nombre', 'Cobrador', 'Barrios', 'Accion'];
  const [rutas, setRutas] = useState([]);
  

  //traer todas las rutas
    const url = Constants.expoConfig.extra.API_BASE_URL; 
    const obtenerRutas = async () => {
        try {
            const response = await axiosInstance.get(`${url}api/rutas`);
            console.log('Datos recibidos:', response.data);
            setRutas(response.data);
            //setLoading(false); // Indicar que ya se han cargado los datos
        } catch (error) {
            console.log(error);
            //setLoading(false); // Incluso en caso de error, se debe detener la carga
        }
    }; 

    useEffect(
        () => {
            obtenerRutas();
            
        },[]
    );

    const cargarRutas = React.useCallback(() => {
      obtenerRutas();
    }, []); // Las dependencias están vacías ya que solo queremos que se cree una instancia de la función
    
    useFocusEffect(cargarRutas);
    
    const getBarrios = (barrios) => {
        return barrios.map((barrio) => barrio).join(', ');
      };


    // Función para manejar la acción del botón 2
    const handlEstado = async (ruta) => {
        // Implementa la lógica que deseas realizar al presionar el botón 2
        const response = await axiosInstance.patch(`${url}api/rutas/updateEstado/${ruta.id}`)
        Alert.alert(response.data)
        console.log('Botón 2 presionado para la ruta:', ruta.id);
        obtenerRutas();
    };

    const handlEditar = (ruta) => {
        // Implementa la lógica que deseas realizar al presionar el botón 2
        
        navigation.navigate('EditarRutas', { rutaId: ruta.id })
        console.log('Botón 1 presionado para la ruta:', ruta.id);
    }

    // Crear los datos de la tabla a partir de las rutas proporcionadas
  const tableData = rutas.map((ruta) => [
    ruta.nombre,
    ruta.user.fullName,
    getBarrios(ruta.barrio), // Usar join para obtener una cadena de los barrios separados por comas
    // getBarriosString(ruta.barrios),
    <View style={styles.btnContainer}>
        <TouchableOpacity
            style={[styles.btn, styles.btn1]}
            onPress={() => handlEditar(ruta)}
        >
            <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.btn, styles.btn2]}
            onPress={() => handlEstado(ruta)}
        >
            <Text style={styles.btnText}>
              {ruta.estado === 'ACTIVO' ? 'Desactivar' : 'Activar'}
            </Text>
        </TouchableOpacity>
    </View>,
  ]);

    

  return (

    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
          {/* Encabezados de la tabla */}
          <Row data={tableHead} style={styles.head} />

          {/* Datos de la tabla */}
          <Rows data={tableData} />
        </Table>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    btnContainer: { flexDirection: 'column' }, // Agregar esta línea para alinear los botones en una columna
    btn: { width: 58, height: 18, borderRadius: 2, marginBottom: 5 },
    btn1: { 
        backgroundColor: '#78B7BB',
        width: '100%',
        height: 22
     },
    btn2: { 
        backgroundColor: '#F19CBB',
        width: '100%',
        height: 22
     },
    btnText: { textAlign: 'center', color: '#fff' },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      
});