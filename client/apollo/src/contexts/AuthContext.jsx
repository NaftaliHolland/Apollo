import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as serviceLogin, getUserDetails } from '@/Api/services';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [school, setSchool] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if(token) {
        const decoded = jwtDecode(token);
        const roles = decoded.roles;
        const storedSchool = localStorage.getItem('schoolInfo');
        try {
				  const response = await getUserDetails();
				  const userDetails = response.data.user
          setUser({ token, roles, "username": userDetails.first_name})
        } catch (error) {
          setLoading(false)
        }
        if (storedSchool) {
          setSchool(storedSchool);
        } else {
        localStorage.setItem('schoolInfo', JSON.stringify(userDetails.school))
        setSchool(JSON.stringify(userDetails.school))
        }
      } else {
        console.log("Not logged in");
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await serviceLogin(username, password);
      localStorage.setItem("accessToken", response.data.tokens.access)
      localStorage.setItem("refreshToken", response.data.tokens.refresh)
      localStorage.setItem("schoolInfo", JSON.stringify(response.data.user.school))
      const decoded = jwtDecode(response.data.tokens.access);
      setUser({ "token": response.data.tokens.access, "roles": decoded.roles, "username": response.data.user.first_name })
      setSchool(JSON.stringify(response.data.user.school))
    } catch (error) {
        throw new Error(error);
    }
  }
  const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("schoolInfo");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, school }}>
       {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
