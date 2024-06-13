import { StyleSheet } from "react-native";

const createStyles = (colors) => {
  return StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: colors.primary,
        padding: 16,
      },
      image: {
        height: 208,
        width: 204
      },
      texts: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: 16,
      },
      title: {
        fontSize: 40,
        fontWeight: "900",
        width: "100%",
        color: colors.text,
        textAlign: "center",
      },
      subtitle: {
        fontWeight: "400",
        color: "#AEAEB3",
        marginTop: 16,
      },
  });
};

export default createStyles;