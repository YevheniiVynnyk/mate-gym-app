import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/types/user";
import { authService, Token } from "@/services/authService";
import { userService } from "@/services/userService";
import { fromUserDTO, toUserDTO } from "@/services/mapper/userMapper";
import { logError, logInfo, logWarn } from "@/utils/logger";
import { api } from "@/services/api";

const CONTEXT = "AuthContext";

export enum UserSessionState {
  UNKNOWN,
  UNAUTHENTICATED,
  GUEST,
  AUTHENTICATED,
}

interface AuthContextType {
  user: User | null;
  sessionState: UserSessionState;
  sessionExpired: boolean;
  showGuestWarning: boolean;
  setShowGuestWarning: (show: boolean) => void;
  login: (login: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    login: string,
    role: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  loginAsGuest: () => Promise<void>;
  updateUserOnboarding: (data: any) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [sessionState, setSessionState] = useState<UserSessionState>(
    UserSessionState.UNKNOWN,
  );
  const [sessionExpired, setSessionExpired] = useState(false);
  const [showGuestWarning, setShowGuestWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      logInfo("Starting ONLINE authentication initialization...", CONTEXT);
      try {
        const tokenRaw = await AsyncStorage.getItem("token");

        if (!tokenRaw) {
          logInfo("No token found. Setting state to UNAUTHENTICATED.", CONTEXT);
          setSessionState(UserSessionState.UNAUTHENTICATED);
          return;
        }

        logInfo("Token found, validating with server...", CONTEXT);
        const token = JSON.parse(tokenRaw);
        api.defaults.headers.common["Authorization"] = `Bearer ${token.accessToken}`;

        const userData = await userService.getMe();
        const mappedUser = fromUserDTO(userData);
        setUser(mappedUser);
        
        if (mappedUser.role === "GUEST") {
             setSessionState(UserSessionState.GUEST);
             setShowGuestWarning(true);
        } else {
             setSessionState(UserSessionState.AUTHENTICATED);
             setShowGuestWarning(false);
        }
        
        logInfo(`User ${mappedUser.login} authenticated successfully. Role: ${mappedUser.role}`, CONTEXT);
      } catch (e) {
        logError(e, `${CONTEXT}/initAuth`);
        logWarn("Token validation failed. Resetting to UNAUTHENTICATED.", CONTEXT);
        // Не удаляем токен, просто меняем состояние
        setSessionState(UserSessionState.UNAUTHENTICATED);
        setSessionExpired(true);
      } finally {
        setIsLoading(false);
        logInfo("Authentication initialization finished.", CONTEXT);
      }
    };

    initAuth();
  }, []);

  const handleAuthSuccess = async (token: Token) => {
    logInfo("Handling successful authentication...", CONTEXT);
    await AsyncStorage.setItem("token", JSON.stringify(token));
    api.defaults.headers.common["Authorization"] = `Bearer ${token.accessToken}`;
    setSessionExpired(false);

    const userData = await userService.getMe();
    const mappedUser = fromUserDTO(userData);
    
    if (mappedUser.isFirstLogin === undefined) {
        mappedUser.isFirstLogin = true;
    }
    
    setUser(mappedUser);
    
    if (mappedUser.role === "GUEST") {
         setSessionState(UserSessionState.GUEST);
         setShowGuestWarning(true);
    } else {
         setSessionState(UserSessionState.AUTHENTICATED);
         setShowGuestWarning(false);
    }
    
    logInfo(`Authentication handling complete. Role: ${mappedUser.role}`, CONTEXT);
  };

  const getGuestToken = async (): Promise<string | undefined> => {
    if (sessionState === UserSessionState.GUEST) {
      const tokenRaw = await AsyncStorage.getItem("token");
      if (tokenRaw) {
        const token = JSON.parse(tokenRaw);
        return token.accessToken;
      }
    }
    return undefined;
  };

  const login = async (login, password) => {
    logInfo(`Attempting to log in user: ${login}`, CONTEXT);
    setIsLoading(true);
    try {
      const guestToken = await getGuestToken();
      const tokenData = await authService.signIn({ login, password }, guestToken);
      await handleAuthSuccess(tokenData);
    } catch (e) {
      logError(e, `${CONTEXT}/login`);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, login, role) => {
    logInfo(`Attempting to register new user: ${login}`, CONTEXT);
    setIsLoading(true);
    try {
      const guestToken = await getGuestToken();
      const tokenData = await authService.signUp({ email, login, password, role }, guestToken);
      await handleAuthSuccess(tokenData);
    } catch (e) {
      logError(e, `${CONTEXT}/register`);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsGuest = async () => {
    logInfo("Attempting to log in as guest...", CONTEXT);
    setIsLoading(true);
    try {
      const tokenData = await authService.guestLogin();
      await handleAuthSuccess(tokenData);
    } catch (e) {
      logError(e, `${CONTEXT}/loginAsGuest`);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    logInfo("Logging out user...", CONTEXT);
    setUser(null);
    setSessionState(UserSessionState.UNAUTHENTICATED);
    setSessionExpired(false);
    setShowGuestWarning(false);
    delete api.defaults.headers.common["Authorization"];
    await AsyncStorage.removeItem("token");
    logInfo("Logout complete.", CONTEXT);
  };

  const updateUserOnboarding = async (data: any) => {
    if (!user) return;
    logInfo("Updating user onboarding data...", CONTEXT);
    
    try {
        const updatedUser = { ...user, ...data, isFirstLogin: false };
        await userService.updateUser(toUserDTO(updatedUser));
        setUser(updatedUser);
        logInfo("User onboarding updated successfully.", CONTEXT);
    } catch (e) {
        logError(e, `${CONTEXT}/updateUserOnboarding`);
        setUser({ ...user, isFirstLogin: false });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        sessionState,
        sessionExpired,
        showGuestWarning,
        setShowGuestWarning,
        login,
        register,
        logout,
        loginAsGuest,
        updateUserOnboarding,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
