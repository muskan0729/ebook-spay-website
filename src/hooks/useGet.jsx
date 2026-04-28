import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export function useGet(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!!endpoint);
  const [error, setError] = useState(null);

  const mountedRef = useRef(true);
  const fetchedRef = useRef(false);

  const fetchData = useCallback(async () => {
    if (!endpoint) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (mountedRef.current) {
        setData(response.data);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong"
        );
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [endpoint]);

  useEffect(() => {
    mountedRef.current = true;

    if (!endpoint || fetchedRef.current) return;

    fetchedRef.current = true;
    fetchData();

    return () => {
      mountedRef.current = false;
    };
  }, [fetchData, endpoint]);

  return { data, loading, error, refetch: fetchData };
}