import { useState, useCallback } from 'react';
import { useAuth } from './useAuth.js';
import { getLensResponse } from '../lib/ai.js';
import { LENSES } from '../lib/lenses.js';

export function useLens(decision, lensId) {
  const { isDemo, apiKey } = useAuth();
  const lens = LENSES.find(l => l.id === lensId);

  const [messages, setMessages] = useState(() =>
    lens ? [{ role: 'assistant', content: lens.starterMessage }] : []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (content) => {
    if (!lens || !decision) return;
    setError(null);

    const userMsg = { role: 'user', content };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setIsLoading(true);

    try {
      const response = await getLensResponse(lensId, updated, decision, { isDemo, apiKey });
      setMessages([...updated, { role: 'assistant', content: response }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [messages, lens, decision, lensId, isDemo, apiKey]);

  return { messages, isLoading, error, sendMessage, lens };
}
