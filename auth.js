import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "@firebase/auth";
import { auth } from "./firebase/db";

// Context provides a way to pass data through the component tree without having to pass props down manually at every level;
// createContext() gives you a Context.Provider component you’re supposed to use for passing a context value;
const AuthContext = createContext({});
// this is the initial state; empty;

const config = {
  androidClientId:
    "452789543304-d9fd801se7uoi9qguhkgol064lh3j7mu.apps.googleusercontent.com",
  iosClientId:
    "452789543304-j40rh644esq59qts3t18rbjqsu6ia3cr.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // logged in
          setUser(user);
        } else {
          // not logged in
          setUser(null);
        }
        setLoadingInitial(false);
      }),
    []
  );

  const logout = () => {
    setLoading(true);
    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const signInWithGoogle = async () => {
    setLoading(true);

    await Google.logInAsync(config)
      .then(async (logInResult) => {
        if (logInResult.type === "success") {
          const { idToken, accessToken } = logInResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          await signInWithCredential(auth, credential);
        }

        return Promise.reject();
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const memoizedValue = useMemo(
    // is similar to useEffect when you right it;
    () => ({
      user,
      loading,
      error,
      signInWithGoogle,
      logout,
    }),
    [user, loading, error] // will only update this information if the user, loading, error changed;
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  // useContext is used outside Provider;  here you're able to use the value from createContext;
  return useContext(AuthContext);
}
