import React, { useState, useEffect } from "react";

import { mockApiRequest } from "../../utils";
import { products } from "../../constants";

export interface IRenderProps<D = any> {
  data: D | null;
  loading: boolean;
  error: null | string;
}

interface IProps<D = unknown> {
  children: ({ data, loading, error }: IRenderProps<D>) => React.ReactNode;
}

const DataProvider = ({ children }: IProps): JSX.Element => {
  const [state, setState] = useState<IRenderProps>({
    data: null,
    loading: false,
    error: null,
  });
  const [isToFetch, setIsToFetch] = useState<boolean>(false);
  const [fetchingError, setFetchingError] = useState<string | null>(null);

  const handleStartFetch = (errorMessage?: string) => {
    setIsToFetch(true);
    errorMessage && setFetchingError(errorMessage);
  };

  const handleReset = () => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  };

  useEffect(() => {
    if (!isToFetch) return;
    let isMounted = true;

    const fetchData = async () => {
      setState((current) => ({ ...current, loading: true, error: null }));
      try {
        const data = await mockApiRequest(products, fetchingError);
        setState({ data, loading: false, error: null });
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : ((err as any).toString() as string);
        setState({ data: null, loading: false, error: message });
      } finally {
        setFetchingError(null);
        setIsToFetch(false);
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [isToFetch, fetchingError]);

  return (
    <div className="min-h-[200px] border-t-2 border-gray-600">
      <div className="flex gap-4 my-4">
        <button
          onClick={() => handleStartFetch()}
          className="px-4 py-2 bg-green-500 text-white"
        >
          fetch data with success
        </button>
        <button
          onClick={() => handleStartFetch("Fetching error message")}
          className="px-4 py-2 bg-red-600 text-white"
        >
          fetch data with error
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-600 text-white"
        >
          reset
        </button>
      </div>
      <div>{children(state)}</div>
    </div>
  );
};

export default DataProvider;
