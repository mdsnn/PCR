
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();
const API_BASE = 'http://localhost:3000/api/auth'; // or your LAN IP or tunnel

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTokens = async () => {
      const at = await AsyncStorage.getItem('accessToken');
      const rt = await AsyncStorage.getItem('refreshToken');
      setAccessToken(at);
      setRefreshToken(rt);
    };
    loadTokens();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      if (accessToken) {
        try {
          const res = await fetch(`${API_BASE}/profile`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data.data.user);
          } else {
            await handleRefreshToken();
          }
        } catch {
          await handleLogout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      const interval = setInterval(() => handleRefreshToken(), 14 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [accessToken]);

  const handleLogin = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.data.user);
        setAccessToken(data.data.accessToken);
        setRefreshToken(data.data.refreshToken);
        await AsyncStorage.setItem('accessToken', data.data.accessToken);
        await AsyncStorage.setItem('refreshToken', data.data.refreshToken);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch {
      return { success: false, message: 'Network error' };
    }
  };

  const handleSignup = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.data.user);
        setAccessToken(data.data.accessToken);
        setRefreshToken(data.data.refreshToken);
        await AsyncStorage.setItem('accessToken', data.data.accessToken);
        await AsyncStorage.setItem('refreshToken', data.data.refreshToken);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch {
      return { success: false, message: 'Network error' };
    }
  };

  const handleRefreshToken = async () => {
    if (!refreshToken) return false;
    try {
      const res = await fetch(`${API_BASE}/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });
      const data = await res.json();
      if (data.success) {
        setAccessToken(data.data.accessToken);
        await AsyncStorage.setItem('accessToken', data.data.accessToken);
        return true;
      } else {
        await handleLogout();
        return false;
      }
    } catch {
      await handleLogout();
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
    } catch {}
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login: handleLogin, signup: handleSignup, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
