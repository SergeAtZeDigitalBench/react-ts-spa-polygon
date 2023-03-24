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

type StoreData = {
  get: () => Store;
  set: (value: Partial<Store>) => void;
  subscribe: (calllback: VoidFn) => VoidFn;
};

const useStoreData = (): StoreData => {
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

const FormContext = createContext<ReturnType<typeof useStoreData> | null>(null);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { get, set, subscribe } = useStoreData();
  return (
    <FormContext.Provider value={{ get, set, subscribe }}>
      {children}
    </FormContext.Provider>
  );
};

const useStore = (): [Store, (value: Partial<Store>) => void] => {
  const store = useContext(FormContext);
  if (!store) {
    throw new Error("No Context found");
  }
  const [state, setState] = useState(() => store.get());

  useEffect(() => {
    const unsubscribeFn = store.subscribe(() => setState(store.get()));

    return () => {
      unsubscribeFn();
    };
  }, []);

  return [state, store.set];
};

const TextInput = ({ value }: { value: "first" | "last" }) => {
  const [store, setStore] = useStore();

  const handlEchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStore({ [value]: event.target.value });
  };

  return (
    <div className="p-2">
      {value}:{" "}
      <input
        value={store[value]}
        onChange={handlEchange}
        className="px-2 py-1 border-2 border-green-400 rounded-md"
      />
    </div>
  );
};

const Display = ({ value }: { value: "first" | "last" }) => {
  const [store] = useStore();

  return (
    <div className="p-2">
      {value}: {store[value]}
    </div>
  );
};

const FormContainer = () => {
  return (
    <div className="mt-2 py-2 px-6 border-2 border-gray-500">
      <h5>FormContainer</h5>
      <TextInput value="first" />
      <TextInput value="last" />
    </div>
  );
};

const DisplayContainer = () => {
  return (
    <div className="mt-2 py-2 px-6 border-2 border-gray-500">
      <h5>DisplayContainer</h5>
      <Display value="first" />
      <Display value="last" />
    </div>
  );
};

const ContentContainer = () => {
  return (
    <div className="mt-2 py-2 px-6 border-2 border-gray-500">
      <h5>ContentContainer</h5>
      <FormContainer />
      <DisplayContainer />
    </div>
  );
};

function App() {
  return (
    <Provider>
      <div className="mt-2 py-2 px-6 border-2 border-gray-500">
        <h1 className="text-3xl font-bold underline text-center mt-6 mb-12">
          Use React Context Optimised
        </h1>
        <ContentContainer />
      </div>
    </Provider>
  );
}

export default App;
