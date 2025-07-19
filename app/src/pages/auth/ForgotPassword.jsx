import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "../../services/firebase";
import { toast } from "react-toastify";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/UI/Button";
import { FaChevronLeft } from "react-icons/fa";

// Schema
const schema = z.object({
  email: z.email().nonempty("Email is required"),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "example@gmail.com",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, data.email);
      toast.success("Password reset email sent successfully");
      // navigate("/login");
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid max-w-4xl grid-cols-12 m-8 overflow-hidden bg-white shadow-lg w-7/8 rounded-2xl">
      {/* Left Side */}
      <div className="flex items-center justify-center col-span-12 p-6 text-center text-white md:col-span-3 bg-secondary">
        <div>
          <h1 className="mb-2 font-bold text-heading">Welcome</h1>
          <p className="text-body">Get a car for your trip easily</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="col-span-12 p-8 md:col-span-9">
        <div className="mb-4 text-right text-body text-PrimaryTextColor">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-accent font-body hover:underline">
            Sign up
          </Link>
        </div>

        <h2 className="mb-2 text-heading font-heading">Forgot password?</h2>
        <h4 className="mb-6">Enter your email to recover your account</h4>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block mb-1 font-bold">
              Email
            </label>
            <input
              {...register("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              type="email"
              placeholder="Enter email"
            />
            {errors.email && (
              <div className="mt-1 text-red">{errors.email.message}</div>
            )}
          </div>

          <Button
            type="submit"
            ariaLabel="reset-password"
            loading={loading}
          >
            Reset Password
          </Button>

          <Link
            to="/"
            className="flex items-center gap-2 text-accent font-body hover:underline"
          >
            <FaChevronLeft />
            <span>Back to Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
