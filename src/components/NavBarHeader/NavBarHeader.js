import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Logo from "../../assets/logo.png";

export default function NavBarHeader() {
    const navigation = useNavigation();
  return (
    <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={40} color="#000" />
        </TouchableOpacity>
        <Image source={Logo} style={style.imageBar}/>
      </View>
  );
}

const styles = StyleSheet.create({
    nav:{
        backgroundColor: "#4543DE", padding: 16, borderBottomRightRadius: 15, borderBottomLeftRadius: 15, display: "flex", flexDirection: "row", justifyContent: "space-between"
    }
});


const style = StyleSheet.create({
  imageBar: {
    height: 48,
    width: 44
  },
});
