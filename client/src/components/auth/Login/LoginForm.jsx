import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../../../service/client";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      const user = data?.data?.user;

      console.log("this is loged in user data", user);

      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("id", user._id);

      switch (user.role) {
        case "counselor":
          navigate("/counselor");
          break;
        case "mentee":
          navigate("/mentee");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/");
      }
    },
    onError: (err) => {
      alert(err.response?.data?.message || err.message || "Login failed");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-background text-foreground p-8 rounded shadow-md w-full max-w-md border border-border"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">Email is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">Password is required</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-4">
          <Link to="/forgot" className="text-blue-500 hover:underline text-sm">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
