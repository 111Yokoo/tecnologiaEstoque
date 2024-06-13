import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MyButton from "../components/MyButton";
import { useAuth } from "../context/useAuth";
import NavBarHeader from "../components/NavBarHeader/NavBarHeader";
import createStyles from "../styles/SignInStyle";
import { useThemeContext } from "../context/ThemeContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const { colors } = useThemeContext();
  const styles = createStyles(colors);

  async function handleSubmit() {
    try {
      setError("");
      await signIn({ email, password });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Falha no login. Verifique suas credenciais.");
      }
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <NavBarHeader backgroundColor={colors.primary}/>
      <View style={styles.containerDentro}>
        <View>
          <Text style={styles.title}>Estamos quase lá.</Text>
          <Text style={styles.subtitle}>
            Faça seu login para começar a utilizar o app.
          </Text>
        </View>
        <View style={{ gap: 16 }}>
          <View style={styles.inputBox}>
            <Feather name="mail" size={24} color="#8a8787" />
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              placeholderTextColor="#8a8787"
              keyboardType="email-address"              
              color={colors.text}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputBox}>
            <Feather name="lock" size={24} color="#8a8787" />
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="#8a8787"
              secureTextEntry
              color={colors.text}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          {error && <Text>{error}</Text>}
          <MyButton
            onPress={handleSubmit}
            text="Login"
            style={{ width: "100%" }}
            backgroundColor={colors.primary}
            color={colors.text}
          />
        </View>
      </View>
    </View>
  );
}