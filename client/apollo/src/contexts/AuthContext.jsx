import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as serviceLogin } from '@/Api/services';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if(token) {
      const decoded = jwtDecode(token);
      const roles = decoded.roles;
      const userName = decoded.user_name;
      setUser({ token, roles, userName })
    } else {
      console.log("Not logged in");
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    console.log(username, password, "Login clicked")
    try {
      const response = await serviceLogin(username, password);
      localStorage.setItem("accessToken", response.data.tokens.access)
      localStorage.setItem("refreshToken", response.data.tokens.refresh)
      const decoded = jwtDecode(response.data.tokens.access);
      setUser({ "token": response.data.tokens.access, "roles": decoded.roles})
      //navigate('/dashboard');
    } catch (error) {
      console.log(error)
    }
  }
  const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
       {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
