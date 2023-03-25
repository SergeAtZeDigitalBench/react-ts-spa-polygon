import {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  useCallback,
} from "react";

type Store = Record<"first" | "last", string>;

type VoidFn = () => void;

type StoreData<Store> = {
  get: () => Store;
  set: (value: Partial<Store>) => void;
  subscribe: (calllback: VoidFn) => VoidFn;
};

export const useStoreData = (): StoreData<Store> => {
  const storeRef = useRef<Store>({ first: "", last: "" });
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

export const FormContext = createContext<ReturnType<
  typeof useStoreData
> | null>(null);

export const useStoreContext = <D = any>(
  selector: (store: Store) => D = (currentStore) => currentStore as any
): [D, (value: Partial<Store>) => void] => {
  const store = useContext(FormContext);
  if (!store) {
    throw new Error("No Context found");
  }
  const [state, setState] = useState(() => selector(store.get()));

  useEffect(() => {
    const unsubscribeFn = store.subscribe(() =>
      setState(selector(store.get()))
    );

    return () => {
      unsubscribeFn();
    };
  }, []);

  return [state, store.set];
};
