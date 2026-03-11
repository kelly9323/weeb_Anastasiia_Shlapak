import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import {
  loginUser,
  logoutUser,
  refreshTokens,
  registerUser,
} from "../api/authApi";
import type { RegisterData, RegisterResponse, UserInfo } from "../api/authApi";
import { setTokenRefresher } from "../api/articlesApi";

const ACCESS_TOKEN_KEY = "weeb_access_token";
const REFRESH_TOKEN_KEY = "weeb_refresh_token";
const USER_KEY = "weeb_user";

interface AuthContextType {
  user: UserInfo | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isActiveMember: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<RegisterResponse>;
  refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  // Restore session from localStorage on mount or refresh
  useEffect(() => {
    const storedAccess = localStorage.getItem(ACCESS_TOKEN_KEY);
    const storedRefresh = localStorage.getItem(REFRESH_TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);
    if (storedAccess && storedRefresh && storedUser) {
      setAccessToken(storedAccess);
      setRefreshToken(storedRefresh);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    const currentRefresh =
      refreshToken ?? localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!currentRefresh) return null;

    try {
      const data = await refreshTokens(currentRefresh);
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      localStorage.setItem(ACCESS_TOKEN_KEY, data.access);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);
      return data.access;
    } catch {
      // Refresh token expired — force logout
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      return null;
    }
  }, [refreshToken]);

  // Inject token refresher into articlesApi (avoids circular imports)
  useEffect(() => {
    setTokenRefresher(refreshAccessToken);
  }, [refreshAccessToken]);

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      const data = await loginUser(email, password);
      setUser(data.user);
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      localStorage.setItem(ACCESS_TOKEN_KEY, data.access);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    },
    []
  );

  const logout = useCallback(async (): Promise<void> => {
    const currentAccess =
      accessToken ?? localStorage.getItem(ACCESS_TOKEN_KEY);
    const currentRefresh =
      refreshToken ?? localStorage.getItem(REFRESH_TOKEN_KEY);

    if (currentRefresh && currentAccess) {
      try {
        await logoutUser(currentRefresh, currentAccess);
      } catch {
        // Ignore errors — always clear local state
      }
    }

    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }, [accessToken, refreshToken]);

  const register = useCallback(
    async (data: RegisterData): Promise<RegisterResponse> => {
      return registerUser(data);
    },
    []
  );

  const isAuthenticated = user !== null && accessToken !== null;
  const isActiveMember = isAuthenticated; // simplejwt blocks inactive users at login
  const isAdmin = isAuthenticated && (user?.is_staff ?? false);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        isActiveMember,
        isAdmin,
        login,
        logout,
        register,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
