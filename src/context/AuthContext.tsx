import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
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
import { setTokenRefresher, setAccessTokenGetter } from "../api/articlesApi";

const USER_KEY = "weeb_user";

interface AuthContextType {
  user: UserInfo | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isActiveMember: boolean;
  isAdmin: boolean;
  isInitializing: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<RegisterResponse>;
  refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const accessTokenRef = useRef<string | null>(null);

  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    try {
      const data = await refreshTokens();
      setAccessToken(data.access);
      accessTokenRef.current = data.access;
      return data.access;
    } catch {
      setUser(null);
      setAccessToken(null);
      accessTokenRef.current = null;
      localStorage.removeItem(USER_KEY);
      return null;
    }
  }, []);

  // On mount: restore user from localStorage, then silently refresh access token via cookie
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    refreshAccessToken().finally(() => setIsInitializing(false));
  }, [refreshAccessToken]);

  // Inject token functions into articlesApi (avoids circular imports)
  useEffect(() => {
    setTokenRefresher(refreshAccessToken);
    setAccessTokenGetter(() => accessTokenRef.current);
  }, [refreshAccessToken]);

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      const data = await loginUser(email, password);
      setUser(data.user);
      setAccessToken(data.access);
      accessTokenRef.current = data.access;
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    },
    []
  );

  const logout = useCallback(async (): Promise<void> => {
    const currentAccess = accessTokenRef.current;
    if (currentAccess) {
      try {
        await logoutUser(currentAccess);
      } catch {
        // Ignore errors — always clear local state
      }
    }
    setUser(null);
    setAccessToken(null);
    accessTokenRef.current = null;
    localStorage.removeItem(USER_KEY);
  }, []);

  const register = useCallback(
    async (data: RegisterData): Promise<RegisterResponse> => {
      return registerUser(data);
    },
    []
  );

  const isAuthenticated = user !== null && accessToken !== null;
  const isActiveMember = isAuthenticated;
  const isAdmin = isAuthenticated && (user?.is_staff ?? false);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        isActiveMember,
        isAdmin,
        isInitializing,
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
