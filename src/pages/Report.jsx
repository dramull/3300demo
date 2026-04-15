import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, RotateCcw, Sparkles, Loader2 } from 'lucide-react';
import { useDecisions } from '../hooks/useDecisions.js';
import { useAuth } from '../hooks/useAuth.js';
import { getDemoSynthesis } from '../lib/demo-data.js';
import Layout from '../components/Layout.jsx';

function sanitize(t) {
  return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderReportMd(text) {
  const lines = text.split('\n');
  const els = [];
  let k = 0;
  for (const line of lines) {
    if (line.startsWith('## ')) {
      els.push(<h2 key={k++} className="text-xl font-bold text-slate-800 mt-8 mb-3 first:mt-0">{line.replace('## ', '')}</h2>);
    } else if (line.startsWith('- **')) {
      const m = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
      if (m) {
        els.push(
          <div key={k++} className="flex items-start gap-2 mb-2 ml-2">
            <span className="w-1.5 h-1.5 rounded-full bg-prism-400 mt-2 shrink-0" />
            <p className="text-slate-700 text-sm leading-relaxed"><strong className="text-slate-800">{m[1]}:</strong> {m[2]}</p>
          </div>
        );
      }
    } else if (line.startsWith('- ')) {
      els.push(
        <div key={k++} className="flex items-start gap-2 mb-2 ml-2">
          <span className="w-1.5 h-1.5 rounded-full bg-prism-400 mt-2 shrink-0" />
          <p className="text-slate-700 text-sm leading-relaxed">{line.replace('- ', '')}</p>
        </div>
      );
    } else if (line.trim() === '') {
      els.push(<div key={k++} className="h-2" />);
    } else {
      const safe = sanitize(line);
      const html = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
      els.push(<p key={k++} className="text-slate-700 text-sm leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: html }} />);
    }
  }
  return els;
}

export default function Report() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDemo } = useAuth();
  const { decisions, updateDecision } = useDecisions();

  // Initialize report from sessionStorage or demo data (synchronous, no effect needed)
  const [report] = useState(() => {
    const stored = sessionStorage.getItem(`prism_report_${id}`);
    if (stored) return stored;
    if (isDemo) return getDemoSynthesis();
    return '';
  });
  const [loading] = useState(false);
  const decision = decisions.find(d => d.id === id);

  useEffect(() => {
    if (decision && decision.status !== 'completed') {
      updateDecision(id, { status: 'completed' }).catch(() => {});
    }
  }, [decision, id, updateDecision]);

  const handleDownload = () => {
    const blob = new Blob([`# Clarity Report: ${decision?.title || 'Decision'}\n\n${report}`], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prism-clarity-report-${id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!decision) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-slate-500">Decision not found.</p>
          <button onClick={() => navigate('/dashboard')} className="mt-4 text-prism-600 hover:underline">Return to dashboard</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => navigate(`/decision/${id}`)}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to lenses
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-prism-500 to-violet-500 mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Your Clarity Report</h1>
            <p className="text-slate-500">{decision.title}</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-prism-400 animate-spin" />
            </div>
          ) : report ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              {renderReportMd(report)}
            </motion.div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 mb-4">No report generated yet.</p>
              <button onClick={() => navigate(`/decision/${id}`)}
                className="px-6 py-2.5 bg-prism-600 text-white rounded-lg font-medium hover:bg-prism-700 transition-colors">
                Explore Lenses First
              </button>
            </div>
          )}

          {report && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <button onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-prism-300 transition-colors">
                <Download className="w-4 h-4" /> Download Report
              </button>
              <button onClick={() => navigate(`/decision/${id}`)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-prism-300 transition-colors">
                <RotateCcw className="w-4 h-4" /> Explore More Lenses
              </button>
            </motion.div>
          )}

          <div className="mt-8 p-4 bg-slate-100 rounded-xl text-xs text-slate-500 text-center">
            This report synthesizes your own thinking, guided by AI. It is not professional advice.
            For major life decisions, also consult trusted advisors, mentors, or professionals.
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
