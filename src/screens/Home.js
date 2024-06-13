import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, StatusBar, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import Logo from "../assets/logo.png";
import { api } from '../services/api';
import ProdutoItem from "../components/ProdutoItem";
import { Picker } from '@react-native-picker/picker';
import createStyles from "../styles/HomeStyles";
import { useThemeContext } from "../context/ThemeContext";

export default function Home() {
    const navigation = useNavigation();
    const { colors } = useThemeContext();
    const styles = createStyles(colors);
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        fetchProdutos();
        fetchCategorias();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchProdutos();
        }, [])
    );

    async function fetchProdutos() {
        try {
            const response = await api.get('products');
            setProdutos(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    async function fetchCategorias() {
        try {
            const response = await api.get('categories');
            setCategorias(response.data);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    }

    const filteredProdutos = produtos.filter((item) => {
        const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = selectedCategory ? item.categoryId === selectedCategory : true;
        return matchesQuery && matchesCategory;
    });

    return (
        <ScrollView style={styles.background}>
            <StatusBar backgroundColor={colors.primary} barStyle={colors.text === "#FFFFFF" ? "light-content" : "dark-content"} />
            <View style={styles.cabecalho}>
                <Image source={Logo} style={styles.image} />
                <View style={styles.inputBox}>
                    <FontAwesome name="search" size={24} color="black" />
                    <TextInput
                        style={styles.input}
                        placeholder="Procure o produto"
                        placeholderTextColor="#8a8787"
                        value={query}
                        onChangeText={(text) => setQuery(text)}
                    />
                </View>
                <Picker
                    selectedValue={selectedCategory}
                    style={styles.inputBox}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                >
                    <Picker.Item label="Todas as categorias" value="" />
                    {categorias.map((categoria) => (
                        <Picker.Item key={categoria.id} label={categoria.name} value={categoria.id} />
                    ))}
                </Picker>
            </View>
            <View style={styles.addProduct}>
                <TouchableOpacity onPress={() => navigation.navigate("AddProduto")}>
                    <Text style={styles.texto}>Adicionar produto +</Text>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10, gap: 10 }}>
                {filteredProdutos.map((produtos, index) => (
                    <ProdutoItem color={colors.text} data={produtos} key={index} updateProducts={() => fetchProdutos()} />
                ))}
            </View>
        </ScrollView>
    )
}