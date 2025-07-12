import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "example@gmail.com",
    },
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError("email", {
        message: "this email is not correct",
      });
    }
  };
  return (
    <>
      <div className="grid grid-cols-12 w-7/8 max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden m-[30px] ">
        {/* Left Side */}
        <div className="col-span-12 md:col-span-3 bg-secondary flex items-center justify-center p-6">
          <div className="text-white text-center">
            <h1 className="text-heading font-bold mb-2">Welcome</h1>
            <p className="text-body">Get a car for your trip easily</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-span-12 md:col-span-9 p-8 ">
          <h2 className="text-heading font-heading mb-6">Login</h2>

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
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-primary text-white p-2 rounded"
            >
              {isSubmitting ? "Loading" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;