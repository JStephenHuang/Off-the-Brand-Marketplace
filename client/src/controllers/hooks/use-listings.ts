import { useFirebaseUser } from "../contexts/firebase-app-context";
import { useAPIClient } from "./use-api-client";

export const useListings = () => {
  const firebaseUser = useFirebaseUser();
  const client = useAPIClient();
};
