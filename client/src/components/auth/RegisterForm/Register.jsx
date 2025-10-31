import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCalendarAlt,
} from "react-icons/fa";

const RegisterForm = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          dob: dob,
          role: role.toLowerCase().trim(), 
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Server response error:", data);
        setError(data.detail || JSON.stringify(data));
        return;
      }

      if (response.ok) {
        // Navigate based on the user's role
        const userRole = role.toLowerCase().trim();
        if (userRole === "youth") {
          navigate("/userdashboard");
        } else if (userRole === "admin") {
          navigate("/adminsection");
        } else if (userRole === "counselor") {
          navigate("/counselordashboard");
        } else {
          // Fallback navigation or handle unknown roles
          navigate("/home");
        }
      } else {
        setError(data.detail || "Registration failed.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 h-[95vh]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden h-[77vh] mt-10">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 text-center">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-indigo-100">Sign up to get started!</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-3">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            {/* Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Email"
                required
              />
            </div>

            {/* DOB */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="text-gray-400" />
              </div>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Date of Birth"
                required
              />
            </div>

            {/* Role */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Role (youth, admin, counselor)"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <FaEye className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-4 py-2 cursor-pointer rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center px-8">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/loginForm"
              className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;