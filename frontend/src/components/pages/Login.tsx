import React, { useState } from 'react';
import API from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAuth } from "../AuthContext";
import type { User } from '../../types';
import { AxiosError } from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post<User>("/auth/login", { email, password });
      login(response.data);
      enqueueSnackbar("Logged in successfully", { variant: "success" });
      navigate("/books");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      enqueueSnackbar(axiosError.response?.data?.message || "Login failed", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 w-full max-w-md animate-in zoom-in duration-300">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 mb-3">Welcome Back</h1>
          <p className="text-slate-500">Enter your credentials to access your library</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 text-lg mt-4 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-sky-600 font-bold hover:underline">
              Create one for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
