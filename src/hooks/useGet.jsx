import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export function useGet(endpoint, options = {}) {
  const { skip = false } = options; // future-safe (optional)

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!endpoint || skip) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setData(response.data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }, [endpoint, skip]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}