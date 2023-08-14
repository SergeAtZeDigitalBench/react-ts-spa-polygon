import React from "react";

interface IProps {
  [x: string]: unknown;
}

const CustomHookPage = ({}: IProps): JSX.Element => {
  return <div>CustomHookPage</div>;
};

export default CustomHookPage;
