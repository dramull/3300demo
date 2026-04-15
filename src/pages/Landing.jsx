import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TriangleIcon as PrismIcon, Zap, Compass, Hourglass, Shield, Users, RotateCcw, ArrowRight, Sparkles, Brain, FileText } from 'lucide-react';

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const lensPreview = [
  { icon: Compass, name: 'Values', desc: 'What truly matters to you', color: 'text-indigo-500' },
  { icon: Hourglass, name: 'Future Self', desc: 'What your future self would say', color: 'text-violet-500' },
  { icon: Shield, name: 'Fear', desc: 'Protection vs. paralysis', color: 'text-rose-500' },
  { icon: Users, name: 'Ripple', desc: 'Who else is affected', color: 'text-emerald-500' },
  { icon: RotateCcw, name: 'Regret', desc: 'The path of least regret', color: 'text-amber-500' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-prism-50 via-violet-50 to-white" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
          <motion.div {...fade}>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-prism-500 to-violet-500 flex items-center justify-center shadow-lg shadow-prism-500/25">
                <PrismIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-slate-800">Prism</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
              See any decision<br />
              <span className="bg-gradient-to-r from-prism-600 to-violet-500 bg-clip-text text-transparent">
                from every angle
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
              Stop overthinking. Start seeing clearly. Prism guides you through research-backed thinking frameworks
              so you can make hard decisions with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth?demo=true"
                className="px-8 py-3.5 bg-gradient-to-r from-prism-600 to-violet-500 text-white rounded-xl font-semibold text-base hover:shadow-lg hover:shadow-prism-500/25 transition-all flex items-center gap-2 no-underline">
                <Zap className="w-5 h-5" /> Try the Demo — Free, No Login
              </Link>
              <Link to="/auth"
                className="px-8 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold text-base hover:border-prism-300 transition-all flex items-center gap-2 no-underline">
                Sign In <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div {...fade} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Three steps to clarity</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Based on decision science research used by therapists, executives, and leaders.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: 'Describe your decision', desc: 'Share the context. What are you choosing between? What makes it hard?' },
              { icon: Sparkles, title: 'Explore 5 lenses', desc: 'Each lens is a guided AI conversation using a different decision science framework.' },
              { icon: FileText, title: 'Get your Clarity Report', desc: 'Prism synthesizes insights across all lenses into patterns, blindspots, and a clarity statement.' },
            ].map((step, i) => (
              <motion.div key={i} {...fade} transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-prism-100 to-violet-100 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7 text-prism-600" />
                </div>
                <div className="text-sm font-bold text-prism-600 mb-2">Step {i + 1}</div>
                <h3 className="font-semibold text-slate-800 text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lenses */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div {...fade} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Five research-backed lenses</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Each lens uses a real decision science framework — not generic advice.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {lensPreview.map((item, i) => (
              <motion.div key={i} {...fade} transition={{ delay: i * 0.08 }}
                className="text-center p-4 rounded-xl bg-white border border-slate-200 hover:border-prism-200 hover:shadow-sm transition-all">
                <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
                <h3 className="font-semibold text-slate-800 text-sm mb-1">{item.name}</h3>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div {...fade}>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to think clearly?</h2>
            <p className="text-slate-500 mb-8">Try the full demo with a pre-built decision. No account needed.</p>
            <Link to="/auth?demo=true"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-prism-600 to-violet-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-prism-500/25 transition-all no-underline">
              <Zap className="w-5 h-5" /> Try Prism Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <PrismIcon className="w-4 h-4" /> Prism — A CS 3300 Demo
          </div>
          <p>AI-assisted decision clarity. Not professional advice.</p>
        </div>
      </footer>
    </div>
  );
}
