'use client';

import { api } from '@/lib/api';
import { RegisterUserRequest } from '@/models/model';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Loader2,
  Mail,
  ArrowLeft,
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface SignUpProps {
  isSignup: boolean;
  darkMode: boolean;
  setIsSignup: (value: boolean) => void;
}



export default function SignUp({ isSignup, darkMode, setIsSignup }: SignUpProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Signup flow state
  const [signupStep, setSignupStep] = useState<'username' | 'details'>('username');
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);

  // Form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordFocused, setPasswordFocused] = useState(false);

  // Password validation
  const validatePassword = (pw: string): { valid: boolean; issues: string[] } => {
    const issues: string[] = [];
    if (pw.length < 12) issues.push('At least 12 characters');
    if (pw.length > 128) issues.push('Maximum 128 characters');
    if (!/[A-Z]/.test(pw)) issues.push('One uppercase letter');
    if (!/[a-z]/.test(pw)) issues.push('One lowercase letter');
    if (!/[0-9]/.test(pw)) issues.push('One number');
    if (!/[!@#$%^&*()_\-+=\[\]{};:"',.<>/?\\|`~]/.test(pw)) issues.push('One special character');

    return { valid: issues.length === 0, issues };
  };

  const passwordValidation = validatePassword(password);

  // Username validation
  const validateUsername = (uname: string): { valid: boolean; message?: string } => {
    if (uname.length < 3) return { valid: false, message: 'Minimum 1 characters' };
    if (uname.length > 20) return { valid: false, message: 'Maximum 20 characters' };
    if (!/^[a-zA-Z0-9_-]+$/.test(uname)) return { valid: false, message: 'Only letters, numbers, _ and -' };
    return { valid: true };
  };

  const checkUsernameAvailability = async (uname: string) => {
    const validation = validateUsername(uname);
    if (!validation.valid) {
      setUsernameAvailable(null);
      return;
    }

    setCheckingUsername(true);
    setError(null);

    try {
      const available = await api.checkUserName(uname);
      setUsernameAvailable(available);
    } catch (err) {
      setError('Failed to check username availability');
      setUsernameAvailable(false);
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleUsernameCheck = () => {
    if (usernameAvailable) {
      setSignupStep('details');
    }
  };

  const handleSignup = async () => {
    setError(null);
    setLoading?.(true); 

    if (!firstName || !lastName || !email || !password || !confirmPassword || !username) {
        setError('Please fill in all fields');
        setLoading?.(false);
        return;
    }

    // Password match
    if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading?.(false);
        return;
    }

    // Password strength
    if (!passwordValidation.valid) {
        setError('Please meet all password requirements');
        setLoading?.(false);
        return;
    }

    try {
        const userData: RegisterUserRequest = {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password,
        };

        const response = await api.registerUser(userData);

        // Success!
        if (response) {
        toast.success(response);
        }
    } catch (err: any) {
        console.error('Signup failed:', err);

        const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        'Signup failed. Please try again.';

        setError(message);
        toast.error(message);
    } finally {
        setLoading?.(false);
    }
  };

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setConfirmPassword('');
    setError(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setSignupStep('username');
    setUsernameAvailable(null);
  };

  if (!isSignup) return null;

  return (
    <>
      {/* Step 1: Username Check */}
      {signupStep === 'username' && (
        <div className="space-y-5">
          <div>
            <label htmlFor="signup-username" className="block text-sm font-medium mb-2">
              Enter a Username
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                id="signup-username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameAvailable(null);
                }}
                onBlur={() => username && validateUsername(username).valid && checkUsernameAvailability(username)}
                placeholder="Enter desired username"
                className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 focus:border-blue-500 text-white'
                    : 'bg-white border-gray-300 focus:border-blue-500 text-gray-900'
                } outline-none transition-colors focus:ring-2 focus:ring-blue-500/20`}
                autoFocus
                disabled={checkingUsername}
                autoComplete="username"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {checkingUsername ? (
                  <Loader2 className="animate-spin text-blue-500" size={18} />
                ) : usernameAvailable === true ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : usernameAvailable === false ? (
                  <AlertCircle className="text-red-500" size={20} />
                ) : null}
              </div>
            </div>

            {username.length > 0 && (
              <div className="mt-2 text-sm">
                {!validateUsername(username).valid ? (
                  <p className="text-amber-400 flex items-center gap-2">
                    <AlertCircle size={14} />
                    {validateUsername(username).message}
                  </p>
                ) : usernameAvailable === true ? (
                  <p className="text-green-400 flex items-center gap-2">
                    <CheckCircle size={14} />
                    Username is available!
                  </p>
                ) : usernameAvailable === false ? (
                  <p className="text-red-400 flex items-center gap-2">
                    <AlertCircle size={14} />
                    Username is already taken
                  </p>
                ) : checkingUsername ? (
                  <p className="opacity-70">Checking availability...</p>
                ) : null}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleUsernameCheck}
            disabled={!usernameAvailable || checkingUsername}
            className="w-full py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Continue
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignup(false);
                resetForm();
              }}
              className="text-blue-400 hover:text-blue-300 hover:underline text-sm"
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Complete Profile */}
      {signupStep === 'details' && (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-70 mb-1">Username</p>
                <p className="font-semibold flex items-center gap-2">
                  <User size={16} />
                  {username}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSignupStep('username')}
                className="text-sm text-blue-400 hover:text-blue-300 hover:underline"
              >
                Change
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="signup-firstname" className="block text-sm font-medium mb-2">First Name</label>
              <input
                id="signup-firstname"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:border-blue-500 outline-none`}
                required
              />
            </div>
            <div>
              <label htmlFor="signup-lastname" className="block text-sm font-medium mb-2">Last Name</label>
              <input
                id="signup-lastname"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:border-blue-500 outline-none`}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium mb-2">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className={`w-full pl-10 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:border-blue-500 outline-none`}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                placeholder="Create a strong password"
                className={`w-full pl-10 pr-12 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:border-blue-500 outline-none`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {(passwordFocused || password) && (
              <div className={`mt-2 p-3 rounded-lg text-xs space-y-1 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                <p className="font-medium mb-2">Password must include:</p>
                {passwordValidation.issues.map((issue, i) => (
                  <div key={i} className="flex items-center gap-2 opacity-70">
                    <span className="text-red-400">•</span>
                    <span>{issue}</span>
                  </div>
                ))}
                {passwordValidation.valid && (
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle size={14} />
                    <span>Password meets all requirements</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="signup-confirm-password" className="block text-sm font-medium mb-2">Confirm Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                id="signup-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className={`w-full pl-10 pr-12 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:border-blue-500 outline-none`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
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

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setSignupStep('username')}
              className={`flex-1 py-3 border rounded-lg font-medium flex items-center justify-center gap-2 ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}`}
              disabled={loading}
            >
              <ArrowLeft size={18} />
              Back
            </button>
            <button
              type="button"
              onClick={handleSignup}
              disabled={loading}
              className="flex-1 py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Creating...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}