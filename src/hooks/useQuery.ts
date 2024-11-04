import { AxiosAdapter } from '@/lib/axios.adapter';
import { useEffect, useState } from 'react';

type Data<T> = T | null;
type ErrorType = string | null;

interface Params<T> {
  data: Data<T>;
  loading: boolean;
  error: ErrorType;
}

export const useQuery = <T>(
  url: string,
  method: string,
  body?: any,
  trigger?: boolean
): Params<T> => {
  const [data, setData] = useState<Data<T>>(null);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<ErrorType>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (trigger === false) return;

    const controller = new AbortController();
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await AxiosAdapter.genericRequest(url, method, body);
        // console.log(response);
        const jsonData: T = response;
        setData(jsonData);
        setError(null);
      } catch (err: any) {
        const errorMessage: string =
          err.response?.data?.message || 'Error desconocido';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, method, body]);

  return { data, loading, error };
};
