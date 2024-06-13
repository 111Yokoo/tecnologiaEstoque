import { StyleSheet } from "react-native";

const createStyles = (colors) => {
  return StyleSheet.create({
    background:{
        backgroundColor: colors.background,
        flex: 1
    },
    cabecalho: {
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: colors.primary,
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
        backgroundColor: colors.background,
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
    texto:{
        fontSize: 18, 
        color: colors.text
    }
  });
};

export default createStyles;