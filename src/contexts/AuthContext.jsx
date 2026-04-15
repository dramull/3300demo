import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContextDef.js';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState(() => {
    try { return localStorage.getItem('prism_openrouter_key') || ''; }
    catch { return ''; }
  });

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      queueMicrotask(() => setLoading(false));
      return;
    }

    let subscription;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    subscription = data.subscription;

    return () => subscription?.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    if (!isSupabaseConfigured()) throw new Error('Supabase not configured');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email, password, displayName) => {
    if (!isSupabaseConfigured()) throw new Error('Supabase not configured');
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { display_name: displayName } },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    if (isDemo) { setIsDemo(false); setUser(null); return; }
    if (isSupabaseConfigured()) await supabase.auth.signOut();
    setUser(null);
  };

  const enterDemo = () => {
    setIsDemo(true);
    setUser({ id: 'demo', email: 'demo@prism.app', user_metadata: { display_name: 'Demo User' } });
  };

  const saveApiKey = (key) => {
    setApiKey(key);
    try { localStorage.setItem('prism_openrouter_key', key); } catch { /* noop */ }
  };

  const isAuthenticated = Boolean(user) || isDemo;

  return (
    <AuthContext.Provider value={{
      user, isDemo, loading, apiKey, isAuthenticated,
      signIn, signUp, signOut, enterDemo, saveApiKey,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
