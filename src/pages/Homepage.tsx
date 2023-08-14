import React from "react";

import { products, companies } from "../constants";
import List from "../components/List";
interface IProps {
  [x: string]: unknown;
}

const Homepage = ({}: IProps): JSX.Element => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center">
        React SPA Polygon / Homepage
      </h1>
      <h2 className="text-2xl font-bold text-center">
        React design patterns examples
      </h2>
      <div className=" max-w-[50%] mx-auto">
        <List title="Products" items={products} />
      </div>
    </div>
  );
};

export default Homepage;
