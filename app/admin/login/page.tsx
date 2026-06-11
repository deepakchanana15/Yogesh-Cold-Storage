'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword]   = useState('');
  const [show, setShow]           = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Login failed.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mx-auto mb-4 shadow-green-md">
            <Leaf size={26} className="text-white" />
          </div>
          <h1 className="text-xl font-display font-bold text-green-950">Yogesh Cold Storage</h1>
          <p className="text-steel-500 text-sm mt-1">Admin Dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-green-200 shadow-green-md p-8">
          <h2 className="text-lg font-bold text-green-900 mb-6 text-center">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label" htmlFor="password">
                Admin Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-400" />
                <input
                  id="password"
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  autoFocus
                  className="form-input pl-9 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-400 hover:text-steel-600"
                  tabIndex={-1}
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
                <AlertCircle size={15} className="shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all shadow-green-sm"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-steel-400 text-xs mt-6">
          Yogesh Cold Storage · Admin Portal · Gannaur, Haryana
        </p>
      </div>
    </div>
  );
}
