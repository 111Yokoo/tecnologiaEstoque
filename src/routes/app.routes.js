import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import AddProduto from "../screens/AddProduto";
import Profile from "../screens/Profile";
import Categorias from "../screens/Categorias";
import AddCategoria from "../screens/AddCategoria";
import EditCategorias from "../screens/EditCategorias";
import EditProduto from "../screens/EditProduto";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useThemeContext } from "../context/ThemeContext";



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function ProductStack() {
  const { isDarkTheme, toggleTheme, colors } = useThemeContext();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home">
        {(props) => (
          <Home
            {...props}
            toggleTheme={toggleTheme}
            isDarkTheme={isDarkTheme}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="AddProduto" component={AddProduto} />
      <Stack.Screen name="EditProduto" component={EditProduto} />
    </Stack.Navigator>
  )
}

function CategoriaStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Categorias" component={Categorias} />
      <Stack.Screen name="AddCategoria" component={AddCategoria} />
      <Stack.Screen name="EditCategorias" component={EditCategorias} />
    </Stack.Navigator>
  )
}


export default function AppRoutes() {
  const { colors } = useThemeContext();
  return (

    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#000",
        tabBarInactiveBackgroundColor: colors.primary,
        tabBarActiveBackgroundColor: colors.primary
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
