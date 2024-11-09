export function rateLimit({
  interval = 60 * 1000, // 1 minute
  uniqueTokenPerInterval = 500,
} = {}) {
  const tokens = new Map();
  
  return {
    check: async (limit: number, token: string) => {
      const now = Date.now();
      const windowStart = now - interval;
      
      const tokenCount = tokens.get(token) || [0];
      const [tokenTimestamp, count] = tokenCount;
      
      if (tokenTimestamp < windowStart) {
        tokens.set(token, [now, 1]);
        return Promise.resolve();
      }
      
      if (count > limit) {
        return Promise.reject(new Error('Rate limit exceeded'));
      }
      
      tokens.set(token, [tokenTimestamp, count + 1]);
      return Promise.resolve();
    },
  };
} 