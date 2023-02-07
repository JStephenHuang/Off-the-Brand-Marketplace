import { useEffect, useMemo, useState } from "react";
import { IListingForm } from "../../types/types";
import { useFirebaseUser } from "../contexts/firebase-app-context";
import { useAPIClient } from "./use-api-client";

export const useListingsTools = () => {
  const firebaseUser = useFirebaseUser();
  const client = useAPIClient();

  const isLoading = firebaseUser === undefined;
  const isLoggedIn = firebaseUser !== null;

  const ListingFormDefault: IListingForm = {
    headline: "",
    institution: "",
    size: "",
    type: "",
    condition: "",
    gender: "",
    description: "",
    price: 0.0,
  };

  const [listingForm, setListingForm] =
    useState<IListingForm>(ListingFormDefault);

  // ! API calls function

  const createListing = async (listingForm: IListingForm) => {
    if (!isLoading && isLoggedIn)
      await client
        .post("/listings", listingForm)
        .catch((error) => console.log(error));
  };

  const getAllListings = async () => {
    const res = await client
      .get(`/listings/`)
      .catch((error) => console.log(error));

    if (res) return res.data;
  };

  // ! On change handlers

  const setInstituion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setListingForm({
      ...listingForm,
      institution: event.target.value,
    });
  };
  const setType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setListingForm({
      ...listingForm,
      type: event.target.value,
    });
  };
  const setSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setListingForm({
      ...listingForm,
      size: event.target.value,
    });
  };
  const setHeadline = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListingForm({
      ...listingForm,
      headline: event.target.value,
    });
  };
  const setCondition = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setListingForm({
      ...listingForm,
      condition: event.target.value,
    });
  };

  const setDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setListingForm({
      ...listingForm,
      description: event.target.value,
    });
  };

  const setPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListingForm({
      ...listingForm,
      price: parseFloat(event.target.value),
    });
  };

  const setGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setListingForm({
      ...listingForm,
      gender: event.target.value,
    });
  };

  const setInfo = {
    setInstituion: setInstituion,
    setHeadline: setHeadline,
    setSize: setSize,
    setCondition: setCondition,
    setType: setType,
    setGender: setGender,
    setDescription: setDescription,
    setPrice: setPrice,
  };

  return { listingForm, setInfo, createListing, getAllListings };
};
