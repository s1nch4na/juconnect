import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const allowedDomain = '@jainuniversity.ac.in';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    setError('');

    const email = form.email.toLowerCase();
    if (!email.endsWith(allowedDomain)) {
      setError('Only @jainuniversity.ac.in emails are allowed.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, form.password);
      navigate('/feed');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email.toLowerCase();

      if (!email.endsWith(allowedDomain)) {
        alert('Only @jainuniversity.ac.in emails are allowed.');
        await signOut(auth);
        return;
      }

      navigate('/feed');
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('Google sign-in failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-sm w-full space-y-5 border border-white/20">
        <div className="flex justify-end">
          <button
            className="text-white hover:text-gray-400 text-xl"
            onClick={() => navigate('/')}
          >
            ×
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-4">Log in to JUConnect</h2>

        {/* Email + Password Login Form */}
        <form onSubmit={handleEmailPasswordLogin} className="space-y-4">
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
            Log in
          </button>
        </form>

        <div className="text-xs text-center text-gray-400">or</div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full border border-white/20 rounded-md py-2 flex items-center justify-center gap-2 hover:bg-white/10 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5 w-5"
          />
          <span className="text-sm font-medium">Continue with Google</span>
        </button>

        {/* Error message */}
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {/* Footer options */}
        <div className="flex flex-col items-center text-xs text-gray-400 space-y-1 mt-4">
          <button onClick={() => navigate('/sso')} className="hover:underline">
            Use single sign-on
          </button>
          <button onClick={() => navigate('/reset-password')} className="hover:underline">
            Reset password
          </button>
          <div>
            No account?{' '}
            <button onClick={() => navigate('/signup')} className="text-green-400 hover:underline">
              Create one
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
