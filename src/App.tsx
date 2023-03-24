import { useState, useEffect } from "react";
import store from "./store";

import styles from "./App.module.css";

interface IValueItemProp {
  item: string;
}

const useStore = (): [
  Record<string, number>,
  (incomingState: Record<string, number>) => void
] => {
  const [state, setState] = useState(() => store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(setState);

    return () => {
      unsubscribe();
    };
  }, []);

  return [state, store.setState];
};

const DisplayValue = ({ item }: IValueItemProp) => {
  const [state] = useStore();

  return (
    <div>
      {item}: {state[item]}
    </div>
  );
};

const IncrementValue = ({ item }: IValueItemProp) => {
  const [state, setState] = useStore();

  const handleClick = () => {
    setState({ ...state, [item]: state[item] + 1 });
  };

  return <button onClick={handleClick}>Increment {item}</button>;
};

const DecrementValue = ({ item }: IValueItemProp) => {
  const [state, setState] = useStore();

  const handleClick = () => {
    setState({ ...state, [item]: state[item] - 1 });
  };

  return <button onClick={handleClick}>Decrement {item}</button>;
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
