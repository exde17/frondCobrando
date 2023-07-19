import { Text, View, Button } from 'react-native'
import React, { Component } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Home() {
  const navigation = useNavigation();
    return (
      <View>
        <Text>Home</Text>
        
        <Button 
        title="Registro" 
        onPress={() => 
        navigation.navigate('RegisterScreen')}
        style={{
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
          marginTop: 10
        }}
        >

        </Button>
      </View>
    )
  }
