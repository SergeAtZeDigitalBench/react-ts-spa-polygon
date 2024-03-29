import React from "react";
import { NavLink } from "react-router-dom";

import { navLinks } from "@/constants";

interface IProps {
  [x: string]: unknown;
}

const Navigation = ({}: IProps): JSX.Element => {
  return (
    <nav className="flex gap-2 justify-center items-center h-[50px] text-gray-700 font-bold">
      {navLinks.map(({ id, pathname, title, exact }) => (
        <NavLink
          key={id}
          to={pathname}
          exact={!!exact}
          activeClassName="text-orange-700"
        >
          {title}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
