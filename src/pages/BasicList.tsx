import React from "react";

interface IProps {
  [x: string]: unknown;
}

const BasicList = ({}: IProps): JSX.Element => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center">
        Virtualized list / Basic
      </h1>
    </div>
  );
};

export default BasicList;
