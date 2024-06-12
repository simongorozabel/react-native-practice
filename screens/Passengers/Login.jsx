import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // navigation.navigate("Root");

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(
        "https://playitataxi-backend.onrender.com/passengers/login",
        {
          email, // Replace with username state variable
          password, // Replace with password state variable
        }
      );

      if (response.status === 200) {
        console.log("Login successful!");
        // Handle successful login (e.g., navigate to a different screen)
        navigation.navigate("Root");
      } else {
        console.error("Login failed:", response.data.message);
        // Handle login failure (e.g., display error message to user)
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle errors (e.g., network issues, server errors)
    }
  };

  const handleNavigationToRegister = async () => {
    console.log("Register clicked! (Implement register logic)");
    navigation.navigate("Register", { screen: "Register" });
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={{ width: 24 }}
        onPress={() => navigation.navigate("Logout")}
      >
        <AntDesign name="back" size={24} color="black" />
      </Pressable>
      <Text style={styles.title}>Ingresar</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Contraseña"
        autoCapitalize="none"
        secureTextEntry
      />
      <TouchableHighlight
        style={styles.button}
        onPress={() => handleLogin(email, password)}
      >
        <LinearGradient
          colors={["#FCC72E", "#2EBEFC"]}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 1,
            y: 0,
          }}
          style={styles.box}
        >
          <Text style={styles.buttonText}>INGRESAR</Text>
        </LinearGradient>
      </TouchableHighlight>
      <Text style={styles.link} onPress={handleNavigationToRegister}>
        ¿Aún no tienes cuenta? Regístrate aquí.
      </Text>
      {/* {isLogged && navigation.navigate("Root")} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "start",
    paddingTop: 50,
    padding: 20,
    backgroundColor: "white", // Use your brand colors
  },
  box: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black", // Use your brand colors
    paddingVertical: 20,
    fontFamily: "serif",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    height: 52,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "black",
  },
  link: {
    marginTop: 15,
    color: "blue",
  },
  button: {
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 5,

    width: "100%",
    height: 65,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black", // Use your brand colors
  },
});

export default Login;
