// Register.jsx
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import api from "../../services/axios";
import {
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "../../services/firebase";
import { toast } from "react-toastify";
import Button from "../../components/UI/Button";

// Gender and Role Options
const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const roleOptions = [
  { value: "customer", label: "Customer" },
  { value: "car_owner", label: "Car Owner" },
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

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    //format the request body
    const user = {
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      gender: data.gender,
      phone: data.phone,
      zip_code: data.zip_code,
      city: data.city,
      street: data.street,
      region: data.region,
      role: data.role,
    };
    try {
      //first add the user to firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        data.password
      );
      const registeredUser = userCredential.user;
      //now send email verification link to the registered user
      await sendEmailVerification(registeredUser);
      const res = await api.post("/register", user);
      if (res.data.success) {
        toast.success("user created successfully");
      } else {
        //if the db operation was not successfull, delete the user from firebase
        await registeredUser.delete();
        toast.error("Failed to register user, Please try again later");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use.");
      } else {
        console.error("unexpected error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-12 w-11/12 max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden m-[30px]">
      {/* Left Side */}
      <div className="flex items-center justify-center col-span-12 p-6 md:col-span-3 bg-secondary">
        <div className="text-center text-white">
          <h1 className="mb-2 font-bold text-heading">Welcome</h1>
          <p className="text-body">Get a car for your trip easily</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="col-span-12 p-8 md:col-span-9">
        <div className="mb-4 text-right text-body text-PrimaryTextColor">
          Already have an account?{" "}
          <a href="/login" className="text-accent font-body hover:underline">
            Sign in
          </a>
        </div>

        <h2 className="mb-6 text-heading font-heading">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-4">
            <input
              {...register("fname")}
              placeholder="First Name"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              {...register("lname")}
              placeholder="Last Name"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {(errors.fname || errors.lname) && (
            <p className="text-sm text-red">
              {[errors.fname?.message, errors.lname?.message]
                .filter(Boolean)
                .join(" and ")}
            </p>
          )}

          <input
            {...register("email")}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.email && (
            <p className="text-sm text-red">{errors.email.message}</p>
          )}
          <input
            {...register("phone")}
            placeholder="Phone Number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.phone && (
            <p className="text-sm text-red">{errors.phone.message}</p>
          )}

          <div className="flex gap-4">
            <input
              {...register("zip_code")}
              placeholder="Zip Code"
              className="w-1/3 px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              {...register("city")}
              placeholder="City"
              className="w-1/3 px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              {...register("region")}
              placeholder="Region"
              className="w-1/3 px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {(errors.zip_code || errors.city || errors.region) && (
            <p className="text-sm text-red">
              {[
                [errors.zip_code?.message, errors.city?.message]
                  .filter(Boolean)
                  .join(" , "),
                errors.region?.message,
              ]
                .filter(Boolean)
                .join(" and ")}
            </p>
          )}

          <input
            {...register("street")}
            placeholder="Street"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.street && (
            <p className="text-sm text-red">{errors.street.message}</p>
          )}

          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={genderOptions}
                getOptionLabel={(option) => option.label}
                value={genderOptions.find(
                  (option) => option.value === field.value
                )} // ensure correct initial value
                onChange={(option) => field.onChange(option?.value)} // pass only string
                placeholder="Select Gender"
              />
            )}
          />
          {errors.gender && (
            <p className="text-sm text-red">{errors.gender.message}</p>
          )}

          {/* <input {...register("photo_url")} placeholder="Photo URL" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
          {errors.photo_url && <p className="text-sm text-red-500">{errors.photo_url.message}</p>} */}

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={roleOptions}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                value={roleOptions.find(
                  (option) => option.value === field.value
                )} // ensure correct initial value
                onChange={(option) => field.onChange(option?.value)} // pass only string
                placeholder="Select Role"
              />
            )}
          />
          {errors.role && (
            <p className="text-sm text-red">{errors.role.message}</p>
          )}

          <div className="flex gap-4">
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              {...register("confirm_password")}
              placeholder="Confirm Password"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {(errors.password || errors.confirm_password) && (
            <p className="text-sm text-red">
              {" "}
              {[errors.password?.message, errors.confirm_password?.message]
                .filter(Boolean)
                .join(" and ")}
            </p>
          )}

          <Button
            type="submit"
            ariaLabel="create user"
            loading={loading}
            className="w-full"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
