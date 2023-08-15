import React from "react";

import withData, { IHocInjectedProps } from "../components/HOC/withData";
import List from "../components/List";

interface IPropsOriginal {
  title: string;
}

const WrappedComponent = withData(
  ({
    title,
    data,
    loading,
    error,
    handleStartFetch,
    handleReset,
  }: IPropsOriginal & IHocInjectedProps) => {
    return (
      <div>
        <div className="flex gap-4 my-4">
          <button
            onClick={() => handleStartFetch()}
            className="px-4 py-2 bg-green-500 text-white"
          >
            fetch data with success
          </button>
          <button
            onClick={() => handleStartFetch("Fetching error message")}
            className="px-4 py-2 bg-red-600 text-white"
          >
            fetch data with error
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-600 text-white"
          >
            reset
          </button>
        </div>
        <div>
          {loading && (
            <p className="p-4 bg-blue-700 text-white text-center">Loading...</p>
          )}
          {error && (
            <p className="p-4 bg-red-600 text-white text-center">{error}</p>
          )}
          {!loading && !error && data && <List title={title} items={data} />}
        </div>
      </div>
    );
  }
);

interface IProps {
  [x: string]: unknown;
}

const HocPage = ({}: IProps): JSX.Element => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center">Render props</h1>

      <WrappedComponent title="Products (via HOC)" />
    </div>
  );
};

export default HocPage;
