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
      // You can navigate to feed or home page after login
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 space-y-4">
        <div className="flex justify-end">
          <button className="text-gray-400 hover:text-black text-xl">×</button>
        </div>

        {/* Google login button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center gap-2 hover:bg-gray-50"
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
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button className="w-full bg-black text-white rounded-md py-2 font-medium hover:opacity-90">
          Log in
        </button>

        <div className="flex flex-col items-center text-xs text-gray-500 space-y-1">
          <a href="#" className="hover:underline">
            Use single sign-on
          </a>
          <a href="#" className="hover:underline">
            Reset password
          </a>
          <div>
            No account?{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Create one
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
