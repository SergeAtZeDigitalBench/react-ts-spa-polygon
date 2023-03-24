import { useSyncExternalStore } from "react";
import store from "./store";

import styles from "./App.module.css";

interface IValueItemProp {
  item: string;
}
type State = Record<string, number>;

const useStore = (selector: (state: State) => State | number = (s) => s) => {
  const subscriberFn = store.subscribe;
  const getSnapshotFn = () => selector(store.getState());

  const currentState = useSyncExternalStore(subscriberFn, getSnapshotFn);

  return currentState;
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
