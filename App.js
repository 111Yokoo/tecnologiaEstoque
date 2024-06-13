import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import AppProvider from "./src/context";
import { ThemeProvider } from "./src/context/ThemeContext";


export default function App(){
    return(
        <NavigationContainer>
            <ThemeProvider>
                <AppProvider>
                    <Routes/>
                </AppProvider>
            </ThemeProvider>
        </NavigationContainer>
    );
}