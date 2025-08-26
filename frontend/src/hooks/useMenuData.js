import { useState, useEffect } from 'react';

/**
 * useMenuData
 * - Fetches menu data from backend endpoint '/api/menu'
 * - Returns { data, loading, error, refresh }
 * - Expected backend shape: { pizzas: [...], pastas: [...], appetizers: [...], desserts: [...] }
 */
export default function useMenuData(baseUrl = '') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/menu`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, refresh: fetchData };
}
