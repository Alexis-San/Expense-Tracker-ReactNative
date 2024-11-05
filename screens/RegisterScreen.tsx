// src/screens/RegisterScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Navigation';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {

    if (username && password) {

      const sesiones = JSON.parse(await AsyncStorage.getItem('usuarios')||"[]") as any[]

      const existeUsuario = sesiones.filter(usuario=>usuario.username===username);

      if(!existeUsuario.length){
        sesiones.push({
          username,
          password
        });
        await AsyncStorage.setItem('usuarios',JSON.stringify(sesiones));
        Alert.alert('Registro exitoso', 'Usuario registrado correctamente');
        navigation.replace('LoginScreen');
      } else {
        Alert.alert('Error', 'El usuario ya está registrado');
      }

      
    } else {
      Alert.alert('Error', 'Por favor completa todos los campos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.label}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=> navigation.replace('LoginScreen')}>
        <Text style={styles.label}>Volver a Iniciar Sesión</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'black'
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
    textAlign:'center',
    margin:8
  },
  button:{
    alignContent:'center',
    backgroundColor:'green',
    margin:10
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
  forgotPasswordText: {
    marginTop: 15,
    color: 'white',
    textAlign: 'center',
  },
});