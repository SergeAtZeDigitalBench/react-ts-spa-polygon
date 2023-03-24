import { useState, useEffect } from "react";
import store from "./store";

import styles from "./App.module.css";

interface IValueItemProp {
  item: string;
}

/**
 * @desription This is an approach to use with React versions < 18, when we don't have the
 * `useSyncExternalStore` hook
 */
const useStore = (
  selector: (
    state: Record<string, number>
  ) => Record<string, number> | number = (s) => s
): number | Record<string, number> => {
  const [state, setState] = useState(() => selector(store.getState()));

  useEffect(() => {
    const unsubscribe = store.subscribe((s) => setState(selector(s)));

    return () => {
      unsubscribe();
    };
  }, []);

  return state;
};

const DisplayValue = ({ item }: IValueItemProp) => {
  const state = useStore((s) => s[item]);

  return (
    <div>
      {item}: {state as number}
    </div>
  );
};

const IncrementValue = ({ item }: IValueItemProp) => {
  return (
    <button
      onClick={() => {
        const state = store.getState();
        store.setState({ ...state, [item]: state[item] + 1 });
      }}
    >
      Increment {item}
    </button>
  );
};

const DecrementValue = ({ item }: IValueItemProp) => {
  return (
    <button
      onClick={() => {
        const state = store.getState();
        store.setState({ ...state, [item]: state[item] - 1 });
      }}
    >
      Decrement {item}
    </button>
  );
};

function App() {
  return (
    <>
      <h1 className={styles.AppHeader}>Use sync external store</h1>
      <div className={styles.App}>
        <IncrementValue item="value1" />
        <DisplayValue item="value1" />
        <DecrementValue item="value2" />
        <DisplayValue item="value2" />
      </div>
    </>
  );
}

export default App;
