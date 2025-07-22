import React from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Logged in user:', user);
      // TODO: Navigate to /feed or home after login
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-sm w-full space-y-5 border border-white/20">
        <div className="flex justify-end">
          <button className="text-white hover:text-gray-400 text-xl">×</button>
        </div>

        {/* Google login button */}
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

        <div className="text-center text-xs text-gray-400">or</div>

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-transparent border border-white/20 rounded-md px-3 py-2 text-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-transparent border border-white/20 rounded-md px-3 py-2 text-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button className="w-full bg-green-500 text-white rounded-md py-2 font-medium hover:bg-green-600 transition">
          Log in
        </button>

        <div className="flex flex-col items-center text-xs text-gray-400 space-y-1">
          <a href="#" className="hover:underline">Use single sign-on</a>
          <a href="#" className="hover:underline">Reset password</a>
          <div>
            No account? <a href="#" className="text-green-400 hover:underline">Create one</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
