import React, { useState } from "react";

import EmailCollectorContainer, { IUser } from "../components/EmailCollector";
import ParentControls from "../components/EmailCollector/ParentControls";

const USER: IUser = { email: "johnny.pony@gmail.com" };
interface IProps {
  [x: string]: unknown;
}

const Homepage = ({}: IProps): JSX.Element => {
  const [user, setUser] = useState<IUser | null>(null);

  const toggleUser = () => setUser((current) => (!!current ? null : USER));

  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center">
        React SPA Polygon / Homepage
      </h1>
      <ParentControls user={user} toggleUser={toggleUser} />
      <EmailCollectorContainer email={user?.email} />
    </div>
  );
};

export default Homepage;
