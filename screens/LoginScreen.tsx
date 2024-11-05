// LoginScreen.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

// Inicialización de Firebase
initializeApp(firebaseConfig);

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, complete todos los campos.");
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("Inicio de sesión exitoso", `¡Bienvenido de nuevo, ${user.email}!`);
        navigation.navigate("Root", { screen: "Home" });
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Error de inicio de sesión", errorMessage);
      });
  };

  const handleNavigateToRegister = () => {
    navigation.navigate("RegisterScreen"); // Navegar a la pantalla de registro
  };

  const handlePasswordRecovery = () => {
    if (!email) {
      Alert.alert("Error", "Por favor, ingresa tu correo electrónico.");
      return;
    }

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Correo de recuperación enviado", "Revisa tu bandeja de entrada para restablecer tu contraseña.");
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Error al recuperar contraseña", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/money12.png")} style={styles.logo} />
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNavigateToRegister}>
        <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate aquí</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePasswordRecovery}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  logo: {
    width: 350,
    height: 200,
    alignSelf: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 12,
    color: "#007BFF",
    textAlign: "center",
  },
  forgotPasswordText: {
    marginTop: 12,
    color: "#007BFF",
    textAlign: "center",
  },
});

