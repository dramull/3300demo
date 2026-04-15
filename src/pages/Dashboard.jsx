import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';
import { useDecisions } from '../hooks/useDecisions.js';
import { useAuth } from '../hooks/useAuth.js';
import Layout from '../components/Layout.jsx';
import DecisionCard from '../components/DecisionCard.jsx';

export default function Dashboard() {
  const navigate = useNavigate();
  const { isDemo } = useAuth();
  const { decisions, loading } = useDecisions();

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Your Decisions</h1>
            <p className="text-slate-500 text-sm mt-1">
              {isDemo ? 'Explore a demo decision or create a new one' : 'Track and explore your major decisions'}
            </p>
          </div>
          <button onClick={() => navigate('/new')}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-prism-600 to-violet-500 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-prism-500/25 transition-all">
            <Plus className="w-4 h-4" /> New Decision
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-prism-200 border-t-prism-600 rounded-full animate-spin" />
          </div>
        ) : decisions.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-prism-50 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-prism-400" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800 mb-2">No decisions yet</h2>
            <p className="text-slate-500 text-sm mb-6">Start by describing a decision you&apos;re facing.</p>
            <button onClick={() => navigate('/new')}
              className="px-6 py-2.5 bg-prism-600 text-white rounded-xl font-medium hover:bg-prism-700 transition-colors">
              Create Your First Decision
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {decisions.map(d => (
              <DecisionCard key={d.id} decision={d} onClick={() => navigate(`/decision/${d.id}`)} />
            ))}
          </div>
        )}
      </motion.div>
    </Layout>
  );
}
