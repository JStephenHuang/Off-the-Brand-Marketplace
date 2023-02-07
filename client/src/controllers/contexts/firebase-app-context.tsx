import React, { useEffect, useState } from "react";

// ! Firebase Imports

import {
  Auth,
  getAuth,
  User,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "../../firebase/app";

// ! Sign In with Google Function

const signInWithGoogle = () => {
  signInWithPopup(getAuth(app), new GoogleAuthProvider());
};

const signOut = () => {
  getAuth(app).signOut();
};

const FirebaseAppContext = React.createContext<{
  auth: Auth;
  user?: User | null | undefined;
  token?: string | null | undefined;
  signInWithGoogle: () => void;
  signOut: () => void;
}>({
  auth: getAuth(app),
  signInWithGoogle,
  signOut,
});

const useFirebaseContext = () => React.useContext(FirebaseAppContext);

// ! Authentication

const useFirebaseAuth = () => useFirebaseContext().auth;
const useFirebaseUser = () => useFirebaseContext().user;
const useFirebaseToken = () => useFirebaseContext().token;

const FirebaseAppProvider = (props: { children: React.ReactNode }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null | undefined>();
  const [token, setToken] = useState<string | null | undefined>();

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user === null) return setUser(null);
      setUser(user);
    });
  }, [auth]);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (user === null) return setToken(null);
      setToken(await user.getIdToken());
    });
  }, [auth]);

  return (
    <FirebaseAppContext.Provider
      value={{ auth, user, token, signInWithGoogle, signOut }}
    >
      {props.children}
    </FirebaseAppContext.Provider>
  );
};

export {
  FirebaseAppProvider,
  useFirebaseContext,
  useFirebaseUser,
  useFirebaseToken,
};
