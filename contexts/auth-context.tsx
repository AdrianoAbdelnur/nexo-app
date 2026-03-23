import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { apiRequest } from '@/lib/api';
import { clearAuthToken, readAuthToken, saveAuthToken } from '@/lib/auth-storage';

type AuthUser = {
  id: string;
  name: string;
  email: string;
  roleType: string;
  phone?: string | null;
  active?: boolean;
};

type LoginPayload = {
  user: AuthUser;
  token: string;
};

type MePayload = {
  user: AuthUser;
};

type AuthContextValue = {
  booting: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [booting, setBooting] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  const clearSession = async () => {
    setToken(null);
    setUser(null);
    await clearAuthToken();
  };

  const refreshUser = async () => {
    if (!token) return;
    const { response, data } = await apiRequest<MePayload>('/api/auth/me', {
      token,
    });
    if (!response.ok || !data.ok || !data.item?.user) {
      await clearSession();
      return;
    }
    setUser(data.item.user);
  };

  const login = async (email: string, password: string) => {
    const { response, data } = await apiRequest<LoginPayload>('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });

    if (!response.ok || !data.ok || !data.item?.token || !data.item.user) {
      return { ok: false, message: data.message || 'Could not sign in' };
    }

    setToken(data.item.token);
    setUser(data.item.user);
    await saveAuthToken(data.item.token);
    return { ok: true };
  };

  const logout = async () => {
    const currentToken = token;
    await clearSession();

    if (currentToken) {
      await apiRequest('/api/auth/logout', {
        method: 'POST',
        token: currentToken,
      });
    }
  };

  useEffect(() => {
    const restore = async () => {
      try {
        const savedToken = await readAuthToken();
        if (!savedToken) {
          return;
        }

        setToken(savedToken);
        const { response, data } = await apiRequest<MePayload>('/api/auth/me', { token: savedToken });
        if (!response.ok || !data.ok || !data.item?.user) {
          await clearSession();
          return;
        }
        setUser(data.item.user);
      } finally {
        setBooting(false);
      }
    };

    void restore();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      booting,
      token,
      user,
      isAuthenticated: Boolean(token && user),
      login,
      logout,
      refreshUser,
    }),
    [booting, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
