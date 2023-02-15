import { IListingForm } from "../../../types/types";

export interface FormSelectProps {
  options: string[];
  value: string | undefined;
  label: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}
export interface FormFieldProps {
  headline: string;
  field: JSX.Element;
}

export interface FormSectionProps {
  listingForm: IListingForm;
  setInfo: {
    setInstitution: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    setHeadline: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setSize: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    setCondition: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    setType: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    setGender: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    setDescription: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    setPrice: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

export interface UploadSectionProps {
  imageFiles: File[];
  deletePreview: (file: File) => void;
  setInfo: {
    previewUploads: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
}
