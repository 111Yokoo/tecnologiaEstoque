import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import AddProduto from "../screens/AddProduto";
import Profile from "../screens/Profile";
import Categorias from "../screens/Categorias";
import AddCategoria from "../screens/AddCategoria";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function ProductStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddProduto" component={AddProduto} />
    </Stack.Navigator>
  )
}

function CategoriaStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Categorias" component={Categorias} />
      <Stack.Screen name="AddCategoria" component={AddCategoria} />
    </Stack.Navigator>
  )
}


export default function AppRoutes() {


  return (

    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#4543DE",
        tabBarInactiveTintColor: "#AEAEB3",
      }}
    >
      <Tab.Screen
        name="ProductStack"
        component={ProductStack}
        options={{
          title: "ProductStack",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={40}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CategoriaStack"
        component={CategoriaStack}
        options={{
          title: "CategoriaStack",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="format-list-bulleted-square" size={40} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          title: "profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={40}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
