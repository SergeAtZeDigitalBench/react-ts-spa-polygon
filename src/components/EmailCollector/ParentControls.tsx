import React from "react";

import { IUser } from "./types";

interface IProps {
  user: IUser | null;
  toggleUser: () => void;
}

const ParentControls = ({ user, toggleUser }: IProps): JSX.Element => {
  return (
    <div className=" bg-blue-300 p-4">
      <h2 className="text-2xl font-bold text-center">
        Parent app controls/state
      </h2>
      <div className="flex flex-col justify-center items-center p-4 gap-2">
        <div className="min-w-[300px]">
          <h4 className="text-xl font-bold">Parent app state</h4>
          <div className="flex gap-1">
            <p className="underline">current user: </p>
            <p className={user ? "text-blue-700" : "text-red-600"}>
              {user ? user.email : "none home 😜"}
            </p>
          </div>
        </div>
        <button
          onClick={toggleUser}
          className="px-4 py-2 w-[100px] text-white font-bold bg-gray-500 rounded-md border border-gray-800 hover:bg-gray-600"
        >
          {user ? "log Out" : "log In"}
        </button>
      </div>
    </div>
  );
};

export default ParentControls;
