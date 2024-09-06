import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext({
  token: null,
  user: null,
  setToken: () => null, 
  logout: () => null,
});

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const decodedUser = jwtDecode(storedToken);
      setUser(decodedUser);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  const value = { token, user, setToken, logout };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
