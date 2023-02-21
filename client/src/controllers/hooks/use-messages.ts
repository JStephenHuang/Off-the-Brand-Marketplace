import { useAPIClient } from "./use-api-client";
import { useFirebaseUser } from "../contexts/firebase-app-context";
import { useEffect, useState } from "react";
import { IConversation, IMessage } from "../../types/types";

export const useConversations = () => {
  const firebaseUser = useFirebaseUser();
  const client = useAPIClient();

  const [conversations, setConversations] = useState<IConversation[]>([]);
  const isLoading = firebaseUser === undefined;
  const isLoggedIn = firebaseUser !== null;

  useEffect(() => {
    (async () => {
      if (!isLoading && isLoggedIn) {
        const res = await client
          .get("/messages/conversations")
          .catch((error) => console.log(error));

        if (res) {
          setConversations(res.data);
          console.log(res.data);
        }
      }
    })();
  }, [isLoading, isLoggedIn]);

  return { conversations };
};

export const useMessages = () => {
  const firebaseUser = useFirebaseUser();
  const client = useAPIClient();

  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const isLoading = firebaseUser === undefined;
  const isLoggedIn = firebaseUser !== null;

  // ! Get all messages

  const getAllMessages = async () => {
    if (!isLoading && isLoggedIn) {
      const res = await client
        .get("/messages")
        .catch((error) => console.log(error));

      if (res) setAllMessages(res.data);
    }
  };

  // ! Send a message

  const sendMessage = async (
    sellerId: string,
    listingId: string,
    body: string
  ) => {
    if (body.trim() === "") return console.log("Empty body");
    if (!isLoggedIn) return console.log("Not logged in.");
    await client.post("/messages", {
      sellerId: sellerId,
      listingId: listingId,
      body: body,
    });
  };

  useEffect(() => {
    getAllMessages();
  }, [isLoading, isLoggedIn]);

  return {
    allMessages,
    sendMessage,
    isLoading,
    isLoggedIn,
  };
};
