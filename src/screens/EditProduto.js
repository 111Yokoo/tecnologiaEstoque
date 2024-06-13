import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Alert } from "react-native";
import NavBarHeader from "../components/NavBarHeader/NavBarHeader";
import { Picker } from "@react-native-picker/picker"
import { useState, useEffect } from "react";
import { api } from '../services/api'
import MyButton from "../components/MyButton";
import createStyles from "../styles/EditProdutoStyles";
import { useThemeContext } from "../context/ThemeContext";
import {
    MaterialCommunityIcons,
    Fontisto
  } from "@expo/vector-icons";

  const EditProdutos = ({ route }) => {
    const { id } = route.params;
    const [produtoNome, setProdutoNome] = useState("");
    const [produtoCategoria, setProdutoCategoria] = useState("");
    const [produtoQuantidade, setProdutoQuantidade] = useState("");
    const [produtoPreco, setProdutoPreco] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState("");
    const { colors } = useThemeContext();
    const styles = createStyles(colors);

    useEffect(() => {
        fetchCategories();
        fetchProdutos();
    }, []);

    async function fetchCategories() {
        try {
            const response = await api.get('categories');
            setCategorias(response.data);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    }
    async function fetchProdutos() {
        try {
            const response = await api.get(`products/${id}`);
            setProdutoNome(response.data.name);
            setProdutoQuantidade(String(response.data.amount));
            setProdutoPreco(String(response.data.value));
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    }
    async function handleSubmit() {
        setError("");
        if (!produtoNome.trim() || !produtoQuantidade.trim() || !produtoPreco.trim()) {
            setError("Por favor, preencha todos os campos!");
            return;
        }
        if(produtoCategoria == []){
            setError("Por favor, preencha o campo categoria!");
            return;
        }
        try {
            await api.patch(`products/${id}`, {
                name: produtoNome,
                amount: Number(produtoQuantidade),
                value: Number(produtoPreco),
                categoryId: Number(produtoCategoria)
            });
            Alert.alert("Sucesso", "Produto atualizado com sucesso!");
            setProdutoNome("");
            setProdutoQuantidade("");
            setProdutoPreco("");
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
                <Text style={styles.texto}>Edite seu produto</Text>
            </View>
            <View style={{ justifyContent: "space-between", height: "75%", padding: 20 }}>
                <View style={{gap: 15}}>
                    <View style={styles.inputBox}>
                        <MaterialCommunityIcons name="pencil" size={28} color={colors.text} />
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do produto"
                            placeholderTextColor={colors.text}
                            color={colors.text} 
                            value={produtoNome}
                            onChangeText={(text) => setProdutoNome(text)}
                        />
                    </View>
                    <View style={styles.inputBox}>
                    <MaterialCommunityIcons name="toolbox" size={28} color={colors.text} />
                        <TextInput
                            style={styles.input}
                            placeholder="Quantidade"
                            placeholderTextColor={colors.text}
                            value={produtoQuantidade}
                            color={colors.text} 
                            onChangeText={(text) => setProdutoQuantidade(text)}
                        />
                    </View>
                    <View style={styles.inputBox}>
                    <Fontisto name="dollar" size={28} color={colors.text} />
                        <TextInput
                            style={styles.input}
                            placeholder="Preço"
                            placeholderTextColor={colors.text}
                            value={produtoPreco}
                            color={colors.text} 
                            onChangeText={(text) => setProdutoPreco(text)}
                        />
                    </View>
                    <View style={styles.inputPicker}>
                        <MaterialCommunityIcons name="shopping-outline" size={28} color={colors.text} />
                        <Picker style={styles.picker} selectedValue={produtoCategoria} onValueChange={(itemValue) => setProdutoCategoria(itemValue)} >
                            <Picker.Item label="Selecione uma categoria" value="" color={colors.text} />
                            {categorias.map((categoria, index) => (
                                <Picker.Item key={index} color={colors.primary} label={categoria.name} value={categoria.id}/>
                            ))}
                        </Picker>
                    </View>
                    {error && <Text>{error}</Text>}
                </View>
                <MyButton
                    onPress={() => handleSubmit()}
                    text="Atualizar produto"
                    style={{ width: "100%" }}
                    backgroundColor={colors.primary}
                    color={colors.text}
                />
                
            </View>
        </View>
    )
}
export default EditProdutos;

