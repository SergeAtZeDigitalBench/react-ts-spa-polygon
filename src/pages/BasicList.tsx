import React from "react";
import { faker } from "@faker-js/faker";

import FlatListBasic from "../components/FlatListBasic";

const getImages = (amount: number) =>
  faker.datatype.array(amount).map((id) => ({
    id,
    src: faker.image.city(200, 150, true),
  }));

interface IProps {
  [x: string]: unknown;
}

const BasicList = ({}: IProps): JSX.Element => {
  return (
    <div className=" h-screen">
      <h1 className="text-3xl font-bold underline text-center">
        Virtualized list / Basic
      </h1>
      <div className="flex justify-center items-center h-full">
        <FlatListBasic images={getImages(20)} />
      </div>
    </div>
  );
};

export default BasicList;
