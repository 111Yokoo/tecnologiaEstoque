import { StyleSheet } from "react-native";

const createStyles = (colors) => {
  return StyleSheet.create({
    container: {
        alignItems: "flex-start",
        backgroundColor: colors.background,
        flex:1
      },
      header: {
        backgroundColor: colors.primary,
        width: "100%",
        padding: 12,
        height: 90,
        gap: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      profileImageContainer: {
        alignItems: "center",
        position: "relative",
        marginTop: 20,
        marginBottom: -100,
      },
      profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 6,
        borderColor: colors.primary,
      },
      username: {
        alignSelf: "center",
        marginTop: 120,
        width: "60%",
        textAlign: "center",
        marginBottom: 8,
        fontSize: 40,
        fontWeight: "600",
        color: colors.text
      },
      cameraButton: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: colors.primary,
        padding: 8,
        borderRadius: 100,
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
      error: {
        color: "#DC1637",
        fontWeight: "400",
        textAlign: "center",
        marginTop: 8,
      },
      text: {
        fontSize: 18,
        color: colors.text,
        fontWeight: "400",
      }
  });
};

export default createStyles;