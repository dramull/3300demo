import * as Icons from 'lucide-react';

const colorMap = {
  prism:  { bg: 'bg-prism-50',  border: 'border-prism-200',  text: 'text-prism-600',  iconBg: 'bg-prism-100' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600', iconBg: 'bg-violet-100' },
  rose:   { bg: 'bg-rose-50',   border: 'border-rose-200',   text: 'text-rose-600',   iconBg: 'bg-rose-100' },
  sage:   { bg: 'bg-sage-50',   border: 'border-sage-200',   text: 'text-sage-600',   iconBg: 'bg-sage-100' },
  warm:   { bg: 'bg-warm-50',   border: 'border-warm-200',   text: 'text-warm-600',   iconBg: 'bg-warm-100' },
};

export default function LensCard({ lens, onClick, isActive, isCompleted, messageCount }) {
  const Icon = Icons[lens.icon] || Icons.Circle;
  const colors = colorMap[lens.color] || colorMap.prism;

  return (
    <button onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
        isActive
          ? `${colors.bg} ${colors.border} shadow-md scale-[1.02]`
          : isCompleted
          ? 'bg-white border-slate-200 opacity-80'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center shrink-0`}>
          <Icon className={`w-5 h-5 ${colors.text}`} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-800 text-sm">{lens.name}</h3>
            {isCompleted && <Icons.CheckCircle2 className="w-4 h-4 text-sage-500 shrink-0" />}
            {messageCount > 1 && !isCompleted && (
              <span className="text-xs text-slate-400">{Math.floor((messageCount - 1) / 2)} exchanges</span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{lens.description}</p>
          <p className="text-xs text-slate-400 mt-1 italic">{lens.science}</p>
        </div>
      </div>
    </button>
  );
}
