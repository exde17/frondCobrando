import { Text, View, Button, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Home() {
  const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Home</Text>
        
        <Button 
        title="Registro" 
        onPress={() => 
        navigation.navigate('RegisterScreen')}
        style={styles.button}
        >

        </Button>
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: '20%',
      
    
      // justifyContent: 'center',
    },
    button:{
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      width:'80%',
      // fontSize: 15

    },
    text:{
      color: 'black',
      fontSize: 20,
      textAlign: 'center'
    }

  })
