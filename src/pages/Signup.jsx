import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Signup = ({
  isModal = false,
  onClose,
  switchToLogin,
}) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const allowedDomain = "@jainuniversity.ac.in";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const email = form.email.toLowerCase().trim();

    if (!email.endsWith(allowedDomain)) {
      setError("Only @jainuniversity.ac.in email addresses are allowed.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/register",
        {
          username: form.username.trim(),
          email,
          password: form.password,
        }
      );

      if (isModal && onClose) {
        onClose();
      }

      navigate("/feed");

    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Unable to create account.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={
        isModal
          ? "flex items-center justify-center text-white px-4"
          : "min-h-screen flex items-center justify-center bg-black text-white px-4"
      }
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md">

        <div className="flex justify-end">
          <button
            className="text-2xl hover:text-gray-400 transition"
            onClick={() => {
              if (isModal && onClose) {
                onClose();
              } else {
                navigate("/");
              }
            }}
          >
            ×
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Create your account
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Join JUConnect with your university email.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div className="relative">

            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={form.username}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/20 rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          <div className="relative">

            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="email"
              name="email"
              placeholder="yourname@jainuniversity.ac.in"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/20 rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          <div className="relative">

  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    required
    value={form.password}
    onChange={handleChange}
    className="w-full bg-transparent border border-white/20 rounded-lg py-3 pl-11 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2"
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>

</div>   {/* <-- YOU WERE MISSING THIS */}

{error && (
  <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-3">
    <p className="text-red-400 text-sm text-center">
      {error}
    </p>
  </div>
)}

<button
  type="submit"
  disabled={loading}
  className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-60 transition rounded-lg py-3 font-semibold"
>
  {loading ? "Creating account..." : "Create Account"}
</button>

</form>
        <div className="mt-8 text-center">

          <p className="text-sm text-gray-400">
            Already have an account?{" "}

            {isModal ? (
              <button
                onClick={() => switchToLogin && switchToLogin()}
                className="text-green-400 hover:underline"
              >
                Log In
              </button>
            ) : (
              <Link
                to="/login"
                className="text-green-400 hover:underline"
              >
                Log In
              </Link>
            )}

          </p>

        </div>

        <p className="text-xs text-center text-gray-500 mt-6 leading-relaxed">
          By continuing, you agree to the JUConnect Terms and confirm that
          you're using a valid{" "}
          <span className="text-white">
            @jainuniversity.ac.in
          </span>{" "}
          email address.
        </p>

      </div>
    </div>
  );
};

export default Signup;