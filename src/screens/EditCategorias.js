import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, StatusBar } from "react-native";
import NavBarHeader from "../components/NavBarHeader/NavBarHeader";
import { useState, useEffect } from "react";
import { api } from '../services/api'
import MyButton from "../components/MyButton";
import createStyles from "../styles/EditCategoriasStyle";
import { useThemeContext } from "../context/ThemeContext";
import {
    MaterialCommunityIcons,
  } from "@expo/vector-icons";

const EditCategorias = ({ route }) => {
    const { id } = route.params;
    const [categoria, setCategoria] = useState("");
    const [error, setError] = useState("");
    const { colors } = useThemeContext();
    const styles = createStyles(colors);
    async function handleSubmit() {
        setError("");
        if (!categoria.trim()) {
            setError("Por favor, preencha o campo nome!");
            return;
        }
        try {
            await api.patch(`categories/${id}`, {
                name: categoria,
            });
                Alert.alert("Sucesso", "Categoria atualizada com sucesso!");
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Não foi possível se conectar com o servidor");
            }
        }
    }
    return (
        <View style={styles.background}>
            <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
            <NavBarHeader backgroundColor={colors.primary}/>
            <View style={{ justifyContent: "center", alignItems: "center", padding: 40 }}>
                <Text style={styles.texto}>Renomeie sua categoria</Text>
            </View>
            <View style={{ justifyContent: "space-between", height: "75%", padding: 20 }}>
                <View>
                    <View style={styles.inputBox}>
                        <MaterialCommunityIcons name="pencil" size={28} color={colors.text} />
                        <TextInput
                            style={styles.input}
                            placeholder="Nome da categoria"
                            placeholderTextColor={colors.text}
                            value={categoria}
                            onChangeText={(text) => setCategoria(text)}
                        />
                    </View>
                    {error && <Text>{error}</Text>}
                </View>
                <MyButton
                    onPress={() => handleSubmit()}
                    text="Salvar categoria"
                    style={{ width: "100%" }}
                    backgroundColor={colors.primary}
                    color={colors.text}
                />
                
            </View>
        </View>
    )
}
export default EditCategorias;