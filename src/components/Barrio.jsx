import { View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  FlatList, 
  Alert, 
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Modal
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants'
import axiosInstance from '../intersect/axiosInstance'

export default function Barrio() {
    const navigation = useNavigation();
    const url = Constants.expoConfig.extra.API_BASE_URL;
    const [nombre, setNombre]= useState('')
    const [barrios, setBarrios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBarrio, setSelectedBarrio] = useState(null);
    const [visible, setVisible] = useState(false);
    let num = 1; 

  // Obtener la lista de barrios desde la API
  const obtenerBarrios = async () => {
    try {
      const response = await axiosInstance.get(`${url}api/barrio`);
      // console.log('Datos recibidos:', response.data);
      setBarrios(response.data);
      setLoading(false); // Indicar que ya se han cargado los datos
    } catch (error) {
      console.log(error);
      setLoading(false); // Incluso en caso de error, se debe detener la carga
    }
  };

  // Llamar a obtenerBarrios cuando el componente se monta
  useEffect(() => {
    obtenerBarrios();
    // console.log('loading:', loading);
  }, []);

  // guardo el nombre del barrio seleccionado en el estado selecBarrio
  const editarBarrio = (id) => {
    console.log('Editar barrio con ID:', id);
    const barrio = barrios.find((item) => item.id === id);
    setSelectedBarrio(barrio);
    setVisible(true);
  };

  //controlamos si es ono visible el modal
  const handleVisibleModal = () => {
    setSelectedBarrio(null); // Reinicia el estado del barrio seleccionado a null
    setVisible(!visible); // Cambia el estado de visibilidad del Modal
  };

  ///////////editapropio barrio
  const handleUpdateBarrio = async () => {
    try {
      const response = await axiosInstance.patch(
        `${url}api/barrio/updateBarrio/${selectedBarrio.id}`,
        JSON.stringify({
          nombre_barrio: selectedBarrio.nombre_barrio,
        })
      );
      console.log(response.data);
      Alert.alert('Éxito', 'El barrio se ha actualizado correctamente.');
      obtenerBarrios();
      handleVisibleModal(); // Cierra el Modal después de actualizar
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Error',
        'Ha ocurrido un error al actualizar el barrio. Por favor, inténtalo nuevamente.'
      );
    }
  };
  
  
  //eliminar
  const eliminarBarrioConfirmado = async (id) => {
    
    const barrio = barrios.find((item) => item.id === id);
    setSelectedBarrio(barrio);

    console.log('la ruta: ',`${url}api/barrio/eliminar/${id}`)
    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de eliminar el barrio ${barrio.nombre_barrio}?`,
      [
        {
          text: 'Sí',
          onPress: async () => {
            try {
              const response = await axiosInstance.delete(`${url}api/barrio/eliminar/${id}`);
              console.log(response.data);
              Alert.alert('Éxito', `El barrio ${barrio.nombre_barrio} se ha eliminado correctamente.`);
              obtenerBarrios();
            } catch (error) {
              console.log(error);
              Alert.alert('Error', 'Ha ocurrido un error al eliminar el barrio. Por favor, inténtalo nuevamente.');
            }
          },
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
    );
  };
  

    //funcion para crear barrio
    const createBarrio = async () => {
        const full ={
            nombre_barrio: nombre
        }
        console.log(full)
        try {
            const response = await axiosInstance.post(`${url}api/barrio`,JSON.stringify({
                nombre_barrio: nombre,
            }));
            console.log(response.data);
            Alert.alert('Éxito', 'El barrio se ha creado correctamente.');
            obtenerBarrios()
            // navigation.navigate('SettingsScreen');
        } catch (error) {
            console.log(error);
            
           
            // Alert.alert('Error', 'Ha ocurrido un error al crear el barrio. Por favor, inténtalo nuevamente.');
        }
    }
            
  return (
    <SafeAreaView>
      {/* ///////////////////////modal de editar///////////////////////////7 */}
      <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={handleVisibleModal}
      >
        {selectedBarrio && (
          <View style={styles.form}>
            <TouchableOpacity onPress={handleVisibleModal}>
              <Text style={styles.txtClose}>Close</Text>
            </TouchableOpacity>
            <TextInput
              value={selectedBarrio.nombre_barrio}
              style={styles.text_input}
              placeholder="Nombre del Barrio"
              onChangeText={(text) =>
                setSelectedBarrio({ ...selectedBarrio, nombre_barrio: text })
              }
            />
            <TouchableOpacity onPress={handleUpdateBarrio} style={styles.btnContainer}>
              <Text style={styles.textButton}>Actualizar</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>

      {/* //////////////////////////////////////////////////////7 */}
    <View
        style={styles.container}
    >
      <TextInput
        style={styles.textInput}
        placeholder='Nombre del Barrio'
        placeholderTextColor="rgba(0,0,0,0.5)"
        onChangeText={text => setNombre(text)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={createBarrio}
      > 
        <Text style={styles.buttonText}>Crear</Text>

      </TouchableOpacity>

    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {barrios.map((item,index)=>{
                    
                    return(
                        <View style={styles.item_course} key={index}>
                            <View>
                                <Text style={styles.txt_name}>{index+1}</Text>
                                <Text style={styles.txt_item}>{item.nombre_barrio}</Text>
                            </View>
                            
                            <View>
                                <TouchableOpacity
                                    onPress={()=>eliminarBarrioConfirmado(item.id)}
                                >
                                    <Text style={styles.txt_del}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>editarBarrio(item.id)}
                                >
                                    <Text style={styles.txt_edit}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                    num += 1;
                })}
            </ScrollView>
    </View>
    {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
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
    },
    
    barrioRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    barrioText: {
      flex: 1,
    },
    editButtonText: {
      color: 'white',
      fontSize: 14,
    },
    editButton: {
      backgroundColor: '#2196F3',
      padding: 8,
      borderRadius: 5,
    },
    deleteButton: {
      backgroundColor: '#F44336',
      padding: 8,
      borderRadius: 5,
      marginLeft: 8,
    },
    deleteButtonText: {
      color: 'white',
      fontSize: 14,
    },
    ////////////////////////////////
    form:{
      padding : 15,
      // backgroundColor : "#e3e3e3",
      marginTop:10
  },
 
  txtClose:{
      fontSize:18,
      fontWeight : "bold",
      marginVertical : 10,
      textAlign : "right"
  },
  text_input:{
      padding :10,
      borderWidth :1,
      borderColor : "gray",
      borderRadius : 10,
      marginTop :10
  },
  header_container : {
      padding : 15,
      backgroundColor : "#eeeeee",
      flexDirection:"row",
      justifyContent : "space-between"
  },
  txt_main : {
      fontSize : 22,
      fontWeight : "bold"
  },
  item_course : {
      padding :15,
      width: '80%',
      borderBottomWidth: 1,
      borderBottomColor : "#e2e2e2",
      flexDirection : "row",
      justifyContent:"space-between"
  },
  txt_name : {
      fontSize : 18,
      marginTop : 5,
      
      // fontWeight : "bold"
  },
  // vista_name:{
  //   paddingLeft: '10%'
  // },
  txt_item : {
      fontSize : 14,
      marginTop : 5
  },
  txt_enabled : {
      fontSize : 14,
      marginTop : 5,
      color:"green",
      fontWeight : "bold"
  },
  txt_disabled : {
      fontSize : 14,
      marginTop : 5,
      color:"green",
      fontWeight : "bold"
  },
  txt_del:{
      fontSize : 14,
      marginTop : 5,
      color:"red",
      fontWeight : "bold"
  },
  txt_edit:{
      fontSize : 14,
      marginTop : 5,
      color:"blue",
      fontWeight : "bold"
  },
  btnContainer : {
      display : 'flex',
      padding :15,
      backgroundColor : "#000",
      marginTop : 20,
      
  },
  btnNewContainer : {
      padding :10,
      backgroundColor : "#000",
  },
  textButton : {
      textAlign : "center",
      color : "#FFF"
  },
  scrollViewContent: {
    paddingBottom: 190, // Ajusta el valor según el espacio necesario para el botón
    // width: '120%'
  },
  })