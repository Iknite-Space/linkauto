import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../../services/firebase";
import { toast } from "react-toastify";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/UI/Button";
import { FaChevronLeft } from "react-icons/fa";

const schema = z.object({
  email: z.email(1, "Invalid email format").nonempty("Email is required"),
  password: z.string().min(1, "Password must be at least 8 characters"),
});

const ForgotPassword = () => {
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      //forget in firebase
      await resetPassword(auth, data.email);

      toast.success("Password reset email sent");
      //redirect to login
      navigate("/login");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid email");
      } else {
        console.error("unexpected error", error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="grid grid-cols-12 w-7/8 max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden m-[30px] ">
        {/* Left Side */}
        <div className="flex items-center justify-center col-span-12 p-6 md:col-span-3 bg-secondary">
          <div className="text-center text-white">
            <h1 className="mb-2 font-bold text-heading">Welcome</h1>
            <p className="text-body">Get a car for your trip easily</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-span-12 p-8 md:col-span-9 ">
          <div className="text-right text-body text-PrimaryTextColor mb-4">
            Don{"'"}t have an account?{" "}
            <a
              href="./Register"
              className="text-accent font-body hover:underline"
            >
              Sign up
            </a>
          </div>
          <h2 className="mb-2 text-heading font-heading">Forgot password?</h2>
          <h4 className="mb-6 ">Enter email to Recover account</h4>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              {...register("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              type="email"
              placeholder="Enter email"
            />
            {errors.email && (
              <div className="text-red">{errors.email.message}</div>
            )}

            <Button
              type="submit"
              ariaLabel="login"
              loading={loading}
              className=""
            >
              Send Email
            </Button>

            <a
              href="/"
              className="flex items-center gap-2 text-accent font-body hover:underline"
            >
              <span>
                <FaChevronLeft />
              </span>
              <span>Back to Login</span>
            </a>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
