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
      <div className="login-container flex justify-around content-center gap-80 ">
        <div className="left-description">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
            reiciendis.
          </p>
        </div>
        <div className="form flex flex-col gap-4 content-start ">
          <h2 className="login-heading">Login</h2>
          <form
            className="form-input flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="email">Email</label>
            <input
              {...register("email")}
              className="border border-gray-300 p-2 rounded w-[400px]"
              type="email"
              placeholder="Enter email"
            />
            {errors.email && (
              <div className="text-red">{errors.email.message}</div>
            )}
            <label htmlFor="password">Password: </label>
            <input
              {...register("password")}
              className="border border-gray-300 p-2 rounded "
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
              {isSubmitting ? "Loading" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
