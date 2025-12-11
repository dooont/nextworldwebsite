import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { refreshToken } from "../services/authService.js";

const AuthContext = createContext();

/**
 * On mount, automatically logs user in by checking if refreshToken is valid, retrieving a new accessToken in the process
 * AuthProvider() - Provider.
 * useAuth() - Consumer. Exposes accessToken, isAuthenticated, setAccessToken, setIsAuthenticated
 */
export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const attemptLogin = async () => {
      try {
        const newAccessToken = await refreshToken();
        setAccessToken(newAccessToken);
        setIsAuthenticated(true);
      } catch (err) {
        if (err.response?.status === 400 || err.response?.status === 401) {
          //no access token found or invalid
          return;
        }

        console.error("Error retrieving refresh token: ", err);
      }
    };
    attemptLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, isAuthenticated, setAccessToken, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

