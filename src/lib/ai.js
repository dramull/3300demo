import { chatCompletion } from '../config/openrouter.js';
import { LENSES, SYNTHESIS_PROMPT } from './lenses.js';
import { getDemoLensResponse, getDemoSynthesis } from './demo-data.js';

export async function getLensResponse(lensId, messages, decision, { isDemo, apiKey } = {}) {
  if (isDemo) {
    await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));
    return getDemoLensResponse(lensId, messages.length);
  }

  const lens = LENSES.find(l => l.id === lensId);
  if (!lens) throw new Error(`Unknown lens: ${lensId}`);

  const systemMessage = {
    role: 'system',
    content: `${lens.systemPrompt}\n\nThe decision being explored: "${decision.title}" — ${decision.description}`,
  };

  return chatCompletion([systemMessage, ...messages], { apiKey });
}

export async function synthesizeReport(decision, lensConversations, { isDemo, apiKey } = {}) {
  if (isDemo) {
    await new Promise(r => setTimeout(r, 1500));
    return getDemoSynthesis();
  }

  const summaries = lensConversations.map(({ lensId, messages }) => {
    const lens = LENSES.find(l => l.id === lensId);
    const conversation = messages
      .filter(m => m.role !== 'system')
      .map(m => `${m.role === 'user' ? 'Person' : 'Coach'}: ${m.content}`)
      .join('\n');
    return `## ${lens.name} Lens\n${conversation}`;
  }).join('\n\n---\n\n');

  const systemMessage = { role: 'system', content: SYNTHESIS_PROMPT };
  const userMessage = {
    role: 'user',
    content: `Decision: "${decision.title}" — ${decision.description}\n\n${summaries}\n\nPlease synthesize these explorations into a Clarity Report.`,
  };

  return chatCompletion([systemMessage, userMessage], { apiKey, temperature: 0.5 });
}
