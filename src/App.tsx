import { useState } from "react";

import Switch from "./components/Switch";

import "./App.css";

function App() {
  const [isOn, setIsOn] = useState<boolean>(false);

  const handleToggle = () => setIsOn((current) => !current);

  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center">Switch</h1>
      <div className="h-screen flex justify-center items-center">
        <Switch isOn={isOn} handleToggle={handleToggle} />
      </div>
    </div>
  );
}

export default App;
