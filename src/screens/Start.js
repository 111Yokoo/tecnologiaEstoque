import React from "react";
import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../assets/logo.png";
import MyButton from "../components/MyButton";
import createStyles from "../styles/StartStyles";
import { useThemeContext } from "../context/ThemeContext";

export default function Start() {
  const navigation = useNavigation();
  const { colors } = useThemeContext();
  const styles = createStyles(colors);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Image source={Logo} style={styles.image} />
      <View style={{alignItems: "center"}}>
        <Text style={styles.title}>Seja Bem-Vindo</Text>
        <Text style={styles.subtitle}>O que você deseja fazer?</Text>
      </View>
      <View style={styles.texts}>
        <MyButton text="Login" onPress={() => navigation.navigate("SignIn")} style={{flex: 1}} backgroundColor={colors.background} color={colors.text}/>
        <MyButton text="Cadastrar" onPress={() => navigation.navigate("SignUp")} style={{flex: 1}} backgroundColor={colors.background} color={colors.text}/>
      </View>
    </View>
  );
}
