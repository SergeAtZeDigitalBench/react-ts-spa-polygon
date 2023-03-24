type SubscriberFn<D> = (value: D) => any;

export const createStore = <S = any>(intialState: S) => {
  let newState = intialState;
  const subscribers = new Set<SubscriberFn<S>>();

  return {
    getState: () => newState,
    setState: (incomingState: S) => {
      newState = incomingState;
      subscribers.forEach((subscriberFn) => {
        subscriberFn(newState);
      });
    },
    subscribe: (listener: SubscriberFn<S>) => {
      subscribers.add(listener);
      return () => subscribers.delete(listener);
    },
  };
};

const store = createStore<Record<string, number>>({
  value1: 0,
  value2: 0,
});

export default store;
