// client/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { API_BASE_URL } from "../config/api"; 

const AuthContext = createContext();

const API_BASE = `${API_BASE_URL}/api`; 

// Export useAuth as a named export
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Export AuthProvider as a named export
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      // Skip check for mock tokens
      if (token.startsWith("mock-jwt-token-")) {
        console.log("Using mock token, skipping auth check");
        const mockUser = {
          _id: "1",
          name: "System Administrator",
          email: "admin@serenityplace.org",
          role: "admin",
        };
        setUser(mockUser);
        setLoading(false);
        return;
      }

      // Real JWT token - verify with backend
      const response = await fetch(`${API_BASE}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        console.log("✅ Authenticated with real backend");
      } else {
        console.log("❌ Token invalid, clearing");
        localStorage.removeItem("token");
        setUser(null);
      }
    } catch (error) {
      console.log("Auth check failed:", error.message);
      // Keep using mock token if exists
      const token = localStorage.getItem("token");
      if (token && token.startsWith("mock-jwt-token-")) {
        const mockUser = {
          _id: "1",
          name: "System Administrator",
          email: "admin@serenityplace.org",
          role: "admin",
        };
        setUser(mockUser);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log("Attempting real backend login...");
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Real login successful, token:", data.token);
        console.log("👤 User details:", data.user);
        localStorage.setItem("token", data.token);
        setUser(data.user);
        return { success: true };
      } else {
        console.log("❌ Real login failed:", data.message);
        // Fallback to mock only for seeded admin
        if (email === "admin@serenityplace.org" && password === "admin123") {
          console.log("Using mock auth for admin");
          return mockLogin(email, password);
        }
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.log("🚨 Network error, using mock auth");
      // Network error - use mock auth
      return mockLogin(email, password);
    }
  };

  const mockLogin = async (email, password) => {
    // Only allow mock login for specific cases
    if (email === "admin@serenityplace.org" && password === "admin123") {
      const mockUser = {
        _id: "1",
        name: "System Administrator",
        email: email,
        role: "admin",
      };
      const mockToken = "mock-jwt-token-" + Date.now();
      localStorage.setItem("token", mockToken);
      setUser(mockUser);
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const register = async (userData) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return { success: false, message: "No authentication token" };
      }

      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Network error during registration" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isStaff: user?.role === "staff" || user?.role === "admin", // Staff includes admin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export default as well for flexibility
export default AuthContext;
