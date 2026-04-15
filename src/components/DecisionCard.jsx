import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export default function DecisionCard({ decision, onClick }) {
  const done = decision.status === 'completed';
  const date = new Date(decision.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <button onClick={onClick}
      className="w-full text-left bg-white rounded-xl border border-slate-200 p-5 hover:border-prism-300 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            {done ? <CheckCircle2 className="w-4 h-4 text-sage-500 shrink-0" /> : <Clock className="w-4 h-4 text-warm-500 shrink-0" />}
            <span className={`text-xs font-medium ${done ? 'text-sage-500' : 'text-warm-500'}`}>
              {done ? 'Clarity Achieved' : 'In Progress'}
            </span>
            <span className="text-xs text-slate-400">· {date}</span>
          </div>
          <h3 className="font-semibold text-slate-800 group-hover:text-prism-700 transition-colors line-clamp-2">
            {decision.title}
          </h3>
          <p className="text-sm text-slate-500 mt-1 line-clamp-2">{decision.description}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-prism-500 transition-colors shrink-0 mt-1" />
      </div>
    </button>
  );
}
