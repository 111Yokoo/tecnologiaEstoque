import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import Logo from "../assets/logo.png";

export default function Home() {
    const navigation = useNavigation();
    const [produtos, setProdutos] = useState([]);
    const [query, setQuery] = useState("");
    useEffect(() => {
        fetch("http://10.0.2.2:3000/previsoes")
          .then((response) => response.json())
          .then((data) => setCidades(data));
      }, []);

    const filteredProdutos = query ?
    produtos.filter((item) => item.produtos.toLowerCase().includes(query.toLowerCase()))
    : produtos;

    return (
        <View style={{ justifyContent: "center", alignItems: "center", }}>
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
            {filteredProdutos.map((produto, index) => (
              <ProdutoItem cidade={produto} key={index}/>
            ))}
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
    },
  });
  