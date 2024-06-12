import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  SafeAreaView,
  StatusBar,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const Logout = ({ navigation }) => {
  const handleNavigationToLogin = async () => {
    navigation.navigate("Login", { screen: "Login" });
  };
  const handleNavigationToRegister = async () => {
    navigation.navigate("Register", { screen: "Register" });
  };
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#FCC72E", "white"]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 0,
          y: 1,
        }}
        style={styles.box}
      >
        <View style={styles.titleBox}>
          <Text style={styles.title}>PlayitaTaxi</Text>
          <Text style={styles.subtitle}>
            ¡Disfruta la playa sin preocupaciones!
          </Text>
        </View>
      </LinearGradient>
      <LinearGradient colors={["white", "#2EBEFC"]} style={styles.box2}>
        <View style={styles.brandContainer}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../assets/playiTaxiLogo.png")}
          />
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 12 }}>
              Playita Taxi
            </Text>
            <Text style={{ fontSize: 9 }}>@playitataxi.ec</Text>
          </View>
        </View>
        <View style={styles.registerBox}>
          <TouchableHighlight
            style={styles.button}
            onPress={handleNavigationToLogin}
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonBlack}
            onPress={handleNavigationToRegister}
          >
            <Text style={styles.buttonBlackText}>Registrarme</Text>
          </TouchableHighlight>
        </View>
      </LinearGradient>
      <View
        style={{
          position: "absolute",
          bottom: 2,
          left: "33%",
        }}
      >
        <Pressable
          onPress={() =>
            navigation.navigate("LoginDrivers", { screen: "LoginDrivers" })
          }
        >
          <Text>Acceso Conductores</Text>
        </Pressable>
      </View>
      <StatusBar hidden />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 30,
    gap: 5,
  },
  container: {
    flex: 1,
  },
  box: {
    width: "100%",
    height: "80%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box2: {
    width: "100%",
    height: "25%",
    paddingHorizontal: 10,
  },
  titleBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "black", // Use your brand colors
    fontFamily: "serif",
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 0,
  },

  registerBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    width: "49%",
    height: 65,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBlack: {
    borderColor: "black",
    backgroundColor: "black",
    borderRadius: 5,
    width: "49%",
    height: 65,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  buttonBlackText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
});

export default Logout;
