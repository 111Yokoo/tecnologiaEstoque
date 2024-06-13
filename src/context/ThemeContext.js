import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider as PaperProvider } from "react-native-paper";

const ThemeContext = createContext();

const themes = {
  light: {
    colors: {
      primary: "#4543DE",
      background: "#FFFFFF",
      text: "#000000",
    },
  },
  dark: {
    colors: {
      primary: "#4371DE",
      background: "#1B1B1F",
      text: "#FFFFFF",
    },
  },
};

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("light");

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("themeName");
        if (savedTheme !== null) {
          setThemeName(savedTheme);
        }
      } catch (error) {
        console.error("Failed to load theme", error);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = themeName === "light" ? "dark" : "light";
      setThemeName(newTheme);
      await AsyncStorage.setItem("themeName", newTheme);
    } catch (error) {
      console.error("Failed to save theme", error);
    }
  };

  const { theme, colors } = themes[themeName];

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
