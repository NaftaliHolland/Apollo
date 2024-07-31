import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as serviceLogin } from '@/Api/services';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if(token) {
      setUser(token)
    } else {
      console.log("Not logged in");
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    console.log(username, password, "Login clicked")
    try {
      const response = await serviceLogin(username, password);
      console.log(response)
      localStorage.setItem("accessToken", response.data.tokens.access)
      localStorage.setItem("refreshToken", response.data.tokens.refresh)
      setUser(response.data.tokens.access)
      //navigate('/dashboard');
      console.log(response.data.tokens.access)
      console.log(user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, loading }}>
       {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
