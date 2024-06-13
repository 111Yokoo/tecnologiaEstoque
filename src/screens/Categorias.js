import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Logo from '../assets/logo.png';
import CategoriasItem from '../components/CategoriaItem';
import { api } from '../services/api';
import createStyles from "../styles/CategoriasStyle";
import { useThemeContext } from "../context/ThemeContext";

export default function Home() {
    const navigation = useNavigation();
    const [categorias, setCategorias] = useState([]);
    const { colors } = useThemeContext();
    const styles = createStyles(colors);

    useEffect(() => {
        fetchCategories();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchCategories(); 
        }, [])
    );

    async function fetchCategories() {
        try {
            const response = await api.get('categories');
            setCategorias(response.data);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    }

    return (
        <ScrollView style={styles.background}>
            <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
            <View style={styles.cabecalho}>
                <Image source={Logo} style={styles.image} />
            </View>
            <View style={styles.addProduct}>
                <TouchableOpacity onPress={() => navigation.navigate('AddCategoria')}>
                    <Text style={styles.texto}>Adicionar categoria +</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 25, gap: 10 }}>
                {categorias.map((categoria, index) => (
                    <CategoriasItem data={categoria} color={colors.text} key={index} updateCategories={() => fetchCategories()}/>
                ))}
            </View>
        </ScrollView>
    );
}


const style = StyleSheet.create({
    
});
