import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, StatusBar, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import Logo from "../assets/logo.png";
import { api } from '../services/api'
import ProdutoItem from "../components/ProdutoItem"

export default function Home() {
    const navigation = useNavigation();
    const [produtos, setProdutos] = useState([]);
    const [query, setQuery] = useState("");
    useEffect(() => {
      fetchProdutos();
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
          console.log(response.data);
      } catch (error) {
          console.error('Erro ao buscar categorias:', error);
      }
  }

    const filteredProdutos = query ?
    produtos.filter((item) => item.produtos.toLowerCase().includes(query.toLowerCase()))
    : produtos;

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
            </View>
            <View style={style.addProduct}>
              <TouchableOpacity onPress={() => navigation.navigate("AddProduto")}>
                <Text style={{ fontSize: 18, fontWeight: 600}}>Adicionar produto +</Text>
              </TouchableOpacity>
            </View>
            <View>
            {produtos.map((produtos, index) => (
              <ProdutoItem data={produtos} key={index}/>
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
      height: 250,
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
  });
  