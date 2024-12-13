import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Mock authentication
    if (email === 'admin@example.com' && password === 'password') {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Left Section */}
      <div className="flex flex-col justify-center mr-12">
        <h1 className="text-5xl font-bold text-[#800000]">TORUS</h1>
        <p className="text-xl text-gray-600 mt-4">Innotech Private Limited</p>
      </div>

      {/* Right Section */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-sm p-6 space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-[#800000] focus:border-[#800000] border-gray-300 text-gray-700 placeholder-gray-500"
              placeholder="Email address or phone number"
              required
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-[#800000] focus:border-[#800000] border-gray-300 text-gray-700 placeholder-gray-500"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#800000] hover:bg-[#660000] text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Log In
          </button>
        </form>
        <div className="text-center">
          <a href="/forgot-password" className="text-[#800000] hover:underline text-sm">
            Forgotten password?
          </a>
        </div>
        <hr className="my-4 border-gray-300" />
        <div className="text-center">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition duration-300">
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
