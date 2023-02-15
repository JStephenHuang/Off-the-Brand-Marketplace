import { useEffect, useState } from "react";
import { useAPIClient } from "./use-api-client";
import { IListing } from "../../types/types";
import { Params } from "react-router-dom";
import { useFirebaseUser } from "../contexts/firebase-app-context";

// ! Listing by id

export const useListing = (listingId: string) => {
  const firebaseUser = useFirebaseUser();
  const client = useAPIClient();

  const [listing, setListing] = useState<IListing>();

  const [owned, setOwned] = useState<boolean>();

  useEffect(() => {
    (async () => {
      if (!listingId) return;
      const res = await client.get(`/listings/${listingId}`).catch((error) => {
        if (error.response.status === 400) {
          console.log("Listing not found.");
        }
      });

      if (res) {
        const listing: IListing = res.data;
        if (firebaseUser) {
          if (listing.seller._id === firebaseUser.uid) setOwned(true);
        }
        return setListing(listing);
      }
    })();
  }, []);

  return { owned, listing };
};

// ! Listing by id

export const useListings = () => {
  const client = useAPIClient();

  const [listings, setListings] = useState<IListing[]>([]);

  useEffect(() => {
    (async () => {
      const res = await client
        .get(`/listings/`)
        .catch((error) => console.log(error));

      if (res) setListings(res.data);
    })();
  }, []);

  return { listings };
};
