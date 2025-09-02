import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    } else {
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [user]);

  // Signup API call
  const signup = async ({ name, email, password }) => {
    const res = await axios.post("http://localhost:8080/api/auth/signup", {
      name,
      email,
      password,
    });
    setUser(res.data); // Save user in state & localStorage
  };

  // Login API call
  const login = async (email, password) => {
    const res = await axios.post("http://localhost:8080/api/auth/login", {
      email,
      password,
    });
    setUser(res.data);
  };

  // Logout
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
