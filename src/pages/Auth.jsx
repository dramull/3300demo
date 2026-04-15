import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TriangleIcon as PrismIcon, Mail, Lock, User, Zap, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';
import { isSupabaseConfigured } from '../config/supabase.js';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signIn, signUp, enterDemo, isAuthenticated } = useAuth();

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const supabaseReady = isSupabaseConfigured();

  const handleDemo = useCallback(() => {
    enterDemo();
    navigate('/dashboard', { replace: true });
  }, [enterDemo, navigate]);

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (searchParams.get('demo') === 'true') handleDemo();
  }, [searchParams, handleDemo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        await signUp(email, password, name);
        setError('Check your email to confirm your account!');
      } else {
        await signIn(email, password);
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-prism-500 to-violet-500 flex items-center justify-center">
              <PrismIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">Prism</span>
          </div>
          <p className="text-slate-500">See any decision from every angle</p>
        </div>

        <button onClick={handleDemo}
          className="w-full mb-6 px-6 py-3.5 bg-gradient-to-r from-prism-600 to-violet-500 text-white rounded-xl font-semibold text-base hover:shadow-lg hover:shadow-prism-500/25 transition-all duration-200 flex items-center justify-center gap-2">
          <Zap className="w-5 h-5" /> Try Full Demo — No Account Needed
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
          <div className="relative flex justify-center text-sm"><span className="bg-slate-50 px-4 text-slate-400">or sign in with your account</span></div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          {!supabaseReady && (
            <div className="mb-4 p-3 bg-warm-50 border border-warm-200 rounded-lg flex items-start gap-2 text-sm text-warm-600">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Supabase not configured. Use demo mode, or set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.</span>
            </div>
          )}
          <div className="flex rounded-lg bg-slate-100 p-1 mb-6">
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  mode === m ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}>
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" value={name} onChange={e => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-prism-500/20 focus:border-prism-400 transition"
                    placeholder="Your name" />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={!supabaseReady}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-prism-500/20 focus:border-prism-400 transition disabled:opacity-50"
                  placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required disabled={!supabaseReady}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-prism-500/20 focus:border-prism-400 transition disabled:opacity-50"
                  placeholder="••••••••" minLength={6} />
              </div>
            </div>
            {error && (
              <div className={`p-3 rounded-lg text-sm flex items-start gap-2 ${
                error.includes('Check your email') ? 'bg-sage-50 text-sage-600 border border-sage-200' : 'bg-rose-50 text-rose-600 border border-rose-200'
              }`}><AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />{error}</div>
            )}
            <button type="submit" disabled={!supabaseReady || loading}
              className="w-full py-2.5 bg-slate-800 text-white rounded-lg font-medium text-sm hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
