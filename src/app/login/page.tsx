'use client';
import { useContext, useState, useEffect } from 'react';
import {
  Shield,
  User as UserIcon,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  CheckCircle,
  Loader2,
  Mail,
  User,
  Check,
  X
} from 'lucide-react';
import { AuthContext } from '../auth/authContext';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  password?: string;
}

interface LoginProps {
  onLogin: (user: User) => void;
  darkMode: boolean;
  cardClass: string;
}

export default function Login({ onLogin, darkMode, cardClass }: LoginProps) {
  // Shared
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login state
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Signup flow state
  const [signupStep, setSignupStep] = useState<'check-username' | 'details'>('check-username');
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  // Full signup form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Mock existing usernames (in real app, fetch from backend)
  const existingUsernames = ['alice', 'bob', 'carol', 'david', 'admin'];

  const mockUsers: User[] = [
    { id: 1, name: 'Alice Admin', email: 'alice@company.com', role: 'Admin', password: 'admin123' },
    { id: 2, name: 'Bob Developer', email: 'bob@company.com', role: 'Developer', password: 'dev123' },
    { id: 3, name: 'Carol Manager', email: 'carol@company.com', role: 'Manager', password: 'manager123' },
    { id: 4, name: 'David Guest', email: 'david@company.com', role: 'Guest', password: 'guest123' }
  ];

  const roleColors = {
    Admin: 'from-red-500 to-orange-500',
    Developer: 'from-blue-500 to-cyan-500',
    Manager: 'from-purple-500 to-pink-500',
    Guest: 'from-gray-500 to-gray-600'
  };

  const roleIcons = {
    Admin: 'Crown',
    Developer: 'Laptop',
    Manager: 'Chart',
    Guest: 'User'
  };

  // Password validation
  function validatePassword(pw: string): { valid: boolean; message?: string } {
    if (pw.length < 8) return { valid: false, message: "At least 8 characters" };
    if (!/[A-Z]/.test(pw)) return { valid: false, message: "One uppercase letter" };
    if (!/[a-z]/.test(pw)) return { valid: false, message: "One lowercase letter" };
    if (!/[0-9]/.test(pw)) return { valid: false, message: "One number" };
    if (!/[!@#$%^&*()_\-\+=\[\]{};:"',.<>/?\\|`~]/.test(pw)) return { valid: false, message: "One special character" };
    if (/\s/.test(pw)) return { valid: false, message: "No spaces allowed" };
    return { valid: true };
  }

  // Check username availability
  const checkUsernameAvailability = async (uname: string) => {
    if (!uname || uname.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    setCheckingUsername(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 600));

    const available = !existingUsernames.map(u => u.toLowerCase()).includes(uname.toLowerCase());
    setUsernameAvailable(available);
    setCheckingUsername(false);
  };

  useEffect(() => {
    if (isSignup && signupStep === 'check-username' && username) {
      const timer = setTimeout(() => checkUsernameAvailability(username), 500);
      return () => clearTimeout(timer);
    }
  }, [username, isSignup, signupStep]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const user = mockUsers.find(
        u => u.name.toLowerCase() === username.toLowerCase() && u.password === password
      );
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 800);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Final validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const pwValidation = validatePassword(password);
    if (!pwValidation.valid) {
      setError(pwValidation.message || "Invalid password");
      return;
    }

    setLoading(true);

    // Simulate successful signup
    setTimeout(() => {
      const newUser: User = {
        id: mockUsers.length + 1,
        name: `${firstName} ${lastName}`.trim(),
        email: email,
        role: 'Developer', // default role
      };
      onLogin(newUser);
      setLoading(false);
    }, 1000);
  };

  const handleQuickLogin = (user: User) => {
    setLoading(true);
    setTimeout(() => {
      onLogin(user);
      setLoading(false);
    }, 500);
  };

  const resetSignup = () => {
    setUsername('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setConfirmPassword('');
    setUsernameAvailable(null);
    setSignupStep('check-username');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-gray-900/50">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-500/20 rounded-2xl backdrop-blur-sm">
                <Shield className="text-blue-500" size={48} />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  SPL Security
                </h1>
                <p className="text-lg opacity-70">Policy Management System</p>
              </div>
            </div>
            {/* Features */}
            <div className="space-y-4 mt-8">
              {['Secure Access Control', 'Comprehensive Auditing', 'AI-Powered Insights'].map((feat, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/50">
                  <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold mb-1">{feat}</h3>
                    <p className="text-sm opacity-70">
                      {i === 0 && "Role-based permissions with real-time policy evaluation"}
                      {i === 1 && "Track all access attempts and policy changes"}
                      {i === 2 && "Detect anomalies and optimize security policies"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Auth Card */}
        <div className={`${cardClass} border rounded-2xl shadow-2xl p-8 space-y-6 min-h-[600px]`}>
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Shield className="text-blue-500" size={32} />
              </div>
            </div>
            <h2 className="text-2xl font-bold">SPL Security</h2>
            <p className="text-sm opacity-70 mt-1">Policy Management System</p>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {isSignup ? (signupStep === 'check-username' ? 'Create Account' : 'Complete Profile') : 'Welcome Back'}
            </h2>
            <p className="text-sm opacity-70">
              {isSignup
                ? signupStep === 'check-username'
                  ? 'Choose a unique username'
                  : 'Fill in your details'
                : 'Sign in to access your dashboard'}
            </p>
          </div>

          {/* Login Form */}
          {!isSignup && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <div className="relative">
                  <UserIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} outline-none transition-colors`}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-12 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-500'} outline-none transition-colors`}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
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
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <LogIn size={20} />}
                <span>{loading ? 'Signing in...' : 'Sign In'}</span>
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => { setIsSignup(true); resetSignup(); }}
                  className="text-blue-400 hover:underline text-sm"
                >
                  Don't have an account? Sign up
                </button>
              </div>
            </form>
          )}

          {/* Signup Flow */}
          {isSignup && (
            <>
              {signupStep === 'check-username' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">Choose Username</label>
                    <div className="relative">
                      <UserIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter desired username"
                        className={`w-full pl-10 pr-12 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} outline-none transition-colors`}
                        autoFocus
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {checkingUsername ? (
                          <Loader2 className="animate-spin text-blue-500" size={18} />
                        ) : usernameAvailable === true ? (
                          <Check className="text-green-500" size={20} />
                        ) : usernameAvailable === false ? (
                          <X className="text-red-500" size={20} />
                        ) : null}
                      </div>
                    </div>
                    {username.length > 0 && (
                      <p className={`text-sm mt-2 flex items-center gap-2 ${usernameAvailable ? 'text-green-400' : 'text-red-400'}`}>
                        {usernameAvailable === true && 'Username available!'}
                        {usernameAvailable === false && 'Username already taken'}
                        {usernameAvailable === null && username.length < 3 && 'Minimum 3 characters'}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => usernameAvailable && setSignupStep('details')}
                    disabled={!usernameAvailable || checkingUsername}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
                  >
                    Continue
                  </button>

                  <button
                    type="button"
                    onClick={() => { setIsSignup(false); resetSignup(); }}
                    className="w-full text-center text-sm text-blue-400 hover:underline"
                  >
                    Back to Sign In
                  </button>
                </div>
              )}

              {signupStep === 'details' && (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} outline-none`}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} outline-none`}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} outline-none`}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} outline-none`}
                        required
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} outline-none`}
                        required
                      />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100">
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSignupStep('check-username')}
                      className="flex-1 py-3 border border-gray-600 rounded-lg font-medium"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : null}
                      <span>Create Account</span>
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

          {/* Quick Login & Demo */}
          {!isSignup && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} opacity-70`}>
                    Or quick login as
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {mockUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleQuickLogin(user)}
                    className={`p-4 rounded-xl border-2 transition-all ${darkMode ? 'border-gray-700 hover:border-gray-600 bg-gray-700/50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}
                  >
                    <div className="text-center space-y-2">
                      <div className={`text-3xl mb-1 bg-gradient-to-br ${roleColors[user.role as keyof typeof roleColors]} w-12 h-12 rounded-full flex items-center justify-center mx-auto`}>
                        {roleIcons[user.role as keyof typeof roleIcons]}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{user.role}</p>
                        <p className="text-xs opacity-60 truncate">{user.name}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/30' : 'bg-gray-100'} border border-gray-700/30 text-xs`}>
                <p className="opacity-70 mb-2 font-semibold">Demo Credentials:</p>
                <div className="grid grid-cols-2 gap-2 opacity-60">
                  {mockUsers.map((u) => (
                    <div key={u.id}>
                      <span className="font-mono">{u.name}</span> / <span className="font-mono">{u.password}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}