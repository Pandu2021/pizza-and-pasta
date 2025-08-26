import { useState, useEffect } from 'react';

/**
 * useProfileData
 * - Fetches profile and order history from backend endpoint '/api/profile'
 * - Returns { data, loading, error, refresh }
 * - The backend should return JSON like: { profile: { name, email, address }, orders: [...] }
 */
export default function useProfileData(baseUrl = '') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`${baseUrl}/api/profile`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
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
