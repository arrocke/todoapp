import React, { createContext, useContext } from "react";
import {
  useLogInMutation,
  useUserQuery,
  User,
  UserQuery,
  UserDocument
} from "../graphql/types";

interface AuthContextValue {
  isAuthenticated: boolean;
  user: User | null;
  login(email: string, password: string): Promise<User | null>;
  // logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const { data: { user = null } = {}, loading: loadingUser } = useUserQuery();
  const [_login] = useLogInMutation();

  async function login(email: string, password: string): Promise<User | null> {
    const { data: { login: user = null } = {} } = await _login({
      variables: {
        input: { email, password }
      },
      update(cache, { data }) {
        cache.writeQuery<UserQuery>({
          query: UserDocument,
          data: {
            user: data && data.login ? data.login : null
          }
        });
      }
    });
    return user;
  }

  return loadingUser ? null : (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("The useAuth hook must used inside an AuthProvider.");
  } else {
    return value;
  }
};

export { AuthProvider, useAuth };
