import React, {
    createContext,
    useCallback,
    useState,
    useContext,
    useEffect,
  } from "react";
  import AsyncStorage from "@react-native-community/async-storage";
  import { api } from "../services/api";
  
  
  const AuthContext = createContext({});
  
  
  export const AuthProvider = ({ children }) => {
    const [data, setData] = useState({});
  
  
    useEffect(() => {
      async function loadStorageData() {
        const [token, user] = await AsyncStorage.multiGet([
          "@tecnologia:token",
          "@tecnologia:user",
        ]);
  
  
        if (token[1] && user[1]) {
          api.defaults.headers.authorization = `Bearer ${token[1]}`;
          setData({ token: token[1], user: JSON.parse(user[1]) });
        }
      }
  
  
      loadStorageData();
    }, []);
  
  
    const signIn = useCallback(async ({ email, password }) => {
      const response = await api.post("login", { email, password });
      const { token, user } = response.data;
  
  
      await AsyncStorage.multiSet([
        ["@tecnologia:token", token],
        ["@tecnologia:user", JSON.stringify(user)],
      ]);
  
  
      api.defaults.headers.authorization = `Bearer ${token}`;
      setData({ token, user });
    }, []);
  
  
    const signOut = useCallback(async () => {
      await AsyncStorage.multiRemove(["@tecnologia:token", "@tecnologia:user"]);
      setData({});
    }, []);
  
    const updateUser = useCallback((updatedUser) => {
      setData((currentData) => ({ ...currentData, user: updatedUser})); 
      AsyncStorage.setItem("@tecnologia:user", Json.stringify(updateUser));
    }, []);
  
    return (
      <AuthContext.Provider value={{ ...data, signIn, signOut, updateUser}}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  
  export const useAuth = () => useContext(AuthContext);
  
  
  