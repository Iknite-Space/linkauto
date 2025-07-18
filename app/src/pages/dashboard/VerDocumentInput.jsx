// I need to define the types of document types and their props
// Validate the document types schema
// My verification function where I'll pass the props I'll need for the verification, the onsubmit function and append the documents


import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";

import Input from "../../components/shared/Input";
import SelectInput from "../../components/shared/SelectInput";
import FileInput from "../../components/shared/FileInput";
import Button from "../../components/UI/Button";
import Select from "react-select";

// Document Types
const documentTypes = [
  { value: "national_id", label: "National ID" },
  { value: "passport", label: "Passport" },
];

// Validation Schema
const schema = z.object({
  document_type: z.string().min(1, "Please, select a document type"),
  document_front: z
    .any()
    .refine((files) => files?.length && files[0] instanceof File, {
      message: "Please upload the front side of the document",
    }),
  document_back: z
    .any()
    .refine((files) => files?.length && files[0] instanceof File, {
      message: "Please upload the back side of the document",
    }),
});

export default function VerDocumentInput() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("document_type", data.document_type);
    formData.append("document_front", data.document_front[0]);
    formData.append("document_back", data.document_back[0]);

    console.log("Document Type:", data.document_type);
    console.log("Front:", data.document_front[0]);
    console.log("Back:", data.document_back[0]);

    // TODO: send formData to backend API
  };

  return (
    <div className="grid grid-cols-12 w-11/12 max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden m-[30px]">
      {/* Left Side */}
      <div className="col-span-12 md:col-span-3 bg-secondary flex items-center justify-center p-6">
        <div className="text-white text-center">
          <h1 className="text-heading font-bold mb-2">Verification</h1>
          <p className="text-body">Verify your identity to use our services</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="col-span-12 md:col-span-9 p-8">
        <h2 className="text-heading font-heading mb-6">Upload Verification Documents</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Document Type */}
          <Controller
            name="document_type"
            control={control}
            render={({ field }) => (
              <SelectInput
                name="document_type"
                control={control}
                render={() => (
                  <Select
                    {...field}
                    options={documentTypes}
                    getOptionLabel={(option) => option.label}
                    value={documentTypes.find((opt) => opt.value === field.value)}
                    onChange={(option) => field.onChange(option?.value)}
                    placeholder="Select Document Type"
                  />
                )}
                options={documentTypes}
                placeholder="Select Document Type"
                error={errors.document_type}
              />
            )}
          />

          {/* Upload Front */}
          <Controller
            name="document_front"
            control={control}
            render={({ field }) => (
              <FileInput
                name="document_front"
                label="Upload Front Side"
                value={field.value}
                onChange={field.onChange}
                error={errors.document_front}
              />
            )}
          />

          {/* Upload Back */}
          <Controller
            name="document_back"
            control={control}
            render={({ field }) => (
              <FileInput
                name="document_back"
                label="Upload Back Side"
                value={field.value}
                onChange={field.onChange}
                error={errors.document_back}
              />
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            loading={isSubmitting}
            className="w-full"
            ariaLabel="upload documents"
          >
            Submit for Verification
          </Button>
        </form>
      </div>
    </div>
  );
}

VerDocumentInput.propTypes = {
  register: PropTypes.func,
  handleSubmit: PropTypes.func,
  control: PropTypes.object,
  setValue: PropTypes.func,
  errors: PropTypes.object,
  isSubmitting: PropTypes.bool,
  onSubmit: PropTypes.func,
};