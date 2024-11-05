import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/AppNavigation';

type LoginScreenProp = StackNavigationProp<RootStackParams, 'LoginScreen'>;

export const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenProp>();

  const handleLogin = async () => {
    if (username && password ) {

      const sesiones = JSON.parse(await AsyncStorage.getItem('usuarios')||"[]") as any[]

      if(sesiones.length) {
        const siHay = sesiones.filter((sesion)=>sesion.username === username && sesion.password===password)[0];
        if(siHay){
          navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
          });
        } else {
          Alert.alert('Error', 'Credenciales inválidas');
        }
      } else {
        Alert.alert('Error', 'Credenciales inválidas');
      }

      
    } else {
      Alert.alert('Error', 'Credenciales vacias');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Usuario</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.label}>Iniciar Sesión</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={
        ()=>{
          navigation.reset({
            index: 0,
            routes: [{ name: 'RegisterScreen' }],
          });
        }
      }>
        <Text style={styles.label}>Registrarse</Text>
      </TouchableOpacity>

  
      
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
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