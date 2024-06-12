import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableHighlight,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { AntDesign, Fontisto } from "@expo/vector-icons";

//Coordinadas de Crucita
const INITIAL_REGION = {
  latitude: -0.863887,
  longitude: -80.528213,
  latitudeDelta: 0.06,
  longitudeDelta: 0,
};

const Home = ({ navigation }) => {
  //variables que cambian para seleccionar la ubicación del usuario en el mapa y mostrarla
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  //Variables que cambian para enviar peticiones a las tricimotos
  const [activePassenger, setActivePassenger] = useState(false);
  const [description, setDescription] = useState("");
  const [passengerNumbers, setPassengerNumbers] = useState(1);
  const [requestingDriver, setRequestingDriver] = useState(false);

  // Función asincrona para recibir la ubicación del usuario y guardarla en las variables con las que se inicia la vista del mapa
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0,
      });
    };

    getLocation();
  }, []);

  //  Funciones para registrar el número máximo y mínimo de pasajeros
  const addPassengers = () => {
    if (passengerNumbers < 5) {
      setPassengerNumbers(passengerNumbers + 1);
    }
    if (passengerNumbers >= 5) {
      console.warn("Número máximo de pasajeros es 5");
    }
  };
  const substractPassengers = () => {
    if (passengerNumbers > 1) {
      setPassengerNumbers(passengerNumbers - 1);
    }
    if (passengerNumbers <= 1) {
      console.warn("Número mínimo de pasajeros es 1");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        mapType="hybrid"
        showsMyLocationButton={true}
        showsUserLocation={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        scrollEnabled={true}
        rotateEnabled={true}
        toolbarEnabled={false}
        showsScale={true}
        showsCompass={true}
        showsBuildings={true}
        // showsTraffic={true}
        showsIndoors={true}
        showsIndoorLevelPicker={true}
      >
        {/* Marcador para realizar las peticiones a los conductores con la desrcipción del viaje */}
        {currentLocation && requestingDriver && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title={passengerNumbers + " pasajero(s)"}
            description={description}
          />
        )}
      </MapView>
      <View
        style={{
          position: "absolute",
          bottom: "5%",
          left: "41%",
          right: "auto",
        }}
      >
        {/* Botón para pedir Viaje */}
        <TouchableHighlight
          style={{
            backgroundColor: "#fff8",
            borderRadius: 100,
            padding: 5,
            width: 60,
            height: 60,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => setActivePassenger(!activePassenger)}
        >
          <Fontisto name="motorcycle" size={40} color="black" />
        </TouchableHighlight>
      </View>

      {/* Ventana emergente cuando el usuario pide un viaje */}
      {activePassenger && (
        <View
          style={{
            backgroundColor: "#333",
            borderRadius: 10,
            padding: 15,
            width: "100%",
            position: "absolute",
            bottom: "5%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "white",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              Selecciona tus preferencias
            </Text>
            <Pressable onPress={() => setActivePassenger(!activePassenger)}>
              <AntDesign name="close" size={28} color="white" />
            </Pressable>
          </View>

          {/* Buttons to select the number of passengers */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "white",
                paddingRight: 10,
              }}
            >
              Número de Pasajeros:
            </Text>
            <Pressable
              style={{
                width: 34,
              }}
              onPress={substractPassengers}
            >
              <AntDesign name="minuscircle" size={34} color="white" />
            </Pressable>
            <Text
              style={{
                fontSize: 24,
                color: "white",
                paddingHorizontal: 10,
              }}
            >
              {passengerNumbers}
            </Text>
            <Pressable
              style={{
                width: 34,
              }}
              onPress={addPassengers}
            >
              <AntDesign name="pluscircle" size={34} color="white" />
            </Pressable>
          </View>

          {/* Costo por viaje*/}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "white",
                paddingRight: 10,
              }}
            >
              Costo: $ {passengerNumbers * 0.5}
            </Text>
          </View>

          {/* Input para agregar descripciones extra del viaje */}
          <TextInput
            style={{
              height: 52,
              marginBottom: 20,
              paddingHorizontal: 15,
              fontSize: 16,
              borderWidth: 2,
              borderColor: "white",
              color: "white",
            }}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe tu viaje."
            placeholderTextColor="#fff"
            keyboardType="ascii-capable"
          />
          <TouchableHighlight
            style={{
              borderColor: "black",
              backgroundColor: "white",
              borderRadius: 5,

              width: "100%",
              height: 65,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              setRequestingDriver(!requestingDriver);
              setActivePassenger(!activePassenger);
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={{ fontSize: 22, color: "black" }}>
                Enviar Petición
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
