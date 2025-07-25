import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      // 2. Store extra info like username in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: form.username,
        email: form.email,
        createdAt: new Date()
      });

      alert("Signup successful!");
      navigate("/feed"); // Redirect to feed or login
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-sm w-full space-y-5 border border-white/20">
        <div className="flex justify-end">
          <Link to="/">
            <button className="text-white hover:text-gray-400 text-xl">×</button>
          </Link>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full bg-transparent border border-white/20 rounded-md px-3 py-2 text-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent border border-white/20 rounded-md px-3 py-2 text-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full bg-transparent border border-white/20 rounded-md px-3 py-2 text-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white rounded-md py-2 font-medium hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        </form>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <div className="text-xs text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-green-400 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
