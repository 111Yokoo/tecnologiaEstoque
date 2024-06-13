import { StyleSheet } from "react-native";

const createStyles = (colors) => {
  return StyleSheet.create({
    background:{
        backgroundColor: colors.background,
        flex: 1
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
        borderWidth: 1,
        borderColor: colors.primary,
    },
    addProduct: {
        padding: 10,
    },
    picker: {
        width: "95%"
    },
    inputPicker: {
        backgroundColor: colors.background,
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderRadius: 4,
        width: "100%",
        borderWidth: 1,
        borderColor: colors.primary,
    },
    texto:{
        fontSize: 18, 
        color: colors.text
    }
  });
};

export default createStyles;