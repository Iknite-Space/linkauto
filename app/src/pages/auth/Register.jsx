// Register.jsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";

// Gender and Role Options
const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const roleOptions = [
  { value: "user", label: "Customer" },
  { value: "carOwner", label: "Car Owner" },
];

// Zod Schema
const schema = z
  .object({
    fname: z.string().min(1, "First Name is required"),
    lname: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Phone number is required"),
    zip_code: z.string().min(1, "Zip code is required"),
    city: z.string().min(1, "City is required"),
    region: z.string().min(1, "Region is required"),
    street: z.string().min(1, "Street is required"),
    gender: z.string().min(1, "Gender is required"),
    role: z.string().min(1, "Role is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export default function Register() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {
  console.log(FormData);
};


  return (
    <div className="grid grid-cols-12 w-11/12 max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden m-[30px]">
      {/* Left Side */}
      <div className="col-span-12 md:col-span-3 bg-secondary flex items-center justify-center p-6">
        <div className="text-white text-center">
          <h1 className="text-heading font-bold mb-2">Welcome</h1>
          <p className="text-body">Get a car for your trip easily</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="col-span-12 md:col-span-9 p-8">
        <div className="text-right text-body text-PrimaryTextColor mb-4">
          Already have an account?{' '}
          <a href="./Login" className="text-accent font-body hover:underline">
            Sign in
          </a>
        </div>

        <h2 className="text-heading font-heading mb-6">Create Account</h2>

        

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-4">
            <input {...register("fname")} placeholder="First Name" className="w-1/2 px-4 py-2 border border-gray-300 rounded-md" />
            <input {...register("lname")} placeholder="Last Name" className="w-1/2 px-4 py-2 border border-gray-300 rounded-md" />
          </div>
          {(errors.fname || errors.lname) && (<p className="text-red text-sm">{[errors.fname?.message, errors.lname?.message].filter(Boolean) .join(" and ")}</p>)}


          <input {...register("email")} placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
          {errors.email && <p className="text-red text-sm">{errors.email.message}</p>}
          <input {...register("phone")} placeholder="Phone Number" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
          {errors.phone && <p className="text-red text-sm">{errors.phone.message}</p>}

          <div className="flex gap-4">
            <input {...register("zip_code")} placeholder="Zip Code" className="w-1/3 px-4 py-2 border border-gray-300 rounded-md" />
            <input {...register("city")} placeholder="City" className="w-1/3 px-4 py-2 border border-gray-300 rounded-md" />
            <input {...register("region")} placeholder="Region" className="w-1/3 px-4 py-2 border border-gray-300 rounded-md" />
          </div>
          {(errors.zip_code || errors.city || errors.region) && (<p className="text-red text-sm">{[[errors.zip_code?.message, errors.city?.message].filter(Boolean).join(" , "), errors.region?.message] .filter(Boolean) .join(" and ")}</p> )}

          <input {...register("street")} placeholder="Street" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
          {errors.street && <p className="text-red text-sm">{errors.street.message}</p>}

          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={genderOptions}
                placeholder="Select Gender"
                onChange={(option) => field.onChange(option?.value)}
              />
            )}
          />
          {errors.gender && <p className="text-red text-sm">{errors.gender.message}</p>}

          {/* <input {...register("photo_url")} placeholder="Photo URL" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
          {errors.photo_url && <p className="text-red-500 text-sm">{errors.photo_url.message}</p>} */}

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={roleOptions}
                placeholder="Select Role"
                onChange={(option) => field.onChange(option?.value)}
              />
            )}
          />
          {errors.role && <p className="text-red text-sm">{errors.role.message}</p>}

          <div className="flex gap-4">
            <input type="password" {...register("password")} placeholder="Password" className="w-1/2 px-4 py-2 border border-gray-300 rounded-md" />
            <input type="password" {...register("confirm_password")} placeholder="Confirm Password" className="w-1/2 px-4 py-2 border border-gray-300 rounded-md" />
          </div>
          {(errors.password || errors.confirm_password) && (<p className="text-red text-sm"> {[errors.password?.message, errors.confirm_password?.message] .filter(Boolean) .join(" and ")}</p>)}


          <button type="submit" className="w-full bg-primary text-whiteColor py-2 rounded-md hover:bg-secondary transition">
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}
