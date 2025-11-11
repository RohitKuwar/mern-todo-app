import React, { createContext, useState, useEffect } from 'react';
import * as authApi from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // On mount, try refresh to get access token if cookie exists
  useEffect(() => {
    const init = async () => {
      try {
        setLoadingAuth(true);
        const res = await authApi.refresh();
        setAccessToken(res.data.accessToken);
        // optional: server may return user info alongside access token
        // setUser(res.data.user || null);
      } catch (err) {
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoadingAuth(false);
      }
    };
    init();
  }, []);

  const doLogin = async (email, password) => {
    const res = await authApi.login(email, password);
    setAccessToken(res.data.accessToken);
    setUser(res.data.user || null);
    return res.data;
  };

  const doRegister = async (email, password) => {
    const res = await authApi.register(email, password);
    return res.data;
  };

  const doLogout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      // ignore
    }
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, loadingAuth, doLogin, doRegister, doLogout, setAccessToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
