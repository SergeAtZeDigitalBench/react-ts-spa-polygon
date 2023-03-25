import { createFastContext } from "./hooks";

type Store = Record<"first" | "last", string>;

const { FormContext, useStoreContext, useStoreData } = createFastContext<Store>(
  { first: "John", last: "Doe" }
);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { get, set, subscribe } = useStoreData();

  return (
    <FormContext.Provider value={{ get, set, subscribe }}>
      {children}
    </FormContext.Provider>
  );
};

const TextInput = ({ value }: { value: "first" | "last" }) => {
  const [fieldValue, setStore] = useStoreContext((state) => state[value]);

  const handlEchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStore({ [value]: event.target.value });
  };

  return (
    <div className="p-2">
      {value}:{" "}
      <input
        value={fieldValue}
        onChange={handlEchange}
        className="px-2 py-1 border-2 border-green-400 rounded-md"
      />
    </div>
  );
};

const Display = ({ value }: { value: "first" | "last" }) => {
  const [fieldValue] = useStoreContext((state) => state[value]);

  return (
    <div className="p-2">
      {value}: {fieldValue}
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
