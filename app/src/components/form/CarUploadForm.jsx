import {useState} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../shared/Input";
import SelectInput from "../shared/SelectInput";
import FileInput from "../shared/FileInput";
import Button from "../UI/Button";
import { toast } from "react-toastify";
import api from "../../services/axios";
import { useUser } from "../../hooks/UseAuth";
import Loading from "../shared/Loading";

// --- Zod Schema ---
const schema = z.object({
  owner_uuid: z.string(),
  pickup_location: z.string().min(1, "Pickup location is required"),
  dropoff_location: z.string().min(1, "Dropoff location is required"),
  name: z.string().min(1, "Car name is required"),
  model: z.string().min(1, "Model is required"),
  energy_type: z.enum(["fuel", "gas", "electric"]),
  transmission_type: z.enum(["manual", "automatic", "hybrid"]),
  brand: z.string().min(1, "Brand is required"),
  no_seats: z.string().optional(),
  color: z.string().min(1, "Color is required"),
  chassis_no: z.string().min(1, "Chassis No. is required"),
  vin: z.string().min(1, "VIN is required"),
  price_per_day: z.string().min(1, "Price is required"),

  cat_doc: z.array(z.instanceof(File)).min(1, "Carte Grise is required"),
  visite_technique_doc: z.array(z.instanceof(File)).min(1, "Visite Technique is required"),
  insurance_doc: z.array(z.instanceof(File)).min(1, "Insurance doc is required"),
  car_gallery: z.array(z.instanceof(File)).min(1, "At least one image is required"),
});

// --- Select Options ---
const energyOptions = [
  { label: "Fuel", value: "fuel" },
  { label: "Gas", value: "gas" },
  { label: "Electric", value: "electric" },
];

const transmissionOptions = [
  { label: "Manual", value: "manual" },
  { label: "Automatic", value: "automatic" },
  { label: "Hybrid", value: "hybrid" },
];

export default function CarUploadForm() {
  const {currentUser, loading} = useUser()
  const [loader, setLoader] = useState(false)
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      owner_uuid: currentUser?.uuid,
      pickup_location: "",
      dropoff_location: "",
      name: "",
      model: "",
      energy_type: "",
      transmission_type: "",
      brand: "",
      no_seats: "",
      color: "",
      chassis_no: "",
      vin: "",
      price_per_day: "",
      cat_doc: [],
      visite_technique_doc: [],
      insurance_doc: [],
      car_gallery: [],
    },
  });


  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
  
      // Append scalar values
      for (const key in data) {
        if (Array.isArray(data[key]) && data[key][0] instanceof File) {
          // Append files
          if (key === "car_gallery") {
            data[key].forEach((file) => formData.append("car_gallery", file));
          } else {
            formData.append(key, data[key][0]); // single file fields
          }
        } else {
          formData.append(key, data[key]);
        }
      }
  
      const res = await api.post("/car", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      toast.success(res.data.message);
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      toast.error("Upload failed: " + (error.response?.data?.error || error.message));
    } finally {
      setLoader(false);
      window.location.reload()
    }
  };
  

  if (loading) return <Loading />;
  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-center">Upload Car</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* ===== Basic Info ===== */}
        <div>
            <h3 className="flex items-center gap-4 my-6 text-xl font-semibold text-secondary">
                <span className="flex-1 h-px bg-gray-300"></span>
                    Basic Info
                <span className="flex-1 h-px bg-gray-300"></span>
            </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              name="pickup_location"
              label={"Pickup Location"}
              register={register}
              error={errors.pickup_location}
              placeholder="Enter pickup location"
            />
            <Input
              name="dropoff_location"
              label={`Dropoff Location`}
              register={register}
              error={errors.dropoff_location}
              placeholder="Enter dropoff location"
            />
          </div>
        </div>

        <hr className="my-4" />

        {/* ===== Car Details ===== */}
        <div>
            <h3 className="flex items-center gap-4 my-6 text-xl font-semibold text-secondary">
                <span className="flex-1 h-px bg-gray-300"></span>
                    Car Details
                <span className="flex-1 h-px bg-gray-300"></span>
            </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input
              name="name"
              label={`Car Name`}
              isRequired = {true}
              register={register}
              error={errors.name}
              placeholder="e.g. Toyota Corolla"
            />
            <Input
              name="brand"
              isRequired = {true}
              label={`Brand`}
              register={register}
              error={errors.brand}
              placeholder="e.g. Toyota"
            />
            <Input
              name="model"
              label={`Model`}
              isRequired = {true}
              register={register}
              error={errors.model}
              placeholder="e.g. LE 2022"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
            <SelectInput
              name="energy_type"
              control={control}
              options={energyOptions}
              placeholder={`Select Energy Type`}
              error={errors.energy_type}
            />
            <SelectInput
              name="transmission_type"
              control={control}
              options={transmissionOptions}
              placeholder={`Select Transmission Type`}
              error={errors.transmission_type}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-3">
            <Input
              name="color"
              label={`Color`}
              isRequired = {true}
              register={register}
              error={errors.color}
              placeholder="e.g. Red"
            />
            <Input
              name="no_seats"
              label="Number of Seats"
              type="number"
              isRequired = {true}
              register={register}
              error={errors.no_seats}
              placeholder="e.g. 5"
            />
            <Input
              name="price_per_day"
              label={`Price Per Day`}
              type="number"
              isRequired = {true}
              register={register}
              error={errors.price_per_day}
              placeholder="e.g. 100"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
            <Input
              name="vin"
              label={`VIN`}
              isRequired = {true}
              register={register}
              error={errors.vin}
              placeholder="Enter VIN"
            />
            <Input
              name="chassis_no"
              label={`Chassis No`}
              isRequired = {true}
              register={register}
              error={errors.chassis_no}
              placeholder="Enter chassis number"
            />
          </div>
        </div>

        <hr className="my-4" />

        {/* ===== Documents ===== */}
        <div>
            <h3 className="flex items-center gap-4 my-6 text-xl font-semibold text-secondary">
                <span className="flex-1 h-px bg-gray-300"></span>
                    Car Documents
                <span className="flex-1 h-px bg-gray-300"></span>
            </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FileInput
              name="cat_doc"
              label={`Carte Grise`}
              isRequired = {true}
              onChange={(files) => setValue("cat_doc", files)}
              error={errors.cat_doc}
            />
            <FileInput
              name="visite_technique_doc"
              label={`Visite Technique  `}
              isRequired = {true}
              onChange={(files) => setValue("visite_technique_doc", files)}
              error={errors.visite_technique_doc}
            />
            <FileInput
              name="insurance_doc"
              label={`Insurance  `}
              isRequired = {true}
              onChange={(files) => setValue("insurance_doc", files)}
              error={errors.insurance_doc}
            />
          </div>
        </div>

        <hr className="my-4" />

        {/* ===== Gallery ===== */}
        <div>
        <h3 className="flex items-center gap-4 my-6 text-xl font-semibold text-secondary">
            <span className="flex-1 h-px bg-gray-300"></span>
                Car Gallery
            <span className="flex-1 h-px bg-gray-300"></span>
        </h3>

          <FileInput
            name="car_gallery"
            isRequired = {true}
            label={`Upload Car Images  `}
            multiple={true}
            onChange={(files) => setValue("car_gallery", files)}
            error={errors.car_gallery}
          />
        </div>

        <div className="mt-6 text-center">
        <Button type="submit" loading={loader} className="w-full" ariaLabel="upload documents">
            Upload Car
        </Button>
        </div>
      </form>
    </div>
  );
}
