import React, { useState } from 'react';
import { useSyllabus } from '../context/SyllabusContext';
import { Mail, Lock, ArrowRight, GraduationCap, Loader2, AlertCircle } from 'lucide-react';

export default function AuthView() {
  const { login, register, authError, loading } = useSyllabus();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!email || !password) {
      setValidationError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters long.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setValidationError('Passwords do not match.');
      return;
    }

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (err) {
      // Auth context handles general errors, but let's log
      console.error('Auth action failed:', err);
    }
  };

  const toggleTab = (loginTab) => {
    setIsLogin(loginTab);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setValidationError('');
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4 relative overflow-hidden font-outfit">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md z-10">
        
        {/* Brand Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-2xl shadow-lg shadow-violet-500/15 mb-3 flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            PrepGate
          </h1>
          <p className="text-zinc-400 text-sm mt-1">GATE CSE Syllabus & Progress Tracker</p>
        </div>

        {/* Auth Form Card */}
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-2xl">
          
          {/* Tab Selector */}
          <div className="grid grid-cols-2 p-1 bg-zinc-950 rounded-xl border border-zinc-800/60 mb-6">
            <button
              type="button"
              onClick={() => toggleTab(true)}
              className={`py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                isLogin
                  ? 'bg-zinc-800 text-white shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => toggleTab(false)}
              className={`py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                !isLogin
                  ? 'bg-zinc-800 text-white shadow-md'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Error Message Banners */}
            {(validationError || authError) && (
              <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm animate-fadeIn">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{validationError || authError}</span>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  required
                  className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-violet-500/80 focus:ring-4 focus:ring-violet-500/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-violet-500/80 focus:ring-4 focus:ring-violet-500/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 outline-none transition-all"
                />
              </div>
            </div>

            {/* Confirm Password (only on Signup) */}
            {!isLogin && (
              <div className="animate-slideDown">
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5 ml-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-violet-500/80 focus:ring-4 focus:ring-violet-500/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 active:from-violet-700 active:to-indigo-700 text-white font-semibold rounded-xl py-3 px-4 text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-violet-600/15 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In to Dashboard' : 'Create My Account'}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

          </form>

        </div>

        {/* Footer info */}
        <p className="text-zinc-600 text-xs text-center mt-6">
          Secure JWT sessions active. DB instances hosted serverless via SQLite.
        </p>

      </div>
    </div>
  );
}
