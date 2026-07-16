import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Login = ({
  isModal = false,
  onClose,
  switchToSignup,
}) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const allowedDomain = "@jainuniversity.ac.in";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();

    setError("");

    const email = form.email.toLowerCase().trim();

    if (!email.endsWith(allowedDomain)) {
      setError("Only @jainuniversity.ac.in emails are allowed.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password: form.password,
        }
      );

      localStorage.setItem("token", response.data.token);

      if (isModal && onClose) {
        onClose();
      }

      navigate("/feed");

    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      const email = result.user.email.toLowerCase();

      if (!email.endsWith(allowedDomain)) {
        alert("Only @jainuniversity.ac.in emails are allowed.");
        await signOut(auth);
        return;
      }

      if (isModal && onClose) {
        onClose();
      }

      navigate("/feed");

    } catch (err) {
      console.error(err);
      setError("Google sign in failed.");
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
            Welcome back
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Sign in using your university account.
          </p>
        </div>

        <form
          onSubmit={handleEmailPasswordLogin}
          className="space-y-4"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 transition rounded-lg py-3 font-semibold"
          >
            Log In
          </button>

                    <div className="text-center text-xs text-gray-400">
            or
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full border border-white/20 rounded-lg py-3 flex items-center justify-center gap-3 hover:bg-white/10 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />

            <span>Continue with Google</span>
          </button>

          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

        </form>

        <div className="mt-8 space-y-3 text-center">

          <button
            onClick={() => navigate("/reset-password")}
            className="text-xs text-gray-400 hover:text-white transition"
          >
            Forgot your password?
          </button>

          <p className="text-sm text-gray-400">
            Don't have an account?{" "}

            <button
              onClick={() => {
                if (isModal && switchToSignup) {
                  switchToSignup();
                } else {
                  navigate("/signup");
                }
              }}
              className="text-green-400 hover:underline"
            >
              Sign up
            </button>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;