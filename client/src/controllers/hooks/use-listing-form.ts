import { useEffect, useState } from "react";
import { IListingForm } from "../../types/types";
import { useFirebaseUser } from "../contexts/firebase-app-context";
import { useAPIClient } from "./use-api-client";
import { useNavigate } from "react-router-dom";

export const useListingForm = (listingId: string | null) => {
  const firebaseUser = useFirebaseUser();
  const client = useAPIClient();
  const navigate = useNavigate();

  const isLoading = firebaseUser === undefined;
  const isLoggedIn = firebaseUser !== null;

  const [listingForm, setListingForm] = useState<IListingForm>({});

  useEffect(() => {
    (async () => {
      if (listingId === null) {
        setListingForm({
          headline: "",
          institution: "",
          size: "",
          type: "",
          condition: "",
          gender: "",
          description: "",
          price: 0.0,
        });
      } else {
        const res = await client
          .get(`/listings/form/${listingId}`)
          .catch((error) => console.log(error));

        if (res) setListingForm(res.data);
      }
    })();
  }, []);

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const deletePreview = (file: File) => {
    const currentFiles = [...imageFiles];

    currentFiles.splice(imageFiles.indexOf(file), 1);

    setImageFiles(currentFiles);
  };

  // ! API calls function

  const createListing = async (listingForm: IListingForm) => {
    if (!isLoading && isLoggedIn)
      await client
        .post("/listings", listingForm)
        .catch((error) => console.log(error));
  };
  const editListing = async (listingForm: IListingForm) => {
    if (!isLoading && isLoggedIn && listingId) {
      await client
        .put(`/listings/${listingId}`, listingForm)
        .catch((error) => console.log(error));
      navigate("/shop/listings/active");
    }
  };

  // ! On change handlers

  const setInstitution = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setListingForm({
      ...listingForm,
      institution: event.target.value,
    });
  };
  const setType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setListingForm({
      ...listingForm,
      type: event.target.value.trim(),
    });
  };
  const setSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setListingForm({
      ...listingForm,
      size: event.target.value.trim(),
    });
  };
  const setHeadline = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListingForm({
      ...listingForm,
      headline: event.target.value.trim(),
    });
  };
  const setCondition = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setListingForm({
      ...listingForm,
      condition: event.target.value.trim(),
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
      gender: event.target.value.trim(),
    });
  };

  const previewUploads = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    setImageFiles([...imageFiles, event.target.files[0]]);
  };

  const setInfo = {
    setInstitution: setInstitution,
    setHeadline: setHeadline,
    setSize: setSize,
    setCondition: setCondition,
    setType: setType,
    setGender: setGender,
    setDescription: setDescription,
    setPrice: setPrice,
    previewUploads: previewUploads,
  };

  return {
    listingForm,
    imageFiles,
    setInfo,
    createListing,
    deletePreview,
    editListing,
  };
};
