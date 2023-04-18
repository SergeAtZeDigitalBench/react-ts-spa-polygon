import React from "react";
import { NavLink } from "react-router-dom";

export const navLinks = [
  { id: 1, pathname: "/", title: "Home", exact: true },
  { id: 2, pathname: "/basic-list", title: "Basic list" },
];

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
