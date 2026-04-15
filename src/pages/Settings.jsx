import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Eye, EyeOff, CheckCircle2, ShieldCheck, Info } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';
import Layout from '../components/Layout.jsx';

export default function Settings() {
  const { apiKey, saveApiKey, isDemo } = useAuth();
  const [key, setKey] = useState(apiKey);
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveApiKey(key);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Settings</h1>
        <p className="text-slate-500 text-sm mb-8">Configure your Prism experience.</p>

        {/* API Key */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-prism-50 flex items-center justify-center">
              <Key className="w-5 h-5 text-prism-600" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800">OpenRouter API Key</h2>
              <p className="text-xs text-slate-500">Required for AI-powered lens conversations</p>
            </div>
          </div>

          {isDemo && (
            <div className="mb-4 p-3 bg-prism-50 border border-prism-200 rounded-lg text-sm text-prism-700 flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Demo mode uses pre-written responses. Add an API key to get personalized AI conversations.</span>
            </div>
          )}

          <div className="space-y-3">
            <div className="relative">
              <input type={show ? 'text' : 'password'} value={key} onChange={e => setKey(e.target.value)}
                className="w-full px-4 py-2.5 pr-20 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-prism-500/20 focus:border-prism-400 transition"
                placeholder="sk-or-..." />
              <button onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleSave}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors">
                Save Key
              </button>
              {saved && (
                <span className="text-sm text-sage-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Saved
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Get a key at <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer"
              className="text-prism-500 hover:underline">openrouter.ai/keys</a>. Free tier available.
            </p>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-sage-50 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-sage-600" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800">Privacy &amp; Security</h2>
              <p className="text-xs text-slate-500">How Prism handles your data</p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-slate-600">
            <p>• Your API key is stored only in your browser&apos;s localStorage — it never passes through our servers.</p>
            <p>• Decision data is stored in Supabase with Row Level Security — only you can see your data.</p>
            <p>• In demo mode, no data leaves your browser — everything is simulated locally.</p>
            <p>• When using AI, your decision context is sent to OpenRouter. Review their <a href="https://openrouter.ai/privacy" target="_blank" rel="noopener noreferrer" className="text-prism-500 hover:underline">privacy policy</a>.</p>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
