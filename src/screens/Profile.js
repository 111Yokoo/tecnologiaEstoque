import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
  StatusBar
} from "react-native";
import { useAuth } from "../context/useAuth";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons, Entypo
} from "@expo/vector-icons";
import MyButton from "../components/MyButton";
import { api } from "../services/api";
import UserPhoto from "../assets/user.png";
import * as ImagePicker from "expo-image-picker";
import createStyles from "../styles/ProfileStyles";
import { useThemeContext } from "../context/ThemeContext";

export default function Profile() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [editable, setEditable] = useState(false);
  const {updateUser, signOut} = useAuth();
  const { toggleTheme, colors } = useThemeContext();
  const styles = createStyles(colors);

  async function handleSubmit(){
    setError("");
    if(!email.trim() || !username.trim || !password.trim()) {
      setError("Prencha todos os campos");
      return;
    }
    try{
      await api.patch("profile",{
        email,
        username,
        password,
      })
      Alert.alert("Sucesso", "Usuário atualizado com sucesso")
      setEditable(false)
    }catch(error){
      if (error.response){
      setError(error.response.data.message);
    } else {
      setError("Não foi possivel se comunicar com o servidor. ");
    }
  }}
  async function pickImage() {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permissão necessária",
        "É necessário permitir acesso à galeria!"
      );
      return;
    }


    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      minWidth: 200,
      minHeight: 200,
      quality: 1,
    });


    if (pickerResult.canceled) {
      return;
    }


    if (pickerResult.assets && pickerResult.assets.length > 0) {
      const { width, height } = pickerResult.assets[0];


      if (width < 200 || height < 200) {
        Alert.alert(
          "Imagem muito pequena",
          "Escolha uma imagem com pelo menos 200x200 pixels."
        );
        return;
      }


      const uri = pickerResult.assets[0].uri;
      setPhotoUrl(uri);
      uploadPhoto(uri);
    } else {
      console.error("No assets found in pickerResult");
    }
  }
  async function uploadPhoto(localUri) {
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;


    let formData = new FormData();
    formData.append("photo", { uri: localUri, name: filename, type });


    try {
      const response = await api.put("/upload-photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });


      if (response.data && response.data.user) {
        const updatedUser = response.data.user;
        const fullPhotoUrl = `${updatedUser.photoUrl}`;
        setPhotoUrl(fullPhotoUrl);
        updatedUser.photoUrl = fullPhotoUrl;
        updateUser(updatedUser);
        Alert.alert("Sucesso", "Foto atualizada com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao enviar a foto: ", error);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Não foi possível conectar ao servidor");
      }
    }
  }
  useEffect(()=>{
    const fetchUserProfile = async () =>{
      try {
        const {data} = await api.get("/profile");
        setEmail(data.email);
        setUsername(data.username);
        setPhotoUrl(data.photoUrl);

      }catch (error) {
        console.log(error);
      }
    };
    fetchUserProfile();
  },[])
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={{ alignItems: "center" }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setEditable(true)}>
            <MaterialCommunityIcons name="pencil" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={{ fontSize: 28, fontWeight: "600", color: "#ffffff" }}>
            Perfil
          </Text>
          <TouchableOpacity onPress={() => signOut()}>
            <MaterialCommunityIcons name="logout" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileImageContainer}>
          <Image
          key={photoUrl}
          style={styles.profileImage}
          source={photoUrl ? {uri: `http://10.0.2.2:3333/${photoUrl}`}:UserPhoto }
          />
          <TouchableOpacity style={styles.cameraButton} onPress={()=> pickImage()} >
            <MaterialIcons name="camera-alt" size={32} color="white" />
          </TouchableOpacity>
        </View> 
      </View>
      <Text style={styles.username}>{username}</Text>

      <View
        style={{
          padding: 16,
          flex: 1,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            gap: 16,
            width: "100%",
          }}
        >
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text
              style={styles.text}
            >
              Meus Dados
            </Text>
            <TouchableOpacity style={styles.button} onPress={toggleTheme}>
                <Text style={styles.buttonText}>
                    {colors.text === "#FFFFFF" ? <Feather name="sun" size={30} color={colors.text} /> : <Entypo name="moon" size={30} color={colors.text} />}
                </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputBox}>
            <Feather name="user" size={24} color={colors.text} />
            <TextInput
              value={username}
              editable={editable}
              style={styles.input}
              onChangeText={(text) => setUsername(text)}
              placeholderTextColor={colors.text}
              color={colors.text}
            />
          </View>
          <View style={styles.inputBox}>
            <Feather name="mail" size={24} color={colors.text}  />
            <TextInput
              value={email}
              editable={editable}
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={colors.text}
              color={colors.text}
            />
          </View>
          <View>
            {editable && (
              <View style={styles.inputBox}>
                <Feather name="lock" size={24} color={colors.text}  />
                  <TextInput
                    style={styles.input}
                    value={password}
                    editable={editable}
                    onChangeText={(text) => {
                      setPassword(text);
                      }}
                      placeholderTextColor={colors.text}
                      color={colors.text}
                    secureTextEntry
                    placeholder="Senha atual ou nova senha"
                  />
              </View>
            )}
            <Text style={styles.error}>{error}</Text>
          </View>
        </View>
        {editable && 
            <View style={{ gap: 8, marginTop: 16, flexDirection: "row" }}>
              <MyButton color={colors.text} backgroundColor={colors.primary} onPress={() => setEditable(false)} style={{ flex: 1 }} text="Cancelar"  />
              <MyButton color={colors.text} backgroundColor={colors.primary} onPress={() => handleSubmit()} style={{ flex: 1 }} text="Salvar alterações" />
            </View>
        }
      </View>
    </ScrollView>
  );
}
