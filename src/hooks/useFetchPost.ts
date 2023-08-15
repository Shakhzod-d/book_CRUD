import { useState } from "react";

interface ApiResponse {
  // Define your API response structure here
}

export function useFetchPost<T>(
  url: string
): [(data: T) => void, boolean, string | null] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function postData(data: T) {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      // Optional: You can handle the API response here if needed
      // const responseData: ApiResponse = await response.json();

      setLoading(false);
      setError(null);
      return responseData;
    } catch (error: any) {
      setError(error.message || "An error occurred");
      setLoading(false);
    }
  }

  return [postData, loading, error];
}
