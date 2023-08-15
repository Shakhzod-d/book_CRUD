import { useState } from "react";

interface ApiResponse {
  // Define your API response structure here
}

export function useFetchDelete(
  url: string
): [(id: number) => void, boolean, string | null] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function deleteItem(id: number) {
    try {
      setLoading(true);
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Optional: You can handle the API response here if needed
      // const responseData: ApiResponse = await response.json();

      setLoading(false);
      setError(null);
    } catch (error: any) {
      setError(error.message || "An error occurred");
      setLoading(false);
    }
  }

  return [deleteItem, loading, error];
}
