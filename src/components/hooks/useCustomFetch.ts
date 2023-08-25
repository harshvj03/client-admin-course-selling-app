import axios from "axios";
import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null | unknown;
}

const useCustomFetch = <T>(url: string): FetchState<T> => {
  const [fetchState, setFetchState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }

        const data = response.data;
        setFetchState({ data, loading: false, error: null });
      } catch (error) {
        setFetchState({ data: null, loading: false, error });
      }
    };

    fetchData();
  }, [url]);

  return fetchState;
};

export default useCustomFetch;
