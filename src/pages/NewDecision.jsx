import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';
import { useDecisions } from '../hooks/useDecisions.js';
import Layout from '../components/Layout.jsx';

const EXAMPLES = [
  'Should I leave my stable job to pursue a startup idea?',
  'Should I relocate for a better opportunity or stay near family?',
  'Should I go back to school for a masters degree at 30?',
  'Should I end a long-term relationship that feels stagnant?',
];

export default function NewDecision() {
  const navigate = useNavigate();
  const { createDecision } = useDecisions();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    setLoading(true);
    setError('');
    try {
      const d = await createDecision(title.trim(), description.trim());
      navigate(`/decision/${d.id}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <button onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to decisions
        </button>

        <h1 className="text-2xl font-bold text-slate-800 mb-2">Describe your decision</h1>
        <p className="text-slate-500 text-sm mb-8">The more context you share, the better Prism can help you think clearly.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">What decision are you facing?</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-prism-500/20 focus:border-prism-400 transition"
              placeholder="e.g., Should I leave my job to start a company?" />
            <div className="mt-3">
              <p className="text-xs text-slate-400 mb-2 flex items-center gap-1"><Lightbulb className="w-3 h-3" /> Examples:</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((ex, i) => (
                  <button key={i} type="button" onClick={() => setTitle(ex)}
                    className="text-xs px-3 py-1.5 rounded-full border border-slate-200 text-slate-500 hover:border-prism-300 hover:text-prism-600 transition-colors">
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tell me more about the context</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={5}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-prism-500/20 focus:border-prism-400 transition resize-none"
              placeholder="What makes this decision hard? What are you choosing between? What constraints do you face? (Age, finances, relationships, timeline, etc.)" />
          </div>

          {error && <div className="p-3 bg-rose-50 text-rose-600 text-sm rounded-lg border border-rose-200">{error}</div>}

          <button type="submit" disabled={loading || !title.trim() || !description.trim()}
            className="w-full py-3 bg-gradient-to-r from-prism-600 to-violet-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-prism-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {loading ? 'Creating...' : <><span>Start Exploring Lenses</span> <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
      </motion.div>
    </Layout>
  );
}
