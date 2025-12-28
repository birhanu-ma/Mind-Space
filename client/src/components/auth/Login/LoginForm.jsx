import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAPI } from "../../../service/client";
import { login } from "../../../store/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      const user = data?.data?.user;
      dispatch(login(user));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);
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
          navigate("/home");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full transition-transform duration-300 hover:scale-[1.02]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">Email is required</span>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">Password is required</span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-4">
          <Link
            to="/forgot"
            className="text-indigo-600 hover:text-indigo-500 text-sm"
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
