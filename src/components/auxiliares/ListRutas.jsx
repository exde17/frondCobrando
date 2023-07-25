import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, SafeAreaView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import axiosInstance from '../../intersect/axiosInstance'
import Constants from 'expo-constants'
import { Table, Row, Rows, Cell } from 'react-native-table-component';
// import { xorBy } from 'lodash'
// import SelectBox from 'react-native-multi-selectbox'


export default function ListRutas() {

  // Definir los encabezados de la tabla  
  const tableHead = ['Nombre', 'Cobrador', 'Barrios', 'Accion'];
  const [rutas, setRutas] = useState([]);
  const [idCuestion, setIdCuestion] = useState('');
  const [visible, setVisible] = useState(false);
  const [nombreRuta, setNombreRuta] = useState('');
  const [selectedTeam, setSelectedTeam] = useState({});
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [cobrador, setCobrador] = useState([])
  const [barrios, setBarrios] = useState([]);


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
            obtenerRutas();
            // obtenerCobradores();
            // obtenerBarrios();
        },[]
    );

    // sacando los barrio
    // const getBarrios = () => {
    // return rutas.flatMap((ruta) => ruta.barrio);
    // };
    const getBarrios = (barrios) => {
        return barrios.map((barrio) => barrio).join(', ');
      };

    // guardo el 
  // const verModal = (ruta) => {
  //   console.log('El ID de la ruta:', ruta.id);
  //   setIdCuestion(ruta.id)
  //   setVisible(true);
  // };

  //controlamos si es ono visible el modal
  // const handleVisibleModal = () => {
  //   setSelectedBarrio(null); // Reinicia el estado del barrio seleccionado a null
  //   setVisible(!visible); // Cambia el estado de visibilidad del Modal
  // };

    // Función para manejar la acción del botón 2
    const handlEstado = (ruta) => {
        // Implementa la lógica que deseas realizar al presionar el botón 2
        setIdCuestion(ruta.id)
        console.log('Botón 2 presionado para la ruta:', ruta.id);
    };

    const handlEditar = (ruta) => {
        // Implementa la lógica que deseas realizar al presionar el botón 2
        setIdCuestion(ruta.id)
        console.log('Botón 1 presionado para la ruta:', ruta.id);
    }

    // Función onChange dentro del componente Ruta
    // function onChange(val) {
    //     setSelectedTeam(val);
    // }

    // Función onMultiChange dentro del componente Ruta
    // function onMultiChange() {
    //     return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
    // }

     // Función para transformar el array de barrios a un formato compatible con SelectBox
    // function transformBarriosToOptions(barrios) {
    //     return barrios.map((barrio) => ({
    //     item: barrio.nombre_barrio,
    //     id: barrio.id,
    //     }));
    // }

    // Función para transformar el array de cobradores a un formato compatible con SelectBox
    // function transformCobradoresToOptions(cobrador) {
    //     return cobrador.map((cobrado) => ({
    //     item: cobrado.fullName,
    //     id: cobrado.id,
    //     }));
    // }

    //update rutas
    // const updateRuta = ()=>{
    //     try {
    //         axiosInstance.put(`${url}api/rutas/${idCuestion}`)
    //         .then(response => {
    //         console.log(response);
    //         console.log(response.data);
    //     })
    //     } catch (error) {
    //         console.log(error);

    //     }
        

    // }

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
            <Text style={styles.btnText}>Desactivar</Text>
        </TouchableOpacity>
    </View>,
  ]);

    

  return (
    // <ScrollView vertical={true}>
    <View>

    {/* Contenido fuera del modal */}
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

    {/* <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={handleVisibleModal}
    >
     
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Nombre Ruta"
          placeholderTextColor="rgba(0,0,0,0.5)"
          onChangeText={(text) => setNombreRuta(text)}
        />

        <SelectBox
          label="Seleccionar Cobrador"
          options={transformCobradoresToOptions(cobrador)}
          selectedValues={selectedTeam}
          onChange={onChange}
          hideInputFilter={false}
        />

        <SelectBox
          label="Seleccionar Barrios"
          options={transformBarriosToOptions(barrios)}
          selectedValues={selectedTeams}
          onMultiSelect={onMultiChange()}
          onTapClose={onMultiChange()}
          isMulti
        />

        <TouchableOpacity style={styles.button} onPress={updateRuta}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>
    </Modal> */}
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
});