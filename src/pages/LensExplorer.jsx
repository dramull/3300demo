import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, FileText, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';
import { useDecisions } from '../hooks/useDecisions.js';
import { useLens } from '../hooks/useLens.js';
import { synthesizeReport } from '../lib/ai.js';
import { LENSES } from '../lib/lenses.js';
import Layout from '../components/Layout.jsx';
import LensCard from '../components/LensCard.jsx';
import MessageBubble from '../components/MessageBubble.jsx';

export default function LensExplorer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDemo, apiKey } = useAuth();
  const { decisions } = useDecisions();
  const decision = decisions.find(d => d.id === id);

  const [activeLensIdx, setActiveLensIdx] = useState(0);
  const [completedLenses, setCompletedLenses] = useState({});
  const [allConversations, setAllConversations] = useState({});
  const [synthLoading, setSynthLoading] = useState(false);
  const [synthError, setSynthError] = useState(null);
  const [input, setInput] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const chatEndRef = useRef(null);

  const activeLens = LENSES[activeLensIdx];
  const { messages, isLoading, error, sendMessage } = useLens(decision, activeLens?.id);

  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Track conversations for synthesis
  useEffect(() => {
    if (activeLens && messages.length > 0) {
      setAllConversations(prev => ({ ...prev, [activeLens.id]: messages }));
    }
  }, [messages, activeLens]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;
    const msg = input.trim();
    setInput('');
    await sendMessage(msg);
  }, [input, isLoading, sendMessage]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const markComplete = () => {
    setCompletedLenses(prev => ({ ...prev, [activeLens.id]: true }));
    // Auto-advance to next incomplete lens
    const nextIdx = LENSES.findIndex((l, i) => i > activeLensIdx && !completedLenses[l.id]);
    if (nextIdx >= 0) setActiveLensIdx(nextIdx);
  };

  const handleSynthesize = async () => {
    const convos = Object.entries(allConversations)
      .filter(([lid]) => completedLenses[lid])
      .map(([lensId, msgs]) => ({ lensId, messages: msgs }));
    if (convos.length < 2) { setSynthError('Complete at least 2 lenses before generating a report.'); return; }

    setSynthLoading(true);
    setSynthError(null);
    try {
      const report = await synthesizeReport(decision, convos, { isDemo, apiKey });
      sessionStorage.setItem(`prism_report_${id}`, report);
      navigate(`/report/${id}`);
    } catch (err) {
      setSynthError(err.message);
    } finally {
      setSynthLoading(false);
    }
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

  const completedCount = Object.keys(completedLenses).length;

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => navigate('/dashboard')} className="text-slate-400 hover:text-slate-600">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-slate-800 truncate">{decision.title}</h1>
              <p className="text-xs text-slate-500">{completedCount}/5 lenses completed</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
              {showSidebar ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            <button onClick={handleSynthesize} disabled={completedCount < 2 || synthLoading}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-prism-600 to-violet-500 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {synthLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              <span className="hidden sm:inline">Generate Report</span>
            </button>
          </div>
        </div>

        {synthError && (
          <div className="mb-3 p-3 bg-rose-50 text-rose-600 text-sm rounded-lg border border-rose-200 flex items-start gap-2 shrink-0">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />{synthError}
          </div>
        )}

        <div className="flex gap-4 flex-1 min-h-0">
          {/* Sidebar */}
          <AnimatePresence>
            {showSidebar && (
              <motion.div
                initial={{ width: 0, opacity: 0 }} animate={{ width: 300, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                className="shrink-0 overflow-y-auto space-y-2 pr-2"
              >
                {LENSES.map((lens, i) => (
                  <LensCard key={lens.id} lens={lens}
                    isActive={i === activeLensIdx}
                    isCompleted={Boolean(completedLenses[lens.id])}
                    messageCount={allConversations[lens.id]?.length || 0}
                    onClick={() => setActiveLensIdx(i)} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
            {/* Lens Header */}
            <div className="px-4 py-3 border-b border-slate-200 bg-white shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-slate-800 text-sm">{activeLens?.name}</h2>
                  <p className="text-xs text-slate-400">{activeLens?.science}</p>
                </div>
                {messages.length >= 5 && !completedLenses[activeLens?.id] && (
                  <button onClick={markComplete}
                    className="text-xs px-3 py-1.5 bg-sage-50 text-sage-600 rounded-full font-medium hover:bg-sage-100 transition-colors">
                    Mark Complete ✓
                  </button>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} isLatest={i === messages.length - 1} />
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-prism-400 to-violet-500 flex items-center justify-center shrink-0">
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  </div>
                  <div className="bg-white rounded-2xl px-4 py-3 border border-slate-200">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="p-3 bg-rose-50 text-rose-600 text-sm rounded-lg border border-rose-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />{error}
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-slate-200 bg-white shrink-0">
              <div className="flex gap-2">
                <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                  rows={1} placeholder="Share your thoughts..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-prism-500/20 focus:border-prism-400 transition resize-none"
                  disabled={isLoading} />
                <button onClick={handleSend} disabled={isLoading || !input.trim()}
                  className="px-4 py-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
