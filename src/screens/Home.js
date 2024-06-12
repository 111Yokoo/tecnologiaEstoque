import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, StatusBar, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import Logo from "../assets/logo.png";
import { api } from '../services/api'
import ProdutoItem from "../components/ProdutoItem";
import { Picker } from '@react-native-picker/picker';

export default function Home() {
    const navigation = useNavigation();
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
        <ScrollView>
          <StatusBar backgroundColor="#4543DE" barStyle="light-content" />
            <View style={style.cabecalho}>
                <Image source={Logo} style={style.image}/>
                <View style={style.inputBox}>
                    <FontAwesome name="search" size={24} color="black" />
                    <TextInput
                      style={style.input}
                      placeholder="Digite seu nome"
                      placeholderTextColor="#8a8787"
                      value={query}
                      onChangeText={(text) => setQuery(text)}
                    />
                </View>
                <Picker
                    selectedValue={selectedCategory}
                    style={style.inputBox}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                >
                    <Picker.Item label="Todas as categorias" value="" />
                    {categorias.map((categoria) => (
                        <Picker.Item key={categoria.id} label={categoria.name} value={categoria.id} />
                    ))}
                </Picker>
            </View>
            <View style={style.addProduct}>
              <TouchableOpacity onPress={() => navigation.navigate("AddProduto")}>
                <Text style={{ fontSize: 18, fontWeight: 600}}>Adicionar produto +</Text>
              </TouchableOpacity>
            </View>
            <View style={{padding: 10, gap: 10}}>
            {filteredProdutos.map((produtos, index) => (
              <ProdutoItem data={produtos} key={index} updateProducts={() => fetchProdutos()}/>
            ))}
            </View>
        </ScrollView>
    )
}
const style = StyleSheet.create({
    cabecalho: {
      alignItems: "center",
      justifyContent: "space-evenly",
      backgroundColor: "#4543DE",
      padding: 16,
      width: "100%",
      height: 290,
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
      justifyContent: "center", 
      alignItems: "center",
    },
    picker: {
      height: 50,
      width: '100%',
      color: '#000',
      backgroundColor: '#D9D9D9',
      borderRadius: 4,
      marginTop: 10,
  },
  });
  