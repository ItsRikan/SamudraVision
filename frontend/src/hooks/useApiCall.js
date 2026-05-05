import { useState, useCallback } from 'react';

export const useApiCall = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        const errorMessage =
          err.response?.data?.detail || err.message || 'An unexpected error occurred';
        setError(errorMessage);
        
        // Auto-clear error after 5 seconds
        setTimeout(() => {
          setError(null);
        }, 5000);
        
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return { data, loading, error, execute };
};
