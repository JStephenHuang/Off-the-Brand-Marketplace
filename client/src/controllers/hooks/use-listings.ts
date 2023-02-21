import { useEffect, useState } from "react";
import { useAPIClient } from "./use-api-client";
import { IListing } from "../../types/types";
import { useFirebaseUser } from "../contexts/firebase-app-context";
import { useUser } from "./use-user";

// ! Listing by id

export const useDeleteListing = () => {
  const { isLoading, isLoggedIn } = useUser();

  const client = useAPIClient();
  const deleteListing = async (listingId: string) => {
    if (isLoggedIn && !isLoading) {
      await client
        .delete(`/listings/${listingId}`)
        .catch((error) => console.log(error));
    }
  };
  return { deleteListing };
};

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

// ! Listings

export const useListings = () => {
  const client = useAPIClient();
  const { isLoading, isLoggedIn } = useUser();

  const [listings, setListings] = useState<IListing[]>();
  const [activeListings, setActiveListings] = useState<IListing[]>();

  const deleteListing = async (listingId: string) => {
    if (isLoggedIn && !isLoading) {
      const res = await client
        .delete(`/listings/${listingId}`)
        .catch((error) => console.log(error));

      if (res) setActiveListings(res.data);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await client
        .get(`/listings`)
        .catch((error) => console.log(error));

      if (res) setListings(res.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await client
        .get(`/users/listings`)
        .catch((error) => console.log(error));

      if (res) setActiveListings(res.data);
    })();
  }, []);

  return {
    listings,
    activeListings,
    deleteListing,
  };
};
