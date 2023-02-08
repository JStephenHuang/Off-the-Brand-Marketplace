import { useEffect, useState } from "react";
import { useAPIClient } from "./use-api-client";
import { IListing } from "../../types/types";

export const useListings = () => {
  const client = useAPIClient();

  const [allListings, setAllListings] = useState<IListing[]>([]);

  const getAllListings = async () => {
    const res = await client
      .get(`/listings/`)
      .catch((error) => console.log(error));

    if (res) setAllListings(res.data);
  };

  const getListingById = async (listingId: string) => {
    const res = await client
      .get(`/listings/${listingId}`)
      .catch((error) => console.log(error));

    if (res) return res.data;
  };

  useEffect(() => {
    getAllListings();
  }, []);

  return { allListings, getListingById };
};
