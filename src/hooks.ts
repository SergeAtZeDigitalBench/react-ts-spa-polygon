import {
  useSyncExternalStore,
  createContext,
  useContext,
  useRef,
  useCallback,
} from "react";

type VoidFn = () => void;

type StoreData<Store> = {
  get: () => Store;
  set: (value: Partial<Store>) => void;
  subscribe: (calllback: VoidFn) => VoidFn;
};

export const createFastContext = <Store>(initialState: Store) => {
  const useStoreData = (): StoreData<Store> => {
    const storeRef = useRef<Store>(initialState);
    const subscribersRef = useRef(new Set<VoidFn>());

    const get = useCallback(() => storeRef.current, []);

    const set = useCallback((value: Partial<Store>) => {
      const newStore = { ...storeRef.current, ...value };
      storeRef.current = newStore;
      subscribersRef.current.forEach((fn) => fn());
    }, []);

    const subscribe = useCallback((callback: VoidFn) => {
      subscribersRef.current.add(callback);

      return () => {
        subscribersRef.current.delete(callback);
      };
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  };

  const FormContext = createContext<ReturnType<typeof useStoreData> | null>(
    null
  );

  const useStoreContext = <D = any>(
    selector: (store: Store) => D = (currentStore) => currentStore as any
  ): [D, (value: Partial<Store>) => void] => {
    const store = useContext(FormContext);

    if (!store) {
      throw new Error("No Context found");
    }

    const state = useSyncExternalStore(store.subscribe, () =>
      selector(store.get())
    );

    return [state, store.set];
  };

  return { useStoreData, useStoreContext, FormContext };
};
