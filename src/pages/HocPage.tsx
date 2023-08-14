import React from "react";

interface IProps {
  [x: string]: unknown;
}

const HocPage = ({}: IProps): JSX.Element => {
  return <div>HocPage</div>;
};

export default HocPage;
