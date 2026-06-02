import { createContext, useState, useEffect } from "react";

import API from "../services/api";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      const response = await API.get("/profile");
      
      console.log(response)

      setUser(response.data.user);
    } catch (error) {
      console.log(error);

      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  console.log(user)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getCurrentUser();

      setUser(user)
    } 
    
      setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        setUser,
        getCurrentUser,
        loading,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
