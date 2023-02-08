import { IoClose } from "react-icons/io5";
import { useListingsTools } from "../../../controllers/hooks/use-listings-tools";

// ! Data

import {
  conditions,
  genders,
  institutions,
  sizes,
  types,
} from "../../../docs/options";
import { IListingForm } from "../../../types/types";

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
    <div className="w-full flex items-start justify-between my-5">
      <div className="w-1/2 flex flex-col">
        <p className="font-medium">{props.headline}</p>
        <p className="text-[12px] font-light w-4/5">{props.subtitles}</p>
      </div>
      {props.field}
    </div>
  );
};

const FormSelect = (props: FormSelectProps) => {
  const style =
    props.value === "" ? "select-input text-gray-400" : "select-input";

  return (
    <select
      className={style}
      value={props.value || ""}
      onChange={props.onChange}
    >
      <option value="" disabled={true}>
        Select {props.label}
      </option>
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
      <div className="flex flex-col">
        <p className="font-medium">Headline</p>
        <p className="text-[12px] font-light">
          Give your listing a headline. The headline is the first piece of
          information customers will see in the product page
        </p>
        <input
          className="form-headline-input font-medium"
          type="text"
          onChange={setInfo.setHeadline}
          value={listingForm.headline}
          placeholder="Give your listing a headline."
        />
      </div>
      <FormField
        headline="Insitution"
        subtitles="Select the school which your uniform is from."
        field={
          <FormSelect
            label="Institution"
            value={listingForm.institution}
            onChange={setInfo.setInstituion}
            options={institutions}
          />
        }
      />
      <FormField
        headline="Size"
        subtitles="Select the size of your uniform."
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
        subtitles="Select the type of your uniform."
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
        subtitles="Select the gender of your uniform."
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
        subtitles="Select the condition of your uniform on a scale through 1 to 5."
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

      <div className="flex flex-col">
        <p className="font-medium">Description</p>
        <p className="text-[12px] font-light">
          Give a concise description of your uniform. It should not be too long,
          avoid repetition and useless information.
        </p>

        <textarea
          className="w-full h-[10rem] border border-black outline-none p-2 bg-transparent resize-none mt-3 font-medium"
          onChange={setInfo.setDescription}
          value={listingForm.description}
          placeholder="Give a concise description of your uniform."
        />
      </div>
      <FormField
        headline="Price"
        subtitles="Select the gender of your uniform."
        field={
          <div className="flex items-center border w-[20%] p-2 border-black text-[20px]">
            <p className="text-green-600 font-extrabold">$</p>
            <input
              className="form-price-input"
              type="text"
              placeholder="0.00"
              value={listingForm.price || ""}
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
    <div className="w-1/3 h-[90%] overflow-y-auto flex flex-col ml-10">
      <div className="mb-3">
        <p className="">Upload images</p>
        <p className="text-[12px] font-light">
          Upload images of your uniform. This gives credibility and an idea of
          what your customer are buying.
        </p>
      </div>

      {imageFiles.map((image, key) => {
        return (
          <div
            key={key}
            className="upload-box group bg-black mb-5 flex justify-end"
          >
            <IoClose
              onClick={() => deletePreview(image)}
              className="delete-upload-icon"
              size={16}
            />
            <img
              className="w-full h-full group-hover:opacity-60 "
              src={URL.createObjectURL(image)}
            />
          </div>
        );
      })}

      <label
        htmlFor="dropzone-file"
        className="upload-box hover:bg-gray-200 grid place-items-center"
      >
        <div className="flex flex-col justify-center items-center">
          <p className="mb-2 font-medium">Upload a photo</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={setInfo.previewUploads}
        />
      </label>
    </div>
  );
};

const CreateListingPage = () => {
  const { listingForm, imageFiles, deletePreview, setInfo, createListing } =
    useListingsTools();

  return (
    <div className="w-3/4 h-full">
      <div className="m-5 text-[30px] font-bold border-b border-gray-300">
        List an uniform
      </div>
      <div className="flex flex-col">
        <div className="flex h-full px-5">
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
