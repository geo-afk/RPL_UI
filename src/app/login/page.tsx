'use client';

import { useContext, useState } from 'react';
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import SignUp from './components/signup';
import { AuthContext } from '@/auth/authContext';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface LoginProps {
  onLogin: (user: UserData) => void;
  darkMode: boolean;
  cardClass?: string;
}

export default function Login({ onLogin, darkMode, cardClass = '' }: LoginProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const authContext = useContext(AuthContext)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userDetails = await authContext?.login(username, password);

      if (!userDetails) throw new Error("Login failed");



      const user: UserData = {
        id: userDetails?.id,
        name: userDetails?.username,
        email: userDetails?.email,
        // role: userDetails?.role,
        role: "Admin",
      };

      onLogin(user);
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 px-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                <Shield className="text-white" size={48} />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-linear-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  RPL Security
                </h1>
                <p className="text-lg text-gray-300 mt-1">Policy Management System</p>
              </div>
            </div>

            <div className="space-y-4 mt-12">
              {[
                { title: 'Secure Access Control', desc: 'Role-based permissions with real-time policy evaluation' },
                { title: 'Comprehensive Auditing', desc: 'Track all access attempts and policy changes' },
                { title: 'AI-Powered Insights', desc: 'Detect anomalies and optimize security policies' },
              ].map((feat, i) => (
                <div key={i} className="flex items-start gap-3 p-5 bg-linear-to-br from-gray-800/80 to-gray-800/40 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all">
                  <CheckCircle className="text-green-400 shrink-0 mt-1" size={22} />
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feat.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className={`${cardClass} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-2xl shadow-2xl p-8 space-y-6 max-w-md w-full mx-auto`}>
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <Shield className="text-white" size={32} />
              </div>
            </div>
            <h2 className="text-2xl font-bold">RPL Security</h2>
            <p className="text-sm opacity-70 mt-1">Policy Management System</p>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-sm opacity-70">
              {isSignup ? 'Sign up to get started' : 'Sign in to access your dashboard'}
            </p>
          </div>

          {/* Login Form */}
          {!isSignup && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ex: Alex"
                    className={`w-full pl-10 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:border-blue-500 outline-none`}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-12 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:border-blue-500 outline-none`}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    Sign In
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsSignup(true)}
                  className="text-blue-400 cursor-pointer hover:text-blue-300 hover:underline text-sm"
                >
                  Don't have an account? Sign up
                </button>
              </div>
            </form>
          )}

          {/* Signup Form */}
          <SignUp isSignup={isSignup} darkMode={darkMode} setIsSignup={setIsSignup} />
        </div>
      </div>
    </div>
  );
}