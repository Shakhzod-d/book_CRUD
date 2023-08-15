import { useState, useEffect } from "react";

interface ICatchError {
  message?: string;
  data?: [];
  ok?: boolean;
}

export function useFetchGet<T>(
  url: string
): [T | null, boolean, string | null] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData: T = await response.json();
        setData(responseData);
      } catch (error: any | null) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return [data, loading, error];
}
