import React, { useState } from "react";
import FadeIn from "../components/FadeIn";

interface IProps {
  [x: string]: unknown;
}

const Homepage = ({}: IProps): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center">
        React SPA Polygon / Homepage
      </h1>
      <button
        className=" block ml-auto mr-auto mt-4 bg-slate-400 px-4 py-2 rounded-md border border-slate-700 hover:bg-slate-500 active:bg-slate-600 "
        onClick={() => setShow((current) => !current)}
      >
        {show ? "hide" : "show"}
      </button>
      <div className=" h-screen flex flex-col justify-center items-center gap-4">
        <FadeIn show={show}>
          <h2 className="text-2xl font-bold text-center relative">Hellow!</h2>
        </FadeIn>
      </div>
    </div>
  );
};

export default Homepage;
