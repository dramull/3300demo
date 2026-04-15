const OPENROUTER_BASE = 'https://openrouter.ai/api/v1';

export async function chatCompletion(messages, { apiKey, model = 'google/gemini-2.0-flash-001', temperature = 0.7 } = {}) {
  const key = apiKey || import.meta.env.VITE_OPENROUTER_API_KEY || '';
  if (!key) throw new Error('No OpenRouter API key configured. Add one in Settings.');

  const res = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': globalThis.location?.origin || 'https://prism.app',
      'X-Title': 'Prism Decision Engine',
    },
    body: JSON.stringify({ model, messages, temperature, max_tokens: 1500 }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `OpenRouter error: ${res.status}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}
