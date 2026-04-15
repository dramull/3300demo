import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';

function sanitize(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderMd(text) {
  return text.split('\n').map((line, i) => {
    const safe = sanitize(line);
    const html = safe
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
    return <p key={i} className={i > 0 ? 'mt-2' : ''} dangerouslySetInnerHTML={{ __html: html || '&nbsp;' }} />;
  });
}

export default function MessageBubble({ message, isLatest }) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={isLatest ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
        isUser ? 'bg-slate-200' : 'bg-gradient-to-br from-prism-400 to-violet-500'
      }`}>
        {isUser ? <User className="w-4 h-4 text-slate-600" /> : <Sparkles className="w-4 h-4 text-white" />}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
        isUser ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-700'
      }`}>
        <div className="text-sm leading-relaxed">{renderMd(message.content)}</div>
      </div>
    </motion.div>
  );
}
