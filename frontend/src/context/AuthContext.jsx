import { createContext, useContext, useEffect, useState } from "react";
import { refreshToken } from "../services/authService.js";
import { api } from "../api/axios.js";

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

  // Automatically attach/detach the token to the axios instance whenever it changes
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, isAuthenticated, setAccessToken, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

