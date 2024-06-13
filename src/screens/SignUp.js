import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StatusBar,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MyButton from "../components/MyButton";
import { api } from "../services/api";
import NavBarHeader from "../components/NavBarHeader/NavBarHeader";
import createStyles from "../styles/SignUpStyles";
import { useThemeContext } from "../context/ThemeContext";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { colors } = useThemeContext();
  const styles = createStyles(colors);

  async function handleSubmit() {
    setError("");
    if (!email.trim() || !username.trim() || !password.trim()) {
      setError("Por favor, preencha todos os campos!");
      return;
    }
    try {
      await api.post("register", {
        email,
        username,
        password,
      });
      Alert.alert("Sucesso", "Usuário criado com sucesso!");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Não foi possível se conectar com o servidor");
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
            Faça seu cadastro para começar a utilizar o app.
          </Text>
        </View>
        <View style={{ gap: 16 }}>
          <View style={styles.inputBox}>
            <Feather name="user" size={24} color="#8a8787" />
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              placeholderTextColor="#8a8787"
              color={colors.text}
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </View>
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
          {error && <Text style={styles.erro}>{error}</Text>}
          <MyButton
            onPress={() => handleSubmit()}
            text="Cadastrar"
            style={{ width: "100%" }}
            backgroundColor={colors.primary}
            color={colors.text}
          />
        </View>
      </View>
    </View>
  );
}