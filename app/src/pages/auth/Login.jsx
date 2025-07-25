import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../../services/firebase";
import { toast } from "react-toastify";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/UI/Button";

const schema = z.object({
  email: z.email(1, "Invalid email format").nonempty("Email is required"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      //signin to firebase
      await signInWithEmailAndPassword(auth, data.email, data.password);
      //redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid email or password");
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
          <div className="mb-4 text-right text-body text-PrimaryTextColor">
            Don{"'"}t have an account?{" "}
            <Link to="/register" className="text-accent font-body hover:underline">
              Sign up
            </Link>
          </div>
          <h2 className="mb-6 text-heading font-heading">Login</h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email</label>
            <input
              {...register("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              type="email"
              placeholder="Enter email"
            />
            {errors.email && (
              <div className="text-red">{errors.email.message}</div>
            )}
            <label htmlFor="password">Password: </label>
            <input
              {...register("password")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              type="password"
              placeholder="Enter password"
            ></input>
            {errors.password && (
              <div className="text-red">{errors.password.message}</div>
            )}

            <div className="flex items-center justify-between mt-4">
              <Link
                to="/forgot-password"
                className="text-accent font-body hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              type="submit"
              ariaLabel="login"
              loading={loading}
              className=""
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
