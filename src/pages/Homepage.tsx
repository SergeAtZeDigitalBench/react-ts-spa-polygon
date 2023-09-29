import React from "react";

import Gallery from "@/components/Gallery";
interface IProps {
  [x: string]: unknown;
}

const Homepage = ({}: IProps): JSX.Element => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold underline text-center">
        React SPA Polygon / Homepage
      </h1>
      <Gallery />
    </div>
  );
};

export default Homepage;
