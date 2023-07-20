import { View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  FlatList, 
  Alert, 
  ActivityIndicator,
  SafeAreaView,
  ScrollView
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants'
import axiosInstance from '../intersect/axiosInstance'
// import { useToast } from 'react-native-toast-message';
// import { Toast } from 'react-native-toast-message/lib/src/Toast'


export default function Barrio() {
    const navigation = useNavigation();
    const url = Constants.expoConfig.extra.API_BASE_URL;
    const [nombre, setNombre]= useState('')
    const [barrios, setBarrios] = useState([]);
    const [loading, setLoading] = useState(true);
    let num = 1; 

  // Obtener la lista de barrios desde la API
  const obtenerBarrios = async () => {
    try {
      const response = await axiosInstance.get(`${url}api/barrio`);
      console.log('Datos recibidos:', response.data);
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

   // Funciones de edición y eliminación
   const editarBarrio = (id) => {
    console.log('Editar barrio con ID:', id);
    // console.log('datos: ', barrios)
  };

  //eliminar barrio
  // const eliminarBarrioConfirmado = async (id) => {
  //   try {
  //     Alert.alert(
  //       'Confirmar eliminación',
  //       '¿Estás seguro de eliminar el barrio?',
  //       [
  //         {text: 'Sí'},
  //         {text: 'No'},
  //       ],
  //     );


  //     const response = await axiosInstance.delete(`${url}api/barrio/${id}`);
  //     console.log(response.data);
  //     Alert.alert('Éxito', 'El barrio se ha eliminado correctamente.');
      
  //     obtenerBarrios();
  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert('Error', 'Ha ocurrido un error al eliminar el barrio. Por favor, inténtalo nuevamente.');
  //   }

  const eliminarBarrioConfirmado = async (id) => {
    console.log('el mero: ', id)
    console.log('la ruta: ',`${url}api/barrio/eliminar/${id}`)
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de eliminar el barrio?',
      [
        {
          text: 'Sí',
          onPress: async () => {
            try {
              const response = await axiosInstance.delete(`${url}api/barrio/eliminar/${id}`);
              console.log(response.data);
              Alert.alert('Éxito', 'El barrio se ha eliminado correctamente.');
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

    <ScrollView>
                {barrios.map((item,index)=>{
                    
                    return(
                        <View style={styles.item_course} key={index}>
                            <View>
                                <Text style={styles.txt_name}>{index+1}</Text>
                                <Text style={styles.txt_item}>{item.nombre_barrio}</Text>
                                {/* <Text style={item.status === 1 ? styles.txt_enabled : styles.txt_disabled}>{item.status === 1 ? "Enabled" : "Disabled"}</Text> */}
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
      fontWeight : "bold"
  },
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
  })