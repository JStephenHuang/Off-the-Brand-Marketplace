import { IoClose } from "react-icons/io5";
import { useListingForm } from "../../../controllers/hooks/use-listing-form";

// ! Data

import {
  conditions,
  genders,
  institutions,
  sizes,
  types,
} from "../../../docs/options";

// ! Interfaces

import {
  FormFieldProps,
  FormSectionProps,
  FormSelectProps,
  UploadSectionProps,
} from "./interfaces";

// ! Form components

const FormField = (props: FormFieldProps) => {
  return (
    <div className="w-full flex flex-col mb-5">
      <p className="text-[12px] tracking-wider mb-1">{props.headline}</p>
      {props.field}
    </div>
  );
};

const FormSelect = (props: FormSelectProps) => {
  const style =
    props.value === "" ? "select-input text-gray-400" : "select-input";

  return (
    <select className={style} value={props.value} onChange={props.onChange}>
      <option value="" disabled={true}></option>
      {props.options.map((option, key) => (
        <option key={key}>{option}</option>
      ))}
    </select>
  );
};

const FormSection = ({ listingForm, setInfo }: FormSectionProps) => {
  return (
    <div className="w-2/3 flex flex-col">
      {/* Headline */}

      <FormField
        headline="Headline"
        field={
          <input
            className="form-headline-input"
            type="text"
            onChange={setInfo.setHeadline}
            value={listingForm.headline}
            placeholder="Give your listing a headline"
          />
        }
      />
      {/* Institution */}

      <FormField
        headline="Institution"
        field={
          <FormSelect
            label="Institution"
            value={listingForm.institution}
            onChange={setInfo.setInstitution}
            options={institutions}
          />
        }
      />

      <FormField
        headline="Size"
        field={
          <FormSelect
            label="Size"
            value={listingForm.size}
            onChange={setInfo.setSize}
            options={sizes}
          />
        }
      />

      <FormField
        headline="Type"
        field={
          <FormSelect
            label="Type"
            value={listingForm.type}
            onChange={setInfo.setType}
            options={types}
          />
        }
      />
      <FormField
        headline="Gender"
        field={
          <FormSelect
            label="Gender"
            value={listingForm.gender}
            onChange={setInfo.setGender}
            options={genders}
          />
        }
      />

      <FormField
        headline="Condition"
        field={
          <FormSelect
            label="Condition"
            value={listingForm.condition}
            onChange={setInfo.setCondition}
            options={conditions}
          />
        }
      />

      {/* Description */}

      <FormField
        headline="Description"
        field={
          <textarea
            className="w-full h-[8rem] border border-black outline-none p-2 
            bg-transparent resize-none rounded-sm"
            onChange={setInfo.setDescription}
            value={listingForm.description}
            placeholder="Give a concise description of your uniform. It should not be too long, avoid repetition and useless information."
          />
        }
      />

      <FormField
        headline="Price"
        field={
          <div className="flex items-center border w-1/5 p-2 border-black rounded-sm">
            <p className="text-green-600 font-extrabold">$</p>
            <input
              className="form-price-input"
              type="number"
              placeholder="0.00"
              value={listingForm.price || undefined}
              onChange={setInfo.setPrice}
            />
          </div>
        }
      />
    </div>
  );
};

// ! Upload images components

const UploadSection = ({
  imageFiles,
  deletePreview,
  setInfo,
}: UploadSectionProps) => {
  return (
    <div className="w-1/3 flex flex-col ml-10">
      <p className="text-[12px] tracking-wider mb-1">Upload images (2 max)</p>

      <div className="grid grid-cols-1 grid-rows-2 gap-2 overflow-hidden">
        {imageFiles.map((image, key) => {
          return (
            <div
              key={key}
              className="upload-box group bg-black mb-2 flex justify-end"
            >
              <IoClose
                onClick={() => deletePreview(image)}
                className="delete-upload-icon"
                size={16}
              />
              <img
                className="w-full h-full group-hover:opacity-80 "
                src={URL.createObjectURL(image)}
              />
            </div>
          );
        })}
        {imageFiles.length < 2 && (
          <label
            htmlFor="dropzone-file"
            className="upload-box hover:bg-gray-200 grid place-items-center"
          >
            <p className="">Upload a photo</p>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={setInfo.previewUploads}
            />
          </label>
        )}
      </div>
    </div>
  );
};

const CreateListingPage = () => {
  const { listingForm, imageFiles, deletePreview, setInfo, createListing } =
    useListingForm();

  return (
    <div className="w-[60%] h-full">
      <div className="m-5 text-[30px] font-bold border-b">List an uniform</div>
      <div className="flex flex-col">
        <div className="flex h-full px-5 justify-between">
          <FormSection listingForm={listingForm} setInfo={setInfo} />
          <UploadSection
            imageFiles={imageFiles}
            deletePreview={deletePreview}
            setInfo={setInfo}
          />
        </div>
        <button
          className="font-extrabold w-1/5 p-3 m-5 rounded-sm bg-black text-[20px] text-white hover:opacity-60"
          onClick={() => createListing(listingForm)}
        >
          Create Listing
        </button>
      </div>
    </div>
  );
};

export default CreateListingPage;
