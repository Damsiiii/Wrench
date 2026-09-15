import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Home, Briefcase } from 'lucide-react';

export default function AuthModalOrPage({
  initialMode = 'signin',
  onSuccess,
  onCancel
}) {
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userIntent, setUserIntent] = useState('need_help'); // 'need_help' | 'find_work'
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSuccess) {
      onSuccess({
        email: email || 'kasun.perera@gmail.com',
        name: fullName || 'Kasun Perera',
        role: userIntent === 'need_help' ? 'customer' : 'worker'
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      {/* Tab Switcher at top for seamless testing */}
      <div className="flex items-center justify-center mb-6">
        <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
          <button
            onClick={() => setMode('signin')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              mode === 'signin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign in
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              mode === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Create account
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-10 shadow-sm space-y-6">
        {mode === 'signin' ? (
          /* Sign In Form */
          <>
            <div className="text-center space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Sign in to WRENCH
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                Welcome back. Sign in to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#008272] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#008272] focus:outline-none"
                  />
                </div>
                <div className="text-right pt-1">
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent.')}
                    className="text-xs font-semibold text-[#008272] hover:text-[#006357]"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#008272] hover:bg-[#007163] text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm text-sm"
              >
                Sign in
              </button>
            </form>

            {/* Google Divider & Auth */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-xs text-slate-400 font-medium absolute">
                or continue with
              </span>
            </div>

            <button
              onClick={() =>
                handleSubmit({
                  preventDefault: () => {}
                })
              }
              className="w-full bg-white hover:bg-slate-50 border border-slate-300 rounded-xl py-2.5 px-4 flex items-center justify-center gap-2.5 text-xs font-bold text-slate-700 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="text-center text-xs text-slate-500 pt-2">
              Don't have an account?{' '}
              <button
                onClick={() => setMode('signup')}
                className="font-bold text-[#008272] hover:text-[#006357]"
              >
                Create account
              </button>
            </div>
          </>
        ) : (
          /* Create Account Form */
          <>
            <div className="text-center space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Create your account
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                Join WRENCH and get started today.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">Full name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#008272] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#008272] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#008272] focus:outline-none"
                  />
                </div>
              </div>

              {/* Role Picker: Need help vs Find work */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-800">
                  I want to use WRENCH to:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserIntent('need_help')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      userIntent === 'need_help'
                        ? 'border-[#008272] bg-[#e6f7f5] ring-1 ring-[#008272]'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Home className="w-5 h-5 text-slate-800" />
                      <span
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          userIntent === 'need_help'
                            ? 'border-[#008272] bg-[#008272]'
                            : 'border-slate-300'
                        }`}
                      >
                        {userIntent === 'need_help' && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-900">Need help</div>
                    <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                      Post jobs and find trusted workers
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUserIntent('find_work')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      userIntent === 'find_work'
                        ? 'border-[#008272] bg-[#e6f7f5] ring-1 ring-[#008272]'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Briefcase className="w-5 h-5 text-slate-800" />
                      <span
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          userIntent === 'find_work'
                            ? 'border-[#008272] bg-[#008272]'
                            : 'border-slate-300'
                        }`}
                      >
                        {userIntent === 'find_work' && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-900">Find work</div>
                    <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                      Offer your skills and get jobs
                    </div>
                  </button>
                </div>
                <p className="text-[11px] text-center text-slate-400">
                  You can do both. You can change this later.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#008272] hover:bg-[#007163] text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm text-sm"
              >
                Create account
              </button>
            </form>

            <div className="text-center text-xs text-slate-500 pt-2">
              Already have an account?{' '}
              <button
                onClick={() => setMode('signin')}
                className="font-bold text-[#008272] hover:text-[#006357]"
              >
                Sign in
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
