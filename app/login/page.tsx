'use client';

import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabase';
import AcmeLogo from '../ui/acme-logo';
import Image from 'next/image';
export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        setError('Check your email to confirm your account');
        setIsLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex bg-white">
      <div className="flex w-full h-full">

        {/* LEFT */}
        <div className="hidden md:flex w-[380px] bg-blue-600 flex-col justify-between p-12 text-white relative">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] rounded-full border-[60px] border-white/20" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-white/20 blur-3xl" />
          </div>

          <div className="relative z-10">
            <AcmeLogo />
            <h1 className="text-4xl font-bold leading-tight mt-12 mb-4">
              Faith. <br /> Knowledge. <br /> Service.
            </h1>
            <p className="text-blue-100 text-lg max-w-sm">
              The trusted reliable platform for council system management and event coordination by AGS.
            </p>
          </div>

          <Image
            src="/laptop.png"
            width={3000}
            height={3000}
            className="hidden md:block rounded-lg"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <div className="relative z-10 text-sm text-blue-200 flex items-center gap-1">
            Made by SMAK Penabur Gading Serpong Student Council
            <ArrowRightIcon className="w-4 h-4" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">

            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isSignUp ? 'Create account.' : 'Start working.'}
              </h2>
              <p className="text-gray-500">
                {isSignUp
                  ? 'Enter your email and password to create an account.'
                  : 'Sign in using credentials approved by the admin. We discourage non-AGS members to sign in or create an account.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg border text-sm bg-red-50 border-red-100 text-red-600">
                  {error}
                </div>
              )}

              {/* EMAIL LOGIN */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
              >
                {isLoading ? 'Processing...' : isSignUp ? 'Create account' : 'Sign in'}
              </button>

              {/* DIVIDER */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-gray-400">or</span>
                </div>
              </div>

              {/* GOOGLE LOGIN */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-70"
              >
                {/* INLINE GOOGLE SVG — NEVER FAILS */}
                <svg viewBox="0 0 48 48" className="w-5 h-5">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.1 1.53 7.5 2.8l5.5-5.5C33.64 3.7 29.22 1.5 24 1.5 14.94 1.5 7.26 6.9 3.9 14.7l6.4 5C11.8 14.7 16 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-2.7-.3-3.9H24v7.4h12.8c-.6 3.1-2.6 5.7-5.6 7.4l7.4 5.7c4.4-4.1 6.5-10.1 6.5-16.6z"/>
                  <path fill="#FBBC05" d="M10.3 28.2c-.4-1.2-.7-2.5-.7-3.7s.3-2.5.7-3.7l-6.4-5c-1.3 2.6-2 5.6-2 8.7s.7 6.1 2 8.7l6.4-5z"/>
                  <path fill="#34A853" d="M24 46.5c6.2 0 11.4-2 15.2-5.4l-7.4-5.7c-2 1.4-4.6 2.2-7.8 2.2-6 0-11.1-4-12.9-9.5l-6.4 5C7.3 41.1 14.9 46.5 24 46.5z"/>
                </svg>
                Sign in with Google
              </button>
            </form>

            <div className="mt-8 text-sm text-center text-gray-500">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 font-medium hover:underline"
              >
                {isSignUp ? 'Sign in' : 'Create account'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}