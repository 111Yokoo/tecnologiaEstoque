import { StyleSheet } from "react-native";

const createStyles = (colors) => {
  return StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "space-between",
        backgroundColor: colors.background
      },
      containerDentro: {
        flex: 0.8,
        alignItems: "stretch",
        justifyContent: "space-between",
        padding: 16,
      },
    
      title: {
        fontSize: 54,
        fontWeight: "700",
        width: 240,
        color: colors.text,
      },
    
      subtitle: {
        fontSize: 20,
        fontWeight: "300",
        width: 280,
        marginTop: 16,
        color: colors.text,
      },
    
      inputBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 4,
        width: "100%",
      },
    
      input: {
        flex: 1,
        fontSize: 18,
      },
      erro: {
        color: "#DC1637",
        fontWeight: "400",
        textAlign: "center",
        marginVertical: 16,
      },
  });
};

export default createStyles;