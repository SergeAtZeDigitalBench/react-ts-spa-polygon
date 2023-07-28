import React from "react";

import EmailCollector from "../components/EmailCollector";
interface IProps {
  [x: string]: unknown;
}

const Homepage = ({}: IProps): JSX.Element => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center">
        React SPA Polygon / Homepage
      </h1>
      <EmailCollector />
    </div>
  );
};

export default Homepage;
