import { StyleSheet } from "react-native";

const createStyles = (colors) => {
  return StyleSheet.create({
    background:{
        backgroundColor: colors.background,
    },
    cabecalho: {
      alignItems: "center",
      justifyContent: "space-evenly",
      backgroundColor: colors.primary,
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
    texto:{
        fontSize: 18, 
        color: colors.text
    }
  });
};

export default createStyles;