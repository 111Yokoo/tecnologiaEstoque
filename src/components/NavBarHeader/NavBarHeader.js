import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function NavBarHeader() {
    const navigation = useNavigation();
  return (
    <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={32} color="#000" />
        </TouchableOpacity>
        <Text>Logo</Text>
      </View>
  );
}

const styles = StyleSheet.create({
    nav:{
        backgroundColor: "#4543DE", padding: 16, borderBottomRightRadius: 15, borderBottomLeftRadius: 15, display: "flex", flexDirection: "row", justifyContent: "space-between"
    }
});
