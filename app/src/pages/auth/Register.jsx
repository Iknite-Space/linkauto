
// Register.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/shared/Input";
import SelectInput from "../../components/shared/SelectInput";


// Options
const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const roleOptions = [
  { value: "customer", label: "Customer" },
  { value: "car_owner", label: "Car Owner" },
];

// Schema
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

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
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
          Already have an account?{" "}
          <a href="./Login" className="text-accent font-body hover:underline">
            Sign in
          </a>
        </div>

        <h2 className="text-heading font-heading mb-6">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="flex gap-4">
            <Input name="fname" register={register} error={errors.fname} placeholder="First Name" />
            <Input name="lname" register={register} error={errors.lname} placeholder="Last Name" />
          </div>

          {/* Email and Phone */}
          <Input name="email" register={register} error={errors.email} placeholder="Email" />
          <Input name="phone" register={register} error={errors.phone} placeholder="Phone Number" />

          {/* Address */}
          <div className="flex gap-4">
            <Input name="zip_code" register={register} error={errors.zip_code} placeholder="Zip Code" className="w-1/3" />
            <Input name="city" register={register} error={errors.city} placeholder="City" className="w-1/3" />
            <Input name="region" register={register} error={errors.region} placeholder="Region" className="w-1/3" />
          </div>

          <Input name="street" register={register} error={errors.street} placeholder="Street" />

          {/* Gender and Role */}
          <SelectInput
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={genderOptions}
                getOptionLabel={(option) => option.label}
                value={genderOptions.find(option => option.value === field.value)} // ensure correct initial value
                onChange={(option) => field.onChange(option?.value)} // pass only string
                placeholder="Select Gender"
              />
            )}
            options={genderOptions}
            placeholder="Select Gender"
            error={errors.gender}
          />

          <SelectInput
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={roleOptions}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                value={roleOptions.find(option => option.value === field.value)} // ensure correct initial value
                onChange={(option) => field.onChange(option?.value)} // pass only string
                placeholder="Select Role"
              />
            )}
            options={roleOptions}
            placeholder="Select Role"
            error={errors.role}
          />

          {/* Passwords */}
          <div className="flex gap-4">
            <Input
              name="password"
              type="password"
              register={register}
              error={errors.password}
              placeholder="Password"
            />
            <Input
              name="confirm_password"
              type="password"
              register={register}
              error={errors.confirm_password}
              placeholder="Confirm Password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-whiteColor py-2 rounded-md hover:bg-secondary transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
