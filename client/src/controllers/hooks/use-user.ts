import { useEffect, useState } from "react";
import { useAPIClient } from "./use-api-client";
import { useFirebaseUser } from "../contexts/firebase-app-context";
import { IUser } from "../../types/types";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  const firebaseUser = useFirebaseUser();
  const client = useAPIClient();

  const [user, setUser] = useState<IUser | null>(); // ! Specify type
  const isLoading = firebaseUser === undefined;
  const isLoggedIn = firebaseUser !== null;

  useEffect(() => {
    if (!isLoggedIn) setUser(null);
    if (!isLoading && isLoggedIn) {
      (async () => {
        const res = await client.get(`/users/current`).catch((error) => {});

        if (res) setUser(res.data);
      })();
    }
  }, [isLoading, isLoggedIn]);

  return {
    user: user as IUser,
    isLoading: user === undefined || isLoading,
    isLoggedIn,
  };
};
