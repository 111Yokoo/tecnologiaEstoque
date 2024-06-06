import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import NavBarHeader from "../components/NavBarHeader/NavBarHeader";
import { useState, useEffect } from "react";
import { api } from '../services/api'
import MyButton from "../components/MyButton";

export default function Home() {
    const [categoria, setCategoria] = useState("");
    const [error, setError] = useState("");
    async function handleSubmit() {
        setError("");
        if (!categoria.trim()) {
            setError("Por favor, preencha o campo nome!");
            return;
        }
        try {
            await api.post("categories", {
                name: categoria,
            });
            Alert.alert("Sucesso", "Categoria criada com sucesso!");
            stop;
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Não foi possível se conectar com o servidor");
            }
        }
    }
    return (
        <View>
            <NavBarHeader />
            <View style={{ justifyContent: "center", alignItems: "center", padding: 40 }}>
                <Text style={{ fontSize: 18, fontWeight: 600 }}>Adicione sua categoria</Text>
            </View>
            <View style={{ justifyContent: "space-between", height: "75%", padding: 20 }}>
                <View>
                    <View style={style.inputBox}>
                        <TextInput
                            style={style.input}
                            placeholder="Nome da categoria"
                            placeholderTextColor="#8a8787"
                            value={categoria}
                            onChangeText={(text) => setCategoria(text)}
                        />
                    </View>
                    {error && <Text>{error}</Text>}
                </View>
                <MyButton
                    onPress={() => handleSubmit()}
                    text="Adicionar categoria"
                    style={{ width: "100%" }}
                    backgroundColor="#4543DE"
                    color="#FFF"
                />
                
            </View>
        </View>
    )
}


const style = StyleSheet.create({
    cabecalho: {
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#4543DE",
        padding: 16,
        width: "100%",
        height: 180,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15
    },
    image: {
        height: 128,
        width: 124
    },
    input: {
        fontSize: 18,
    },
    inputBox: {
        backgroundColor: "#D9D9D9",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        padding: 16,
        borderRadius: 4,
        width: "100%",
    },
    addProduct: {
        padding: 10,
    },
});
