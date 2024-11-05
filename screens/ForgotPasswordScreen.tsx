import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ForgotPasswordScreenProp = StackNavigationProp<RootStackParams, 'ForgotPasswordScreen'>;

export const ForgotPasswordScreen = () => {

  const [username, setUsername] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');

  const navigation = useNavigation<ForgotPasswordScreenProp>();

  const handlePasswordReset = async () => {

    const sesiones = JSON.parse(await AsyncStorage.getItem('usuarios')||"[]") as any[];

    const existeUsuario = sesiones.filter(usuario=>usuario.username===username);

    if(existeUsuario.length && pass1===pass2){
      const nuevaSesiones = sesiones.filter(usuario=>usuario.username!==username);
      nuevaSesiones.push({
        username,
        password:pass1
      });
      await AsyncStorage.setItem('usuarios', JSON.stringify(nuevaSesiones));
      Alert.alert("Exito", "Se ha cambiado la contraseña.");
      navigation.goBack();
    } else {
      Alert.alert("Error", "Algo salió mal.");
    }


  };

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Ingresa tu nombre de usuario</Text>
      
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Ingresa tu nueva contraseña</Text>
      <TextInput
        style={styles.input}
        value={pass1}
        onChangeText={setPass1}
        secureTextEntry
      />
      <Text style={styles.label}>Ingresa otra vez tu nueva contraseña</Text>
      <TextInput
        style={styles.input}
        value={pass2}
        onChangeText={setPass2}
        secureTextEntry
      />


      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.label}>Recuperar Contraseña</Text>
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