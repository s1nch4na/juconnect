import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/register", {
        username: form.username.trim(),
        email: form.email.toLowerCase().trim(),
        password: form.password,
      });

      alert("Account created successfully!");
      navigate("/login");
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
    <div className="min-h-screen bg-[#0d1117] flex text-gray-100 font-sans selection:bg-orange-500 selection:text-white overflow-hidden">
      
      {/* Left Column: Campus Chatter Hero (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#090d13] items-center justify-center p-12 overflow-hidden border-r border-[#1f242c]">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-md relative z-10 space-y-8">
          <div className="space-y-3">
            <span className="text-orange-500 font-semibold tracking-wider text-xs uppercase px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
              Join the Circle
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
              Where your campus <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">
                actually connects.
              </span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              No formal threads, no stiff networking. Just real-time updates, lost items, local project partners, and food alerts.
            </p>
          </div>

          {/* Styled CSS mockup of the floating bubbles to tie back to the landing page vibe */}
          <div className="space-y-4 pt-4">
            <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-2xl max-w-[85%] shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <span className="text-xs text-orange-400 font-medium">#lost-and-found</span>
              <p className="text-sm text-gray-300 mt-1">Found keys near the library. Hanging them at the main desk! 🔑</p>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-2xl max-w-[85%] ml-auto shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <span className="text-xs text-blue-400 font-medium">#hackathons</span>
              <p className="text-sm text-gray-300 mt-1">Need a backend dev for the upcoming weekend sprint. Slide in! 💻</p>
            </div>
            <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-2xl max-w-[80%] shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <span className="text-xs text-emerald-400 font-medium">#food-alerts</span>
              <p className="text-sm text-gray-300 mt-1">Free pizza at the seminar hall. First come first served! 🍕</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Sleek Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-20 relative">
        {/* Subtle background element for mobile */}
        <div className="lg:hidden absolute inset-0 bg-radial-gradient from-orange-500/5 to-transparent pointer-events-none" />

        <div className="w-full max-w-md space-y-8 relative z-10">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Create your account</h1>
            <p className="text-gray-400 text-sm mt-2">
              Ready to jump into the stream? Let's get you set up.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Username</label>
              <div className="relative group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="text"
                  name="username"
                  placeholder="ex. campus_legend"
                  required
                  value={form.username}
                  onChange={handleChange}
                  className="w-full bg-[#161b22] border border-[#30363d] text-white rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder-gray-600 text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Campus Email</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="yourname@univ.edu"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-[#161b22] border border-[#30363d] text-white rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder-gray-600 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-[#161b22] border border-[#30363d] text-white rounded-xl pl-11 pr-12 py-3.5 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder-gray-600 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-950/40 border border-red-800/60 rounded-xl p-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-lg shadow-orange-950/20 active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Join the Feed"}
            </button>
          </form>

          <div className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 hover:text-orange-400 font-semibold hover:underline transition-colors"
            >
              Log In
            </Link>
          </div>

          <div className="text-[11px] text-center text-gray-600 leading-relaxed max-w-[280px] mx-auto">
            By signing up, you agree to our Terms of Use and Campus Honor Code.
          </div>
        </div>
      </div>

    </div>
  );
};

export default Signup;