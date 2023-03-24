import { useState, createContext, useContext } from "react";

type State = Record<"first" | "last", string>;
type ContextType = [
  State,
  React.Dispatch<
    React.SetStateAction<{
      first: string;
      last: string;
    }>
  >
];

const FormContext = createContext<ContextType>([
  {
    first: "",
    last: "",
  },
  () => {},
]);

const TextInput = ({ value }: { value: "first" | "last" }) => {
  const [store, setStore] = useContext(FormContext);

  const handlEchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStore((current) => ({ ...current, [value]: event.target.value }));
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
  const [store] = useContext(FormContext);

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
  const [store, setStore] = useState({
    first: "",
    last: "",
  });

  return (
    <FormContext.Provider value={[store, setStore]}>
      <div className="mt-2 py-2 px-6 border-2 border-gray-500">
        <h1 className="text-3xl font-bold underline text-center mt-6 mb-12">
          Use React Context Optimised
        </h1>
        <ContentContainer />
      </div>
    </FormContext.Provider>
  );
}

export default App;
