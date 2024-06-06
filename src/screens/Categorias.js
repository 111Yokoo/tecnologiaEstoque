import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import CategoriasItem from "../components/CategoriaItem";
import { api } from "../services/api";

export default function Home() {
    const navigation = useNavigation();
    const [categorias, setCategorias] = useState([]);
    useEffect(() => {
        async function fetchCategories(){
            const response = await api.get('categories')
            setCategorias(response.data)
        }
        fetchCategories()
    }, []);
    return (
        <ScrollView>
            <View style={style.cabecalho}>
                <Image source={Logo} style={style.image} />
            </View>
            <View style={style.addProduct}>
                <TouchableOpacity onPress={() => navigation.navigate("AddCategoria")}>
                    <Text style={{ fontSize: 18, fontWeight: 600 }}>Adicionar categoria +</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginHorizontal: 25, gap: 10}}>
                {categorias.map((categoria, index) => (
                    <CategoriasItem data={categoria} key={index}/>
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
        justifyContent: "center",
        alignItems: "center"
    },
});