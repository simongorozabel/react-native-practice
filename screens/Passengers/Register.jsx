import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegistration = async (nickname, email, password, phone) => {
    try {
      const response = await axios.post(
        "https://playitataxi-backend.onrender.com/passengers",
        {
          nickname, // Replace with username state variable
          email, // Replace with email state variable
          password, // Replace with password state variable
          phone,
        }
      );

      if (response.status === 201) {
        console.log("Registration successful!");
        // Handle successful registration (e.g., navigate to login screen)
        navigation.navigate("Root");
      } else {
        console.error("Registration failed:", response.data.message);
        // Handle registration failure (e.g., display error message to user)
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle errors (e.g., network issues, server errors)
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={{ width: 24 }}
        onPress={() => navigation.navigate("Logout")}
      >
        <AntDesign name="back" size={24} color="black" />
      </Pressable>
      <Text style={styles.title}>Registrate</Text>

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
        value={nickname}
        onChangeText={setNickname}
        placeholder="Nickname"
        keyboardType="name-phone-pad"
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
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Número de Celular"
        keyboardType="phone-pad"
        autoCapitalize="none"
      />
      <TouchableHighlight
        style={styles.button}
        onPress={() => handleRegistration(nickname, email, password, phone)}
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
          <Text style={styles.buttonText}>UNIRME</Text>
        </LinearGradient>
      </TouchableHighlight>
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

export default Register;
