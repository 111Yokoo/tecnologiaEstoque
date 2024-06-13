import React from "react";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { useAuth } from "../context/useAuth";
import { useThemeContext } from "../context/ThemeContext";

const Routes = () => {
    const { user } = useAuth();
    const { toggleTheme, isDarkTheme, theme } = useThemeContext();

    return user ? (
        <AppRoutes 
            toggleTheme={toggleTheme} 
            isDarkTheme={isDarkTheme} 
            theme={theme} 
        />
    ) : (
        <AuthRoutes />
    );
};

export default Routes;
