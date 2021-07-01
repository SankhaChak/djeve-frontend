import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Register
  const register = async () => {};

  // Login
  const login = async () => {};

  // Logout
  const logout = async () => {};

  // Check if logged in
  const checkUserLoggedIn = async () => {};

  return (
    <AuthContext.Provider
      value={{ user, error, login, logout, checkUserLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
