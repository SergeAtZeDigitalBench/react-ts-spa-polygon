import React, { useState, useEffect } from "react";

import { mockApiRequest } from "../../utils";
import { products } from "../../constants";

interface State<D = any> {
  data: D | null;
  loading: boolean;
  error: null | string;
}

export interface IHocInjectedProps {
  data: typeof products | null;
  loading: boolean;
  error: null | string;
  handleStartFetch: (errorMessage?: string) => void;
  handleReset: () => void;
}

const withData = <P extends {}>(
  Component: React.ComponentType<P & IHocInjectedProps>
): React.ComponentType<P> => {
  return (props: P) => {
    const [state, setState] = useState<State<typeof products>>({
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
          const data = (await mockApiRequest(products, fetchingError)) as any;
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
      <Component
        {...props}
        data={state.data}
        loading={state.loading}
        error={state.error}
        handleReset={handleReset}
        handleStartFetch={handleStartFetch}
      />
    );
  };
};

export default withData;
