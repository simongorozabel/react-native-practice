import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Logout from "./components/Logout";
import Login from "./screens/Passengers/Login";
import Home from "./screens/Passengers/Home";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import Register from "./screens/Passengers/Register";

import LoginDrivers from "./screens/Drivers/LoginDrivers";
import HomeDrivers from "./screens/Drivers/HomeDrivers";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Encuentra Trici-motos" component={Home} />
      <Drawer.Screen name="Pérfil" component={Profile} />
      <Stack.Screen name="Configuración" component={Settings} />
    </Drawer.Navigator>
  );
}

function RootDrivers() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Encuentra Clientes Activos"
        component={HomeDrivers}
      />
      <Drawer.Screen name="Pérfil" component={Profile} />
      <Stack.Screen name="Configuración" component={Settings} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Logout"
          component={Logout}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginDrivers"
          component={LoginDrivers}
        />
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
