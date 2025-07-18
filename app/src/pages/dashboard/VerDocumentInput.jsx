import { useEffect,useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import SelectInput from "../../components/shared/SelectInput";
import FileInput from "../../components/shared/FileInput";
import Button from "../../components/UI/Button";
import Select from "react-select";
import { useUser } from "../../hooks/UseAuth";
import Loading from "../../components/shared/Loading";
import api from "../../services/axios";
import { toast } from "react-toastify";

// Document Types
const documentTypes = [
  { value: "id_card", label: "National ID" },
  { value: "passport", label: "Passport" },
];

// Validation Schema
const schema = z.object({
  document_type: z.string().min(1, "Please select a document type"),
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
  user_uuid: z.string().min(1, "User UUID is required"),
});

export default function VerDocumentInput() {
  const { currentUser, loading } = useUser();
  const [ loader,setLoader ] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Set user_uuid into the form on mount
  useEffect(() => {
    if (currentUser?.uuid) {
      setValue("user_uuid", currentUser.uuid);
    }
  }, [currentUser, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("verification_type", data.document_type);
    formData.append("ver_doc1_url", data.document_front[0]);
    formData.append("ver_doc2_url", data.document_back[0]);
    formData.append("user_uuid", data.user_uuid);

    setLoader(true);
    try {
      const res = await api.post("/user-verification", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        toast.success("Documents uploaded successfully,Verification typically 1 to 2 hours");
      }else{
        toast.error("Failed to upload documents,Please try again",res.data.error);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error("Error: " + error.response.data.error);
      } else {
        console.error("Something went wrong. Please try again later.");
      }
    }finally{
      setLoader(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="grid grid-cols-12 w-11/12 max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden m-[30px]">
      {/* Left Side */}
      <div className="flex items-center justify-center col-span-12 p-6 md:col-span-3 bg-secondary">
        <div className="text-center text-white">
          <h1 className="mb-2 font-bold text-heading">Verification</h1>
          <p className="text-body">Verify your identity to use our services</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="col-span-12 p-8 md:col-span-9">
        <h2 className="mb-6 text-heading font-heading">
          Upload Verification Documents
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Hidden UUID Input */}
          <input type="hidden" {...register("user_uuid")} />

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
            loading={loader}
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
