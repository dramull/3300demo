import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase.js';
import { useAuth } from './useAuth.js';
import { DEMO_DECISIONS } from '../lib/demo-data.js';

export function useDecisions() {
  const { user, isDemo } = useAuth();
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (isDemo) {
        if (!cancelled) { setDecisions(DEMO_DECISIONS); setLoading(false); }
        return;
      }
      if (!supabase || !user) { if (!cancelled) setLoading(false); return; }

      const { data, error } = await supabase
        .from('decisions')
        .select('*')
        .order('created_at', { ascending: false });

      if (!cancelled) {
        if (!error) setDecisions(data || []);
        setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [user, isDemo]);

  const createDecision = async (title, description) => {
    if (isDemo) {
      const d = { id: `demo-${Date.now()}`, title, description, status: 'in_progress', created_at: new Date().toISOString() };
      setDecisions(prev => [d, ...prev]);
      return d;
    }
    const { data, error } = await supabase
      .from('decisions')
      .insert({ user_id: user.id, title, description })
      .select().single();
    if (error) throw error;
    setDecisions(prev => [data, ...prev]);
    return data;
  };

  const updateDecision = async (id, updates) => {
    if (isDemo) { setDecisions(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d)); return; }
    const { error } = await supabase.from('decisions').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id);
    if (error) throw error;
    setDecisions(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  return { decisions, loading, createDecision, updateDecision };
}
