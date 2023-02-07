import { useEffect, useState } from "react";
import { IMessage } from "../../types/types";
import { useAPIClient } from "./use-api-client";
import { useFirebaseUser } from "../contexts/firebase-app-context";

export const useMessages = (userId: string, productId: string) => {
  const firebaseUser = useFirebaseUser();
  const client = useAPIClient();

  if (userId === undefined || productId === undefined)
    return { error: "Something went wrong." };

  const [messages, setMessages] = useState<IMessage | []>();
  const isLoading = firebaseUser === undefined;
  const isLoggedIn = firebaseUser !== null;

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      (async () => {
        const res = await client
          .get(`/messages`, {
            params: { userId: userId, productId: productId },
          })
          .catch((error) => {});

        if (res) setMessages(res.data);
      })();
    }
  }, [messages, isLoading, isLoggedIn]);

  return {
    messages,
    isLoading: messages === undefined || isLoading,
    isLoggedIn,
  };
};
