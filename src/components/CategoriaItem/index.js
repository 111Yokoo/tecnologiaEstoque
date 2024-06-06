import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
    Feather,
    MaterialCommunityIcons,
    MaterialIcons,
  } from "@expo/vector-icons";
import { useState, useEffect } from "react";

export default function CategoriaItem({data}) {
    const [categorias, setCategorias] = useState("");
    function deleteItem(){
        Alert.alert("Confirmar Exclusão", "Você tem certeza que deseja excluir este produto?", 
        [
            {text: "Cancelar", style: "cancel"},
            {text: "Ok", onPress: () => {
                const updatedCategories = categorias.filter((_, i) => i !== index);
                setCategorias(updatedCategories);
                if(editingCategories === index){
                    setCategoriasName('');

                }
            }}
        ])
    }
  return (
    <View style={styles.itemCategoria}>
        <Text style={{fontWeight: "500", fontSize: 18}}>{data.name}</Text>
        <View style={styles.buttonsCategoria}>
            <TouchableOpacity onPress={() => {}}>
                <MaterialCommunityIcons name="pencil" size={28} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteItem()}>
                <MaterialCommunityIcons name="trash-can" size={28} color="#000" />
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    alignItems: "center",
    borderRadius: 4,
  },
  itemCategoria:{
    width: "100%",
    height: 70,
    borderWidth: 2,
    borderColor: "#8a8787",
    borderRadius: 4,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonsCategoria:{
    flexDirection: "row"
  }
});
